from __future__ import annotations

from collections import Counter
from threading import Lock

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.logger import get_logger
from app.services.search_engine import SemanticSearchEngine

logger = get_logger("app.rag")


class RagEngine:
    def __init__(
        self,
        *,
        search_engine: SemanticSearchEngine | None = None,
        enabled: bool = False,
        model_path: str = "",
        max_tokens: int = 320,
        temperature: float = 0.2,
    ) -> None:
        self.search_engine = search_engine or SemanticSearchEngine()
        self.enabled = enabled
        self.model_path = model_path
        self.max_tokens = max(96, max_tokens)
        self.temperature = max(0.0, min(1.0, temperature))
        self._llm = None
        self._lock = Lock()

    def _get_llm(self):
        if self._llm is not None:
            return self._llm
        if not self.enabled or not self.model_path.strip():
            self._llm = False
            return self._llm
        with self._lock:
            if self._llm is not None:
                return self._llm
            try:
                from llama_cpp import Llama
                import os
                threads_limit = max(1, min(2, os.cpu_count() or 1))

                self._llm = Llama(
                    model_path=self.model_path.strip(),
                    n_ctx=4096,
                    n_threads=threads_limit,
                    verbose=False,
                )
            except Exception as err:  # noqa: BLE001
                logger.warning("RAG LLM unavailable, using retrieval-only fallback: %s", err)
                self._llm = False
            return self._llm

    @staticmethod
    def _clean_items(items: list[dict[str, object]], limit: int) -> list[dict[str, object]]:
        cleaned: list[dict[str, object]] = []
        for item in items[: max(1, min(20, limit))]:
            cleaned.append(
                {
                    "id": item.get("id"),
                    "title": str(item.get("title") or ""),
                    "summary": str(item.get("summary") or ""),
                    "state": str(item.get("state") or ""),
                    "district": str(item.get("district") or ""),
                    "species": str(item.get("species") or ""),
                    "crime_type": str(item.get("crime_type") or ""),
                    "source": str(item.get("source") or ""),
                    "published_at": str(item.get("published_at") or ""),
                    "similarity": float(item.get("similarity") or 0.0),
                    "open_url": str(item.get("open_url") or ""),
                }
            )
        return cleaned

    @staticmethod
    def _fallback_answer(query: str, items: list[dict[str, object]]) -> str:
        if not items:
            return (
                "No matching incidents were found for this query in the current intelligence dataset. "
                "Try adding species, state, district, or crime-type keywords."
            )
        states = Counter(item["state"] for item in items if item["state"])
        species = Counter(item["species"] for item in items if item["species"])
        crime_types = Counter(item["crime_type"] for item in items if item["crime_type"])
        top_state = states.most_common(1)[0][0] if states else "multiple states"
        top_species = species.most_common(1)[0][0] if species else "multiple species"
        top_crime = crime_types.most_common(1)[0][0] if crime_types else "mixed crime types"
        best = items[0]
        return (
            f"Based on {len(items)} retrieved incidents for '{query}', the strongest pattern is {top_crime.replace('_', ' ')} "
            f"involving {top_species} with concentration in {top_state}. "
            f"The highest-ranked incident is '{best['title']}' (similarity {best['similarity']:.2f})."
        )

    @staticmethod
    def _build_prompt(query: str, items: list[dict[str, object]]) -> str:
        context_lines = []
        for idx, item in enumerate(items, start=1):
            context_lines.append(
                f"[{idx}] id={item['id']} title={item['title']} state={item['state']} district={item['district']} "
                f"species={item['species']} crime={item['crime_type']} similarity={item['similarity']:.2f}\n"
                f"summary={item['summary'][:320]}"
            )
        joined = "\n".join(context_lines)
        return (
            "You are a wildlife intelligence analyst. "
            "Answer the question using only the provided context. If uncertain, say so.\n\n"
            f"Question: {query}\n\n"
            f"Context incidents:\n{joined}\n\n"
            "Answer with 4-6 concise sentences and mention relevant incident IDs in brackets."
        )

    def ask(
        self,
        db: Session,
        *,
        query: str,
        limit: int = 5,
        candidate_limit: int = 2000,
        min_similarity: float = 0.0,
    ) -> dict[str, object]:
        retrieval = self.search_engine.search(
            db,
            query=query,
            limit=limit,
            candidate_limit=candidate_limit,
            min_similarity=min_similarity,
        )
        items = self._clean_items(list(retrieval.get("items") or []), limit=limit)
        answer = self._fallback_answer(query, items)
        llm_used = False

        # Try Cloud LLM first (DigitalOcean / Ollama / OpenAI-compatible)
        import os
        ollama_enabled = os.environ.get("OLLAMA_ENABLED", "").lower() in ("true", "1")
        if ollama_enabled and items:
            import requests as _requests
            
            base_url = os.environ.get("OLLAMA_BASE_URL", "").strip()
            if base_url:
                if base_url.endswith("/"):
                    ollama_url = f"{base_url}chat/completions"
                else:
                    ollama_url = f"{base_url}/chat/completions"
            else:
                ollama_url = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/chat")
                
            ollama_model = os.environ.get("OLLAMA_MODEL", "llama3.3-70b-instruct")
            ollama_token = (
                os.environ.get("OLLAMA_BEARER_TOKEN") or 
                os.environ.get("LLM_API_KEY") or 
                os.environ.get("OLLAMA_API_KEY")
            )
            prompt_text = self._build_prompt(query, items)
            headers = {"Content-Type": "application/json"}
            if ollama_token:
                headers["Authorization"] = f"Bearer {ollama_token}"
            payload = {
                "model": ollama_model,
                "messages": [{"role": "user", "content": prompt_text}],
                "stream": False,
                "temperature": self.temperature,
                "max_tokens": self.max_tokens,
            }
            try:
                resp = _requests.post(
                    ollama_url, json=payload, headers=headers,
                    timeout=60, proxies={"http": None, "https": None},
                )
                resp.raise_for_status()
                rj = resp.json()
                raw = ""
                if "choices" in rj and len(rj["choices"]) > 0:
                    raw = rj["choices"][0].get("message", {}).get("content", "")
                elif "message" in rj:
                    raw = rj["message"].get("content", "")
                if raw.strip():
                    answer = raw.strip()[:2000]
                    llm_used = True
            except Exception as err:  # noqa: BLE001
                logger.warning("RAG Cloud LLM failed, trying local fallback: %s", err)

        # Fallback to local GGUF model
        if not llm_used:
            llm = self._get_llm()
            if llm is not False and items:
                prompt = self._build_prompt(query, items)
                try:
                    response = llm.create_completion(
                        prompt=prompt,
                        max_tokens=self.max_tokens,
                        temperature=self.temperature,
                        stop=["\n\nContext incidents:"],
                    )
                    raw = str((response.get("choices") or [{}])[0].get("text") or "").strip()
                    if raw:
                        answer = raw[:1600]
                        llm_used = True
                except Exception as err:  # noqa: BLE001
                    logger.warning("RAG completion failed, keeping retrieval-only fallback: %s", err)

        sources = [
            {
                "id": it.get("id"),
                "title": it.get("title", ""),
                "relevance": it.get("similarity", 0.0),
                "date": str(it.get("published_at", "")).split("T")[0] if "T" in str(it.get("published_at", "")) else str(it.get("published_at", "")),
                "url": it.get("open_url", "")
            }
            for it in items
        ]

        return {
            "query": query,
            "answer": answer,
            "llm_used": llm_used,
            "citations": items,
            "sources": sources,
            "count": len(items),
        }


rag_engine = RagEngine(
    enabled=bool(settings.rag_qa_enabled),
    model_path=settings.llm_summary_model_path,
    max_tokens=settings.rag_qa_max_tokens,
    temperature=settings.llm_summary_temperature,
)

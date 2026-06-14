from types import SimpleNamespace

from app.services.search_engine import SemanticSearchEngine, _BM25, _tokenize


class _BatchDedupe:
    """Dedupe double exposing the batch-embedding fast-path used by hybrid search.

    Embeds each text as a tiny bag-of-words vector over a fixed vocabulary so the
    cosine reflects token overlap deterministically (no model download in CI).
    """

    _VOCAB = ["tiger", "pangolin", "trafficking", "border", "scales", "forest", "gang"]

    def embed_batch(self, texts):
        vectors = []
        for text in texts:
            toks = set((text or "").lower().split())
            vectors.append([1.0 if term in toks else 0.0 for term in self._VOCAB])
        return vectors

    @staticmethod
    def cosine(left, right):
        if not left or not right:
            return 0.0
        dot = sum(a * b for a, b in zip(left, right))
        ln = sum(a * a for a in left) ** 0.5
        rn = sum(b * b for b in right) ** 0.5
        return float(dot / (ln * rn)) if ln and rn else 0.0

    def _semantic_similarity(self, left, right):  # pragma: no cover - not hit in hybrid path
        return self.cosine(self.embed_batch([left])[0], self.embed_batch([right])[0])


def _row(row_id: int, title: str, summary: str, species: str = ""):
    return SimpleNamespace(
        id=row_id,
        title=title,
        summary=summary,
        intel_summary=summary,
        species=species,
        crime_type="poaching",
        state="odisha",
        district="mayurbhanj",
        risk_score=70,
        confidence=0.8,
        source="test-source",
        published_at=SimpleNamespace(isoformat=lambda: "2026-05-09T00:00:00"),
    )


def test_bm25_ranks_keyword_match_first() -> None:
    docs = [
        _tokenize("pangolin trafficking scales seized near border"),
        _tokenize("tiger poaching arrest gang forest"),
        _tokenize("wildlife rescue no crime reported"),
    ]
    scores = _BM25(docs).scores(_tokenize("pangolin trafficking border"))
    assert scores[0] == max(scores)
    assert scores[0] > 0


def test_hybrid_search_uses_batch_embedding_and_fuses_bm25() -> None:
    engine = SemanticSearchEngine(dedupe_engine=_BatchDedupe())
    rows = [
        _row(1, "tiger poaching arrest", "gang forest", "tiger"),
        _row(2, "pangolin trafficking case", "scales border", "pangolin"),
        _row(3, "wildlife rescue", "no crime", "deer"),
    ]
    ranked = engine._rank_rows(query="pangolin trafficking border", rows=rows)
    assert ranked[0].item.id == 2
    assert ranked[0].similarity >= ranked[1].similarity
    # Fused score stays within [0, 1].
    assert 0.0 <= ranked[0].similarity <= 1.0


def test_hybrid_search_respects_exclude_id() -> None:
    engine = SemanticSearchEngine(dedupe_engine=_BatchDedupe())
    rows = [
        _row(1, "pangolin trafficking border", "scales", "pangolin"),
        _row(2, "tiger poaching forest", "gang", "tiger"),
    ]
    ranked = engine._rank_rows(query="pangolin border", rows=rows, exclude_id=1)
    assert all(result.item.id != 1 for result in ranked)

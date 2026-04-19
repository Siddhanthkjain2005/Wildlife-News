import re


def normalize_space(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def split_sentences(text: str) -> list[str]:
    cleaned = normalize_space(text)
    if not cleaned:
        return []
    parts = re.split(r"(?<=[.!?])\s+", cleaned)
    return [p.strip() for p in parts if p.strip()]


def first_sentence(text: str, fallback: str = "") -> str:
    sentences = split_sentences(text)
    if sentences:
        return sentences[0]
    return fallback

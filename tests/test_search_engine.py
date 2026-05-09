from types import SimpleNamespace

from app.services.search_engine import SemanticSearchEngine


class _FakeDedupe:
    @staticmethod
    def _semantic_similarity(left: str, right: str) -> float:
        left_tokens = set(left.lower().split())
        right_tokens = set(right.lower().split())
        if not left_tokens or not right_tokens:
            return 0.0
        return len(left_tokens & right_tokens) / len(left_tokens | right_tokens)


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


def test_rank_rows_orders_by_similarity() -> None:
    engine = SemanticSearchEngine(dedupe_engine=_FakeDedupe())
    rows = [
        _row(1, "Tiger poaching arrest", "Gang arrested in forest", "tiger"),
        _row(2, "Pangolin trafficking case", "Scales seized near border", "pangolin"),
        _row(3, "Wildlife rescue story", "No crime reported", "deer"),
    ]

    ranked = engine._rank_rows(query="pangolin trafficking border", rows=rows)

    assert ranked[0].item.id == 2
    assert ranked[0].similarity >= ranked[1].similarity


def test_rank_rows_can_exclude_target_incident() -> None:
    engine = SemanticSearchEngine(dedupe_engine=_FakeDedupe())
    rows = [
        _row(1, "Tiger poaching arrest", "Gang arrested in forest", "tiger"),
        _row(2, "Pangolin trafficking case", "Scales seized near border", "pangolin"),
    ]

    ranked = engine._rank_rows(query="tiger poaching", rows=rows, exclude_id=1)

    assert all(result.item.id != 1 for result in ranked)

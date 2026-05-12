from types import SimpleNamespace

from app.services.graph_engine import GraphIntelligenceEngine


def test_extract_persons_filters_duplicates_and_unnamed() -> None:
    engine = GraphIntelligenceEngine()
    persons = engine._extract_persons("Ajij Ullah, Mumtaz Ahmad, 2 other unnamed suspects, ajij ullah")
    assert persons == ["Ajij Ullah", "Mumtaz Ahmad"]


def test_extract_persons_handles_mixed_delimiters_and_noise() -> None:
    engine = GraphIntelligenceEngine()
    persons = engine._extract_persons("Ravi Kumar; Ravi K | Thailand, Mumtaz Ahmad / unknown suspect")
    assert persons == ["Ravi Kumar", "Mumtaz Ahmad"]


def test_build_graph_creates_person_and_incident_links() -> None:
    engine = GraphIntelligenceEngine()
    incidents = [
        SimpleNamespace(
            id=1,
            title="Case 1",
            state="Odisha",
            district="Mayurbhanj",
            species="pangolin",
            risk_score=85,
            published_at=SimpleNamespace(isoformat=lambda: "2026-05-09T00:00:00"),
            involved_persons="Ajij Ullah, Mumtaz Ahmad",
        ),
        SimpleNamespace(
            id=2,
            title="Case 2",
            state="Odisha",
            district="Khordha",
            species="pangolin",
            risk_score=70,
            published_at=SimpleNamespace(isoformat=lambda: "2026-05-10T00:00:00"),
            involved_persons="Ajij Ullah",
        ),
    ]

    graph = engine._build_graph(incidents)

    assert "person:ajij ullah" in graph.nodes
    assert "person:mumtaz ahmad" in graph.nodes
    assert "incident:1" in graph.nodes
    assert "incident:2" in graph.nodes
    assert graph.nodes["person:ajij ullah"]["incident_count"] == 2
    assert graph.nodes["person:mumtaz ahmad"]["incident_count"] == 1
    assert graph["person:ajij ullah"]["person:mumtaz ahmad"]["co_incident_count"] == 1


def test_get_networks_exposes_full_actor_and_incident_lists() -> None:
    engine = GraphIntelligenceEngine()
    incidents = [
        SimpleNamespace(
            id=11,
            title="Case A",
            url="https://example.org/a",
            state="Maharashtra",
            district="Mumbai",
            species="pangolin",
            risk_score=91,
            published_at=SimpleNamespace(isoformat=lambda: "2026-05-10T09:00:00"),
            involved_persons="Ajij Ullah, Mumtaz Ahmad, ravi kumar",
        ),
        SimpleNamespace(
            id=12,
            title="Case B",
            url="https://example.org/b",
            state="Maharashtra",
            district="Thane",
            species="pangolin",
            risk_score=72,
            published_at=SimpleNamespace(isoformat=lambda: "2026-05-11T09:00:00"),
            involved_persons="ravi kumar, Suresh Yadav",
        ),
    ]

    engine._load_incidents = lambda _db, limit=None: incidents  # type: ignore[assignment]
    payload = engine.get_networks(db=None, min_size=2, limit=100, incident_limit=10000)
    assert payload["network_count"] == 1
    assert payload["total_network_count"] == 1

    network = payload["networks"][0]
    assert network["network_id"].startswith("net-")
    assert network["actor_count"] == 4
    assert len(network["actors"]) == 4
    assert len(network["linked_incidents"]) == 2
    assert network["linked_incidents"][0]["risk_score"] >= network["linked_incidents"][1]["risk_score"]
    assert network["linked_incidents"][0]["url"].startswith("https://")
    assert network["linked_incidents"][0]["open_url"] == network["linked_incidents"][0]["url"]

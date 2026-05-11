import pytest


@pytest.mark.parametrize(
    "candidate",
    [
        "Mrityunjay Haldar",
        "Ajij Ullah",
        "Ramesh Kumar",
        "Mumtaz Ahmad",
    ],
)
def test_is_bad_person_allows_valid_names(intelligence_engine, candidate: str) -> None:
    assert intelligence_engine._is_bad_person(candidate) is False


@pytest.mark.parametrize(
    "candidate",
    [
        "The Hans India",
        "busted in Gujarat",
        "Nampally",
        "Rajkot",
        "two suspects",
        "DT Next",
        "forest officer",
        "Likely involving near",
        "Updated On",
        "near Hyderabad",
        "incident occurred in Malad West",
        "NENow.in Assam",
        "Key Points suspected",
        "complaint with Narsingi",
    ],
)
def test_is_bad_person_rejects_known_noise(intelligence_engine, candidate: str) -> None:
    assert intelligence_engine._is_bad_person(candidate) is True


def test_extract_ner_person_candidates_prefers_gliner_roles(intelligence_engine) -> None:
    class _FakeRoleNer:
        @staticmethod
        def extract(_text: str):
            return [
                {"text": "Ravi Kumar", "label": "SUSPECT", "score": 0.92},
                {"text": "Forest Department", "label": "ORGANIZATION", "score": 0.88},
            ]

    intelligence_engine._role_ner = _FakeRoleNer()
    intelligence_engine._person_ner = False
    candidates = intelligence_engine._extract_ner_person_candidates(["Ravi Kumar was arrested by officials."])
    assert candidates == ["Ravi Kumar"]


def test_same_person_name_matches_initial_variants(intelligence_engine) -> None:
    assert intelligence_engine._same_person_name("Ravi Kumar", "Ravi K.") is True
    assert intelligence_engine._same_person_name("Ajij Ullah", "Mumtaz Ahmad") is False


def test_sanitize_involved_persons_keeps_only_reliable_names(intelligence_engine) -> None:
    cleaned = intelligence_engine._sanitize_involved_persons(
        [
            "Ajij Ullah",
            "Likely involving near",
            "Updated On",
            "Mumtaz Ahmad",
            "near Hyderabad",
            "NENow.in Assam",
            "Ajij U.",
        ],
        limit=8,
    )
    assert cleaned == ["Ajij Ullah", "Mumtaz Ahmad"]

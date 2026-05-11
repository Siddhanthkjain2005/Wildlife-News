from types import SimpleNamespace

from app.repositories.news_filters import is_strict_incident_record


def _item(**kwargs):
    base = {
        "is_poaching": True,
        "is_india": True,
        "species": "pangolin",
        "crime_type": "poaching",
    }
    base.update(kwargs)
    return SimpleNamespace(**base)


def test_is_strict_incident_record_accepts_valid_animal_incident() -> None:
    assert is_strict_incident_record(_item()) is True


def test_is_strict_incident_record_rejects_unknown_or_non_india() -> None:
    assert is_strict_incident_record(_item(is_india=False)) is False
    assert is_strict_incident_record(_item(species="unknown")) is False


def test_is_strict_incident_record_rejects_non_animal_crime_types() -> None:
    assert is_strict_incident_record(_item(crime_type="red_sanders_smuggling")) is False
    assert is_strict_incident_record(_item(crime_type="habitat_destruction")) is False

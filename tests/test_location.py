import pytest

from app.utils.location_data import DISTRICT_TO_STATE


@pytest.mark.parametrize(
    ("location_key", "expected_state"),
    [
        ("mumbai", "maharashtra"),
        ("delhi", "delhi"),
        ("chennai", "tamil nadu"),
        ("hyderabad", "telangana"),
        ("bengaluru", "karnataka"),
        ("kolkata", "west bengal"),
        ("jaipur", "rajasthan"),
        ("lucknow", "uttar pradesh"),
        ("bhopal", "madhya pradesh"),
        ("patna", "bihar"),
        ("ranchi", "jharkhand"),
        ("raipur", "chhattisgarh"),
        ("dehradun", "uttarakhand"),
        ("gangtok", "sikkim"),
        ("itanagar", "arunachal pradesh"),
        ("kohima", "nagaland"),
        ("agartala", "tripura"),
        ("shillong", "meghalaya"),
        ("aizawl", "mizoram"),
        ("imphal", "manipur"),
        ("panaji", "goa"),
        ("thiruvananthapuram", "kerala"),
        ("nampally", "telangana"),
        ("similipal", "odisha"),
        ("tadoba", "maharashtra"),
    ],
)
def test_district_to_state_known_lookups(location_key: str, expected_state: str) -> None:
    assert DISTRICT_TO_STATE.get(location_key) == expected_state

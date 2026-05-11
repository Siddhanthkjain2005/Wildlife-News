from app.services.intelligence import HybridIntelligenceEngine


def _operational_details() -> dict[str, object]:
    return {
        "agency_hits": ["forest department"],
        "quantities": ["12 kg"],
        "money_mentions": [],
        "case_refs": [],
        "vehicle_refs": [],
        "poaching_material_hits": ["pangolin scales"],
        "seizure_present": True,
        "arrest_present": True,
        "cross_border": False,
        "weapon_signal": False,
    }


def test_extract_operational_details_captures_poaching_material_signals() -> None:
    text = "Forest officials seized pangolin scales and tiger skin from two suspects."
    details = HybridIntelligenceEngine._extract_operational_details(text, text.lower())
    assert details["seizure_present"] is True
    assert "pangolin scales" in details["poaching_material_hits"]
    assert "tiger skin" in details["poaching_material_hits"]


def test_extract_unknown_profile_flags_explicit_and_missing_fields() -> None:
    profile = HybridIntelligenceEngine._extract_unknown_profile(
        source_text="Two unidentified suspects were held at an undisclosed location; species unknown.",
        species=[],
        state="",
        district="",
        involved_persons=["2 other unnamed suspects"],
    )
    assert profile["species_unknown"] is True
    assert profile["location_unknown"] is True
    assert profile["persons_unknown"] is True
    assert profile["unknown_ratio"] == 1.0
    assert profile["explicit_unknown_mentions"] >= 2


def test_unknown_profile_lowers_confidence_and_risk() -> None:
    details = _operational_details()
    confidence_known = HybridIntelligenceEngine._compute_confidence(
        poach_prob=0.82,
        rule_score=0.7,
        keyword_hits=6,
        species_hits=1,
        person_hits=2,
        network_indicator=True,
        not_wildlife_prob=0.08,
        crime_type="poaching",
        has_false_positive=False,
        evidence_strength=0.86,
        operational_details=details,
        unknown_profile={
            "species_unknown": False,
            "location_unknown": False,
            "persons_unknown": False,
            "unknown_ratio": 0.0,
            "explicit_unknown_mentions": 0,
        },
    )
    confidence_unknown = HybridIntelligenceEngine._compute_confidence(
        poach_prob=0.82,
        rule_score=0.7,
        keyword_hits=6,
        species_hits=1,
        person_hits=2,
        network_indicator=True,
        not_wildlife_prob=0.08,
        crime_type="poaching",
        has_false_positive=False,
        evidence_strength=0.86,
        operational_details=details,
        unknown_profile={
            "species_unknown": True,
            "location_unknown": True,
            "persons_unknown": True,
            "unknown_ratio": 1.0,
            "explicit_unknown_mentions": 4,
        },
    )
    assert confidence_unknown < confidence_known

    risk_known = HybridIntelligenceEngine._compute_risk(
        confidence=confidence_known,
        poach_prob=0.82,
        crime_type="poaching",
        species=["pangolin"],
        network_indicator=True,
        repeat_indicator=False,
        person_hits=2,
        operational_details=details,
        unknown_profile={
            "species_unknown": False,
            "location_unknown": False,
            "persons_unknown": False,
            "unknown_ratio": 0.0,
        },
    )
    risk_unknown = HybridIntelligenceEngine._compute_risk(
        confidence=confidence_unknown,
        poach_prob=0.82,
        crime_type="poaching",
        species=[],
        network_indicator=False,
        repeat_indicator=False,
        person_hits=0,
        operational_details=details,
        unknown_profile={
            "species_unknown": True,
            "location_unknown": True,
            "persons_unknown": True,
            "unknown_ratio": 1.0,
        },
    )
    assert risk_unknown < risk_known


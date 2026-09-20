from app.services.intelligence import _load_external_blocklist


def test_load_external_blocklist_parses_tokens(tmp_path) -> None:
    blocklist = tmp_path / "blocklist.txt"
    blocklist.write_text(
        "\n".join(
            [
                "# comment line",
                "",
                "Stringer",
                "WebDesk",
                "  PTI-Bhasha  ",
            ]
        ),
        encoding="utf-8",
    )
    loaded = _load_external_blocklist(str(blocklist))
    assert loaded == {"stringer", "webdesk", "pti-bhasha"}


def test_load_external_blocklist_missing_file_is_noop() -> None:
    assert _load_external_blocklist("/nonexistent/path/blocklist.txt") == set()
    assert _load_external_blocklist("") == set()


def test_external_blocklist_token_is_filtered_from_candidates(tmp_path, monkeypatch) -> None:
    # A token added via the external blocklist should be stripped from a name.
    import app.services.intelligence as intel

    monkeypatch.setitem(
        intel.__dict__,
        "PERSON_NAME_STOPWORDS",
        intel.PERSON_NAME_STOPWORDS | {"webdesk"},
    )
    engine = intel.HybridIntelligenceEngine()
    cleaned = engine._clean_person_candidate("Ramesh Kumar WebDesk")
    assert cleaned == "Ramesh Kumar"

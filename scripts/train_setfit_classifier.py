from __future__ import annotations

import argparse

from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from app.models import NewsItem

CRIME_TYPE_TO_LABEL = {
    "poaching": "wildlife poaching",
    "smuggling": "wildlife smuggling",
    "illegal_wildlife_trade": "illegal wildlife trade",
    "ivory_trade": "ivory trade",
    "tiger_skin_seizure": "tiger skin seizure",
    "rhino_horn_trafficking": "rhino horn trafficking",
    "exotic_bird_trafficking": "exotic bird trafficking",
    "illegal_fishing": "illegal fishing",
    "forest_hunting_gang": "forest hunting gang",
    "habitat_destruction": "habitat destruction",
    "animal_cruelty": "animal cruelty",
    "snake_venom_trade": "snake venom trade",
    "red_sanders_smuggling": "red sanders smuggling",
}


def _row_to_label(row: NewsItem) -> str:
    if not row.is_poaching:
        return "not wildlife crime"
    mapped = CRIME_TYPE_TO_LABEL.get((row.crime_type or "").strip())
    return mapped or "wildlife poaching"


def _row_to_text(row: NewsItem) -> str:
    return " ".join(
        value.strip()
        for value in [
            row.title or "",
            row.summary or "",
            row.intel_summary or "",
            row.species or "",
            row.state or "",
            row.district or "",
        ]
        if value and value.strip()
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Fine-tune SetFit classifier from existing labeled incidents.")
    parser.add_argument("--database-url", default="sqlite:///./data/news.db")
    parser.add_argument("--output-dir", default="./models/setfit-wildlife")
    parser.add_argument("--limit", type=int, default=2000)
    parser.add_argument("--epochs", type=int, default=1)
    args = parser.parse_args()

    try:
        from datasets import Dataset
        from setfit import SetFitModel, SetFitTrainer
    except Exception as err:  # noqa: BLE001
        raise SystemExit(f"Install AI extras before training SetFit model: {err}") from err

    engine = create_engine(args.database_url)
    with Session(engine) as db:
        rows = db.execute(select(NewsItem).order_by(NewsItem.id.desc()).limit(max(100, args.limit))).scalars().all()

    texts: list[str] = []
    labels: list[str] = []
    for row in rows:
        text = _row_to_text(row)
        if not text:
            continue
        texts.append(text)
        labels.append(_row_to_label(row))

    if len(texts) < 20:
        raise SystemExit("Not enough labeled rows found to train SetFit model.")

    dataset = Dataset.from_dict({"text": texts, "label": labels})
    model = SetFitModel.from_pretrained("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    trainer = SetFitTrainer(
        model=model,
        train_dataset=dataset,
        eval_dataset=dataset.select(range(min(100, len(dataset)))),
        metric="accuracy",
        num_iterations=20,
        batch_size=16,
        num_epochs=max(1, args.epochs),
        column_mapping={"text": "text", "label": "label"},
    )
    trainer.train()
    model.save_pretrained(args.output_dir)
    print(f"SetFit model saved to {args.output_dir}")


if __name__ == "__main__":
    main()

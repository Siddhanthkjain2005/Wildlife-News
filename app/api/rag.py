from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.rag_engine import rag_engine

router = APIRouter(tags=["rag"])


@router.get("/api/rag/ask")
def rag_ask(
    q: str = Query(default="", min_length=1),
    limit: int = Query(default=5, ge=1, le=20),
    candidate_limit: int = Query(default=2000, ge=1, le=10000),
    min_similarity: float = Query(default=0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
):
    query = q.strip()
    if not query:
        raise HTTPException(status_code=400, detail="q is required")
    return rag_engine.ask(
        db,
        query=query,
        limit=limit,
        candidate_limit=candidate_limit,
        min_similarity=min_similarity,
    )

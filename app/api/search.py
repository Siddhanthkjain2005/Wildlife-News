from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.search_engine import SemanticSearchEngine

router = APIRouter(tags=["search"])
search_engine = SemanticSearchEngine()


@router.get("/api/search")
def semantic_search(
    q: str = Query(default="", min_length=1),
    limit: int = Query(default=10, ge=1, le=100),
    candidate_limit: int = Query(default=2000, ge=1, le=10000),
    min_similarity: float = Query(default=0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
):
    query = q.strip()
    if not query:
        raise HTTPException(status_code=400, detail="q is required")
    return search_engine.search(
        db,
        query=query,
        limit=limit,
        candidate_limit=candidate_limit,
        min_similarity=min_similarity,
    )


@router.get("/api/similar/{incident_id}")
def similar_incidents(
    incident_id: int,
    limit: int = Query(default=5, ge=1, le=100),
    candidate_limit: int = Query(default=2000, ge=1, le=10000),
    min_similarity: float = Query(default=0.0, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
):
    result = search_engine.similar(
        db,
        incident_id=incident_id,
        limit=limit,
        candidate_limit=candidate_limit,
        min_similarity=min_similarity,
    )
    if result["incident"] is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return result

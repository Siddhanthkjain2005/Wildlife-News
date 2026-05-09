from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.graph_engine import GraphIntelligenceEngine

router = APIRouter(tags=["graph"])
graph_engine = GraphIntelligenceEngine()


@router.get("/api/graph/networks")
def graph_networks(
    db: Session = Depends(get_db),
    min_size: int = Query(default=3, ge=2, le=20),
    limit: int = Query(default=10, ge=1, le=100),
    incident_limit: int = Query(default=2000, ge=1, le=10000),
):
    return graph_engine.get_networks(db, min_size=min_size, limit=limit, incident_limit=incident_limit)


@router.get("/api/graph/person/{name}")
def graph_person_profile(
    name: str,
    db: Session = Depends(get_db),
    incident_limit: int = Query(default=2000, ge=1, le=10000),
):
    return graph_engine.get_person_profile(db, name=name, incident_limit=incident_limit)

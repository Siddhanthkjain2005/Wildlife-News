from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.predictor import predictor as wildlife_predictor

router = APIRouter(tags=["predictions"])


@router.post("/api/predictions/train")
def train_predictor(db: Session = Depends(get_db)):
    """Trigger retraining of the predictive model on all collected data."""
    return wildlife_predictor.train(db)


@router.get("/api/predictions")
def get_predictions():
    """Get all predictions: hotspots, species forecasts, network analysis, persons of interest."""
    return wildlife_predictor.get_predictions()


@router.get("/api/predictions/hotspots")
def get_hotspots():
    """Predicted poaching hotspots with risk scores."""
    data = wildlife_predictor.get_hotspots()
    if not data:
        return {"error": "Model not trained yet.", "hotspots": []}
    return {"hotspots": data}


@router.get("/api/predictions/species")
def get_species_forecast():
    """Species threat forecast — which species are increasingly targeted."""
    data = wildlife_predictor.get_species_forecast()
    if not data:
        return {"error": "Model not trained yet.", "species": []}
    return {"species": data}


@router.get("/api/predictions/persons")
def get_persons_of_interest():
    """Persons of interest — repeat offenders, kingpins, multi-state suspects."""
    data = wildlife_predictor.get_persons_of_interest()
    if not data:
        return {"error": "Model not trained yet.", "persons": []}
    return {"persons": data}


@router.get("/api/predictions/networks")
def get_network_analysis():
    """Crime network cluster analysis — syndicate identification."""
    data = wildlife_predictor.get_network_analysis()
    if not data:
        return {"error": "Model not trained yet.", "networks": []}
    return {"networks": data}


@router.get("/api/predictions/states")
def get_state_profiles():
    """State-level risk profiles and threat scores."""
    data = wildlife_predictor.get_state_profiles()
    if not data:
        return {"error": "Model not trained yet.", "states": {}}
    return {"states": data}


@router.get("/api/predictions/forecast")
def get_weekly_forecast():
    """Weekly incident forecast using exponential moving average."""
    data = wildlife_predictor.get_weekly_forecast()
    if not data:
        return {"error": "Model not trained yet.", "forecast": {}}
    return {"forecast": data}


@router.get("/api/predictions/model-info")
def get_model_info():
    """Get model training status and metrics."""
    return wildlife_predictor.model_info

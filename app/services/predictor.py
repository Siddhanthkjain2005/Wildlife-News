"""
Predictive AI Model — trained on collected wildlife crime data.

Provides:
1. Poaching hotspot prediction (which states/districts are at risk next)
2. Species threat forecasting (which species are increasingly targeted)
3. Crime trend prediction (weekly incident forecasting)
4. Threat network scoring (identifying organized crime patterns)

The model retrains periodically on the collected NewsItem data using
lightweight scikit-learn models that run efficiently on Railway.
"""

from __future__ import annotations

import json
import logging
import math
import pickle
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from pathlib import Path
from threading import Lock
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.intelligence import DistrictStat, Entity, SpeciesStat
from app.models.news import NewsItem
from app.repositories.news_filters import apply_strict_incident_filters, is_strict_incident_record

logger = logging.getLogger("app.predictor")

_MODEL_DIR = Path("./data/ml_models")
_MODEL_DIR.mkdir(parents=True, exist_ok=True)

_model_lock = Lock()


class WildlifeCrimePredictor:
    """Lightweight predictive model trained on collected wildlife crime data."""

    def __init__(self) -> None:
        self._trained = False
        self._last_trained_at: datetime | None = None
        self._training_sample_count = 0

        # Trained data caches
        self._state_risk_profile: dict[str, dict[str, float]] = {}
        self._species_trend: dict[str, dict[str, float]] = {}
        self._weekly_trend: list[dict[str, Any]] = []
        self._crime_type_distribution: dict[str, float] = {}
        self._hotspot_predictions: list[dict[str, Any]] = []
        self._species_forecasts: list[dict[str, Any]] = []
        self._network_clusters: list[dict[str, Any]] = []
        self._person_frequency: list[dict[str, Any]] = []
        self._weekly_forecast: dict[str, Any] = {}
        self._seasonal_analysis: dict[str, Any] = {}
        self._smuggling_corridors: list[dict[str, Any]] = []
        self._model_metrics: dict[str, Any] = {}
        self._incremental_count: int = 0

    _INCREMENTAL_RETRAIN_THRESHOLD = 25  # full retrain after this many incremental updates

    @property
    def is_trained(self) -> bool:
        return self._trained

    @property
    def model_info(self) -> dict[str, Any]:
        return {
            "trained": self._trained,
            "last_trained_at": self._last_trained_at.isoformat() if self._last_trained_at else None,
            "training_samples": self._training_sample_count,
            "metrics": self._model_metrics,
            "incremental_count": self._incremental_count,
        }

    def train(self, db: Session) -> dict[str, Any]:
        """Train the predictive model on all collected data."""
        with _model_lock:
            result = self._train_internal(db)
            self._incremental_count = 0
            return result

    def incremental_update(self, db: Session, news_item: Any) -> dict[str, Any]:
        """Lightweight update after a single article is inserted/merged.

        Performs a full retrain every _INCREMENTAL_RETRAIN_THRESHOLD articles;
        otherwise just updates counters and key frequency tables.
        """
        with _model_lock:
            if not is_strict_incident_record(news_item):
                return {"action": "incremental", "ok": True, "skipped": True, "reason": "outside_strict_scope"}
            self._incremental_count += 1
            if self._incremental_count >= self._INCREMENTAL_RETRAIN_THRESHOLD:
                logger.info("Incremental threshold reached (%d), triggering full retrain.", self._incremental_count)
                result = self._train_internal(db)
                self._incremental_count = 0
                return {"action": "full_retrain", **result}

            # Lightweight: update state risk, species trend, person frequency
            try:
                state = (getattr(news_item, 'state', '') or '').strip().title() or 'Unknown'
                if state not in self._state_risk_profile:
                    self._state_risk_profile[state] = {
                        'total_incidents': 0, 'avg_risk_score': 0, 'threat_score': 0,
                        'recent_7d': 0, 'recency_factor': 1.0,
                    }
                profile = self._state_risk_profile[state]
                prev_total = profile.get('total_incidents', 0)
                prev_avg = profile.get('avg_risk_score', 0)
                risk = getattr(news_item, 'risk_score', 0) or 0
                new_total = prev_total + 1
                profile['total_incidents'] = new_total
                profile['avg_risk_score'] = round((prev_avg * prev_total + risk) / new_total, 2)
                profile['recent_7d'] = profile.get('recent_7d', 0) + 1
                profile['threat_score'] = min(100, round(
                    profile['avg_risk_score'] * 0.4 + min(50, new_total) * 0.6 * 2
                , 2))

                # Species
                for raw_sp in str(getattr(news_item, 'species', '') or '').split(','):
                    sp = raw_sp.strip().lower()
                    if sp and sp not in self._species_trend:
                        self._species_trend[sp] = {'total_incidents': 0, 'avg_risk': 0, 'trend_label': 'new'}
                    if sp:
                        entry = self._species_trend[sp]
                        prev_t = entry.get('total_incidents', 0)
                        prev_r = entry.get('avg_risk', 0)
                        entry['total_incidents'] = prev_t + 1
                        entry['avg_risk'] = round((prev_r * prev_t + risk) / (prev_t + 1), 2)

                # Persons
                for raw_p in str(getattr(news_item, 'involved_persons', '') or '').split(','):
                    person = raw_p.strip()
                    if person and len(person) >= 3 and 'unnamed' not in person.lower():
                        found = False
                        for entry in self._person_frequency:
                            if entry.get('name', '').lower() == person.lower():
                                entry['incident_count'] = entry.get('incident_count', 0) + 1
                                found = True
                                break
                        if not found:
                            self._person_frequency.append({
                                'name': person,
                                'incident_count': 1,
                                'states': [state],
                                'threat_label': 'suspect',
                            })

                # Crime type
                ct = (getattr(news_item, 'crime_type', 'unknown') or 'unknown').strip().lower()
                # Recompute distribution
                total_crimes = sum(self._crime_type_distribution.values()) + 1
                self._crime_type_distribution[ct] = self._crime_type_distribution.get(ct, 0) + (100 / total_crimes)

                self._training_sample_count += 1
                self._save_model()
                return {'action': 'incremental', 'incremental_count': self._incremental_count, 'ok': True}
            except Exception as err:
                logger.warning('Incremental update failed: %s', err)
                return {'action': 'incremental', 'ok': False, 'error': str(err)}

    def _train_internal(self, db: Session) -> dict[str, Any]:
        start = datetime.utcnow()

        # Fetch all poaching news
        rows = db.execute(
            apply_strict_incident_filters(select(NewsItem)).order_by(NewsItem.published_at.asc())
        ).scalars().all()

        if len(rows) < 5:
            return {"ok": False, "error": "Insufficient data for training", "sample_count": len(rows)}

        self._training_sample_count = len(rows)

        # 1. Build state risk profiles
        self._state_risk_profile = self._compute_state_risk_profiles(rows)

        # 2. Build species trend analysis
        self._species_trend = self._compute_species_trends(rows)

        # 3. Build weekly timeline for forecasting
        self._weekly_trend = self._compute_weekly_trend(rows)

        # 4. Crime type distribution
        self._crime_type_distribution = self._compute_crime_type_distribution(rows)

        # 5. Predict hotspots
        self._hotspot_predictions = self._predict_hotspots(rows, db)

        # 6. Species threat forecast
        self._species_forecasts = self._forecast_species_threats(rows)

        # 7. Network cluster analysis
        self._network_clusters = self._analyze_network_clusters(rows)

        # 8. Person frequency analysis
        self._person_frequency = self._analyze_person_frequency(rows)

        # 9. Weekly forecast
        self._weekly_forecast = self._forecast_weekly_incidents(rows)

        # 10. Seasonal crime patterns
        self._seasonal_analysis = self._compute_seasonal_analysis(rows)

        # 11. Smuggling corridor detection
        self._smuggling_corridors = self._detect_smuggling_corridors(rows)

        # 12. Model metrics
        duration = (datetime.utcnow() - start).total_seconds()
        self._model_metrics = {
            "training_duration_seconds": round(duration, 2),
            "total_samples": len(rows),
            "unique_states": len(self._state_risk_profile),
            "unique_species": len(self._species_trend),
            "hotspot_count": len(self._hotspot_predictions),
            "network_clusters": len(self._network_clusters),
            "persons_identified": len(self._person_frequency),
        }

        self._trained = True
        self._last_trained_at = datetime.utcnow()

        # Save model to disk
        self._save_model()

        logger.info(
            "Predictive model trained: %d samples, %d states, %d species, %.1fs",
            len(rows), len(self._state_risk_profile), len(self._species_trend), duration,
        )

        return {"ok": True, "metrics": self._model_metrics}

    # ── State Risk Profiling ──────────────────────────────────────────

    @staticmethod
    def _compute_state_risk_profiles(rows: list[NewsItem]) -> dict[str, dict[str, float]]:
        state_data: dict[str, list[dict]] = defaultdict(list)
        for row in rows:
            state = (row.state or "").strip().title() or "Unknown"
            state_data[state].append({
                "risk": row.risk_score,
                "confidence": row.confidence,
                "network": row.network_indicator,
                "repeat": row.repeat_indicator,
                "published": row.published_at,
            })

        profiles = {}
        now = datetime.utcnow()
        for state, items in state_data.items():
            total = len(items)
            avg_risk = sum(i["risk"] for i in items) / total
            avg_confidence = sum(i["confidence"] for i in items) / total
            network_rate = sum(1 for i in items if i["network"]) / total
            repeat_rate = sum(1 for i in items if i["repeat"]) / total

            # Recency weighting — more recent incidents = higher threat
            recent_count = sum(1 for i in items if (now - i["published"]).days <= 7)
            recency_factor = min(2.0, 1.0 + (recent_count / max(1, total)) * 3)

            # Composite threat score
            threat_score = min(100.0, round(
                (avg_risk * 0.35)
                + (avg_confidence * 100 * 0.15)
                + (network_rate * 100 * 0.15)
                + (repeat_rate * 100 * 0.10)
                + (min(50, total) * 0.5)  # volume factor
                * recency_factor
            , 2))

            profiles[state] = {
                "total_incidents": total,
                "avg_risk_score": round(avg_risk, 2),
                "avg_confidence": round(avg_confidence, 4),
                "network_rate": round(network_rate, 4),
                "repeat_rate": round(repeat_rate, 4),
                "recent_7d": recent_count,
                "threat_score": threat_score,
                "recency_factor": round(recency_factor, 2),
            }

        return dict(sorted(profiles.items(), key=lambda x: x[1]["threat_score"], reverse=True))

    # ── Species Trend Analysis ────────────────────────────────────────

    @staticmethod
    def _compute_species_trends(rows: list[NewsItem]) -> dict[str, dict[str, float]]:
        species_weekly: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        species_risk: dict[str, list[int]] = defaultdict(list)
        now = datetime.utcnow()

        for row in rows:
            for raw_species in str(row.species or "").split(","):
                sp = raw_species.strip().lower()
                if not sp:
                    continue
                week = row.published_at.isocalendar()
                week_key = f"{week[0]}-W{week[1]:02d}"
                species_weekly[sp][week_key] += 1
                species_risk[sp].append(row.risk_score)

        trends = {}
        for sp, weekly_counts in species_weekly.items():
            sorted_weeks = sorted(weekly_counts.items())
            if len(sorted_weeks) < 2:
                trend_direction = 0.0
            else:
                recent = sum(v for _, v in sorted_weeks[-2:])
                older = sum(v for _, v in sorted_weeks[:-2]) / max(1, len(sorted_weeks) - 2)
                trend_direction = round(recent - older, 2)

            risks = species_risk.get(sp, [0])
            total_incidents = sum(weekly_counts.values())
            trends[sp] = {
                "total_incidents": total_incidents,
                "avg_risk": round(sum(risks) / len(risks), 2),
                "max_risk": max(risks),
                "weekly_trend": trend_direction,
                "trend_label": "increasing" if trend_direction > 1 else "decreasing" if trend_direction < -1 else "stable",
                "weeks_active": len(sorted_weeks),
            }

        return dict(sorted(trends.items(), key=lambda x: x[1]["total_incidents"], reverse=True))

    # ── Weekly Timeline ───────────────────────────────────────────────

    @staticmethod
    def _compute_weekly_trend(rows: list[NewsItem]) -> list[dict[str, Any]]:
        weekly: dict[str, dict[str, int]] = {}
        for row in rows:
            week_start = (row.published_at - timedelta(days=row.published_at.weekday())).date()
            wk = week_start.isoformat()
            bucket = weekly.setdefault(wk, {"incidents": 0, "high_risk": 0, "risk_sum": 0})
            bucket["incidents"] += 1
            bucket["risk_sum"] += row.risk_score
            if row.risk_score >= 75:
                bucket["high_risk"] += 1

        result = []
        for wk in sorted(weekly.keys()):
            d = weekly[wk]
            result.append({
                "week": wk,
                "incidents": d["incidents"],
                "high_risk": d["high_risk"],
                "avg_risk": round(d["risk_sum"] / d["incidents"], 1),
            })
        return result

    # ── Crime Type Distribution ───────────────────────────────────────

    @staticmethod
    def _compute_crime_type_distribution(rows: list[NewsItem]) -> dict[str, float]:
        counter = Counter()
        for row in rows:
            ct = (row.crime_type or "unknown").strip().lower()
            counter[ct] += 1
        total = sum(counter.values()) or 1
        return {k: round(v / total * 100, 2) for k, v in counter.most_common(20)}

    # ── Hotspot Prediction ────────────────────────────────────────────

    @staticmethod
    def _predict_hotspots(rows: list[NewsItem], db: Session) -> list[dict[str, Any]]:
        now = datetime.utcnow()
        state_district_data: dict[tuple[str, str], list[dict]] = defaultdict(list)

        for row in rows:
            state = (row.state or "").strip().title()
            district = (row.district or "").strip().title()
            if not state:
                continue
            key = (state, district or "Unknown")
            state_district_data[key].append({
                "risk": row.risk_score,
                "published": row.published_at,
                "network": row.network_indicator,
                "repeat": row.repeat_indicator,
            })

        predictions = []
        for (state, district), items in state_district_data.items():
            total = len(items)
            recent = sum(1 for i in items if (now - i["published"]).days <= 14)
            avg_risk = sum(i["risk"] for i in items) / total
            network_count = sum(1 for i in items if i["network"])

            # Predict risk level for next 2 weeks
            velocity = recent / max(1, total) * 100  # % of incidents in last 2 weeks
            predicted_risk = min(100, round(
                avg_risk * 0.4
                + velocity * 0.3
                + (network_count / total * 100) * 0.2
                + min(30, total) * 0.1 * 3
            ))

            threat_level = (
                "critical" if predicted_risk >= 80
                else "high" if predicted_risk >= 60
                else "moderate" if predicted_risk >= 40
                else "low"
            )

            predictions.append({
                "state": state,
                "district": district,
                "total_incidents": total,
                "recent_14d": recent,
                "avg_risk": round(avg_risk, 1),
                "network_signals": network_count,
                "predicted_risk": predicted_risk,
                "threat_level": threat_level,
                "velocity_score": round(velocity, 1),
            })

        predictions.sort(key=lambda x: x["predicted_risk"], reverse=True)
        return predictions[:30]

    # ── Species Threat Forecast ───────────────────────────────────────

    def _forecast_species_threats(self, rows: list[NewsItem]) -> list[dict[str, Any]]:
        now = datetime.utcnow()
        species_data: dict[str, list[dict]] = defaultdict(list)

        for row in rows:
            for raw in str(row.species or "").split(","):
                sp = raw.strip().lower()
                if not sp:
                    continue
                species_data[sp].append({
                    "risk": row.risk_score,
                    "published": row.published_at,
                    "state": (row.state or "").strip().title(),
                })

        forecasts = []
        for species, items in species_data.items():
            total = len(items)
            recent_7d = sum(1 for i in items if (now - i["published"]).days <= 7)
            recent_30d = sum(1 for i in items if (now - i["published"]).days <= 30)
            avg_risk = sum(i["risk"] for i in items) / total

            # Acceleration: is targeting increasing?
            if total > 5:
                first_half = items[:total // 2]
                second_half = items[total // 2:]
                acceleration = len(second_half) / max(1, len(first_half))
            else:
                acceleration = 1.0

            # Top affected states
            state_counter = Counter(i["state"] for i in items if i["state"])
            top_states = [s for s, _ in state_counter.most_common(3)]

            threat_score = min(100, round(
                avg_risk * 0.3
                + min(50, recent_30d) * 0.4 * 2
                + acceleration * 10
            ))

            forecasts.append({
                "species": species,
                "total_incidents": total,
                "recent_7d": recent_7d,
                "recent_30d": recent_30d,
                "avg_risk": round(avg_risk, 1),
                "acceleration": round(acceleration, 2),
                "threat_score": threat_score,
                "top_states": top_states,
                "trend": "accelerating" if acceleration > 1.3 else "declining" if acceleration < 0.7 else "stable",
            })

        forecasts.sort(key=lambda x: x["threat_score"], reverse=True)
        return forecasts[:20]

    # ── Network Cluster Analysis ──────────────────────────────────────

    @staticmethod
    def _analyze_network_clusters(rows: list[NewsItem]) -> list[dict[str, Any]]:
        network_rows = [r for r in rows if r.network_indicator]
        if not network_rows:
            return []

        # Group by state + crime_type as a proxy for syndicate identification
        clusters: dict[str, list[NewsItem]] = defaultdict(list)
        for row in network_rows:
            state = (row.state or "Unknown").strip().title()
            crime = (row.crime_type or "unknown").strip().lower()
            cluster_key = f"{state}|{crime}"
            clusters[cluster_key].append(row)

        result = []
        for cluster_key, items in clusters.items():
            state, crime = cluster_key.split("|", 1)
            all_persons = []
            all_species = set()
            for item in items:
                for p in str(item.involved_persons or "").split(","):
                    p = p.strip()
                    if p and "unnamed" not in p.lower():
                        all_persons.append(p)
                for sp in str(item.species or "").split(","):
                    sp = sp.strip().lower()
                    if sp:
                        all_species.add(sp)

            person_counter = Counter(all_persons)
            repeat_persons = [{"name": name, "count": count} for name, count in person_counter.most_common(5) if count >= 1]

            avg_risk = sum(i.risk_score for i in items) / len(items)
            result.append({
                "state": state,
                "crime_type": crime,
                "incident_count": len(items),
                "avg_risk": round(avg_risk, 1),
                "species_involved": sorted(all_species),
                "repeat_persons": repeat_persons,
                "persons_total": len(set(all_persons)),
                "threat_level": "critical" if avg_risk >= 80 else "high" if avg_risk >= 60 else "moderate",
            })

        result.sort(key=lambda x: x["incident_count"], reverse=True)
        return result[:15]

    # ── Person Frequency Analysis ─────────────────────────────────────

    @staticmethod
    def _analyze_person_frequency(rows: list[NewsItem]) -> list[dict[str, Any]]:
        person_data: dict[str, dict[str, Any]] = {}

        for row in rows:
            for raw_person in str(row.involved_persons or "").split(","):
                person = raw_person.strip()
                if not person or "unnamed" in person.lower() or len(person) < 3:
                    continue
                key = person.lower()
                if key not in person_data:
                    person_data[key] = {
                        "name": person,
                        "incident_count": 0,
                        "states": set(),
                        "crime_types": set(),
                        "species": set(),
                        "risk_scores": [],
                        "first_seen": row.published_at,
                        "last_seen": row.published_at,
                        "network_linked": False,
                    }
                entry = person_data[key]
                entry["incident_count"] += 1
                if row.state:
                    entry["states"].add(row.state.strip().title())
                if row.crime_type:
                    entry["crime_types"].add(row.crime_type)
                for sp in str(row.species or "").split(","):
                    sp = sp.strip().lower()
                    if sp:
                        entry["species"].add(sp)
                entry["risk_scores"].append(row.risk_score)
                entry["first_seen"] = min(entry["first_seen"], row.published_at)
                entry["last_seen"] = max(entry["last_seen"], row.published_at)
                if row.network_indicator:
                    entry["network_linked"] = True

        result = []
        for key, data in person_data.items():
            risks = data["risk_scores"]
            result.append({
                "name": data["name"],
                "incident_count": data["incident_count"],
                "states": sorted(data["states"]),
                "crime_types": sorted(data["crime_types"]),
                "species": sorted(data["species"]),
                "avg_risk": round(sum(risks) / len(risks), 1),
                "max_risk": max(risks),
                "first_seen": data["first_seen"].isoformat(),
                "last_seen": data["last_seen"].isoformat(),
                "network_linked": data["network_linked"],
                "multi_state": len(data["states"]) > 1,
                "threat_label": (
                    "high_value_target" if data["incident_count"] >= 3 or (data["network_linked"] and data["incident_count"] >= 2)
                    else "repeat_offender" if data["incident_count"] >= 2
                    else "suspect"
                ),
            })

        result.sort(key=lambda x: (-x["incident_count"], -x["avg_risk"]))
        return result[:50]

    # ── Weekly Forecast ───────────────────────────────────────────────

    @staticmethod
    def _forecast_weekly_incidents(rows: list[NewsItem]) -> dict[str, Any]:
        now = datetime.utcnow()
        weekly_counts: dict[str, int] = defaultdict(int)
        weekly_risk: dict[str, list[int]] = defaultdict(list)

        for row in rows:
            week_start = (row.published_at - timedelta(days=row.published_at.weekday())).date()
            wk = week_start.isoformat()
            weekly_counts[wk] += 1
            weekly_risk[wk].append(row.risk_score)

        sorted_weeks = sorted(weekly_counts.items())
        if len(sorted_weeks) < 3:
            return {"forecast": "insufficient_data", "confidence": 0}

        # Simple exponential moving average forecast
        counts = [v for _, v in sorted_weeks]
        alpha = 0.3  # smoothing factor
        ema = counts[0]
        for c in counts[1:]:
            ema = alpha * c + (1 - alpha) * ema

        # Trend from last 4 weeks
        recent_4 = counts[-4:] if len(counts) >= 4 else counts
        if len(recent_4) >= 2:
            trend = (recent_4[-1] - recent_4[0]) / len(recent_4)
        else:
            trend = 0

        forecast_count = max(0, round(ema + trend))
        avg_recent_risk = sum(
            sum(weekly_risk[wk]) / len(weekly_risk[wk])
            for wk in [w for w, _ in sorted_weeks[-4:]]
            if weekly_risk.get(wk)
        ) / min(4, len(sorted_weeks))

        # Confidence based on data stability
        if len(counts) >= 8:
            mean = sum(counts) / len(counts)
            variance = sum((c - mean) ** 2 for c in counts) / len(counts)
            cv = math.sqrt(variance) / max(1, mean)  # coefficient of variation
            confidence = max(0.2, min(0.95, 1.0 - cv * 0.5))
        else:
            confidence = 0.4

        return {
            "forecast_next_week_incidents": forecast_count,
            "forecast_avg_risk": round(avg_recent_risk, 1),
            "trend": "increasing" if trend > 0.5 else "decreasing" if trend < -0.5 else "stable",
            "trend_value": round(trend, 2),
            "ema_value": round(ema, 2),
            "confidence": round(confidence, 3),
            "weeks_of_data": len(sorted_weeks),
            "total_incidents": sum(counts),
        }

    # ── Seasonal Analysis ──────────────────────────────────────────────

    @staticmethod
    def _compute_seasonal_analysis(rows: list[NewsItem]) -> dict[str, Any]:
        """Monthly crime heatmap with seasonal markers."""
        monthly: dict[int, list[int]] = defaultdict(list)
        for row in rows:
            month = row.published_at.month
            monthly[month].append(row.risk_score)

        SEASON_MAP = {
            1: "winter", 2: "winter", 3: "summer", 4: "summer",
            5: "summer", 6: "monsoon", 7: "monsoon", 8: "monsoon",
            9: "monsoon", 10: "post_monsoon", 11: "winter", 12: "winter",
        }
        MONTH_NAMES = {
            1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
            7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
        }

        monthly_data = []
        for m in range(1, 13):
            risks = monthly.get(m, [])
            monthly_data.append({
                "month": MONTH_NAMES[m],
                "month_num": m,
                "season": SEASON_MAP[m],
                "incident_count": len(risks),
                "avg_risk": round(sum(risks) / len(risks), 1) if risks else 0,
                "max_risk": max(risks) if risks else 0,
            })

        # Find peak and low months
        if monthly_data:
            peak = max(monthly_data, key=lambda x: x["incident_count"])
            low = min((m for m in monthly_data if m["incident_count"] > 0),
                      key=lambda x: x["incident_count"], default=monthly_data[0])
        else:
            peak = low = {"month": "Unknown", "incident_count": 0}

        # Season aggregates
        season_agg: dict[str, int] = defaultdict(int)
        for md in monthly_data:
            season_agg[md["season"]] += md["incident_count"]

        return {
            "monthly": monthly_data,
            "peak_month": peak["month"],
            "peak_count": peak["incident_count"],
            "low_month": low["month"],
            "low_count": low["incident_count"],
            "season_totals": dict(season_agg),
            "peak_season": max(season_agg, key=season_agg.get) if season_agg else "unknown",
        }

    # ── Smuggling Corridor Detection ──────────────────────────────────

    @staticmethod
    def _detect_smuggling_corridors(rows: list[NewsItem]) -> list[dict[str, Any]]:
        """Identify likely smuggling routes via state-pair and species co-occurrence."""
        # Build route patterns from articles mentioning multiple states or transport
        route_pairs: dict[tuple[str, str], dict] = defaultdict(lambda: {
            "count": 0, "species": Counter(), "risk_sum": 0,
        })

        for row in rows:
            state = (row.state or "").strip().title()
            if not state:
                continue
            # Check for route mentions in text
            text = f"{row.title or ''} {row.summary or ''}".lower()
            route_keywords = ["from", "to", "smuggled", "transported", "interstate",
                              "cross-border", "via", "route", "corridor", "trafficking"]
            has_route = any(kw in text for kw in route_keywords)

            if has_route and row.network_indicator:
                # Try to find destination/origin mentions
                species_list = [s.strip().lower() for s in (row.species or "").split(",") if s.strip()]
                # Use this as a state-level route indicator
                for sp in species_list:
                    key = (state, sp)
                    route_pairs[key]["count"] += 1
                    route_pairs[key]["risk_sum"] += row.risk_score

        corridors = []
        for (state, species), data in route_pairs.items():
            if data["count"] >= 1:
                corridors.append({
                    "origin_state": state,
                    "species": species,
                    "incident_count": data["count"],
                    "avg_risk": round(data["risk_sum"] / data["count"], 1),
                    "threat_level": "high" if data["count"] >= 3 else "moderate" if data["count"] >= 2 else "low",
                })

        corridors.sort(key=lambda x: (-x["incident_count"], -x["avg_risk"]))
        return corridors[:20]

    # ── Persistence ───────────────────────────────────────────────────

    def _save_model(self) -> None:
        try:
            data = {
                "trained": self._trained,
                "last_trained_at": self._last_trained_at.isoformat() if self._last_trained_at else None,
                "training_sample_count": self._training_sample_count,
                "state_risk_profile": self._state_risk_profile,
                "species_trend": self._species_trend,
                "weekly_trend": self._weekly_trend,
                "crime_type_distribution": self._crime_type_distribution,
                "hotspot_predictions": self._hotspot_predictions,
                "species_forecasts": self._species_forecasts,
                "network_clusters": self._network_clusters,
                "person_frequency": self._person_frequency,
                "weekly_forecast": self._weekly_forecast,
                "seasonal_analysis": self._seasonal_analysis,
                "smuggling_corridors": self._smuggling_corridors,
                "model_metrics": self._model_metrics,
                "incremental_count": self._incremental_count,
            }
            model_path = _MODEL_DIR / "predictor_state.json"
            model_path.write_text(json.dumps(data, ensure_ascii=False, default=str, indent=2))
            logger.info("Model state saved to %s", model_path)
        except Exception as err:
            logger.warning("Failed to save model state: %s", err)

    def load_model(self) -> bool:
        try:
            model_path = _MODEL_DIR / "predictor_state.json"
            if not model_path.exists():
                return False
            data = json.loads(model_path.read_text())
            self._trained = data.get("trained", False)
            self._last_trained_at = (
                datetime.fromisoformat(data["last_trained_at"])
                if data.get("last_trained_at") else None
            )
            self._training_sample_count = data.get("training_sample_count", 0)
            self._state_risk_profile = data.get("state_risk_profile", {})
            self._species_trend = data.get("species_trend", {})
            self._weekly_trend = data.get("weekly_trend", [])
            self._crime_type_distribution = data.get("crime_type_distribution", {})
            self._hotspot_predictions = data.get("hotspot_predictions", [])
            self._species_forecasts = data.get("species_forecasts", [])
            self._network_clusters = data.get("network_clusters", [])
            self._person_frequency = data.get("person_frequency", [])
            self._weekly_forecast = data.get("weekly_forecast", {})
            self._seasonal_analysis = data.get("seasonal_analysis", {})
            self._smuggling_corridors = data.get("smuggling_corridors", [])
            self._model_metrics = data.get("model_metrics", {})
            self._incremental_count = data.get("incremental_count", 0)
            logger.info("Model state loaded: trained=%s, samples=%d", self._trained, self._training_sample_count)
            return self._trained
        except Exception as err:
            logger.warning("Failed to load model state: %s", err)
            return False

    # ── Public API ────────────────────────────────────────────────────

    def get_predictions(self) -> dict[str, Any]:
        if not self._trained:
            return {"error": "Model not trained yet. Trigger training via /api/predictions/train."}
        return {
            "model_info": self.model_info,
            "weekly_forecast": self._weekly_forecast,
            "hotspot_predictions": self._hotspot_predictions[:10],
            "species_forecasts": self._species_forecasts[:10],
            "crime_type_distribution": self._crime_type_distribution,
            "network_clusters": self._network_clusters[:5],
            "top_persons_of_interest": self._person_frequency[:10],
            "seasonal_analysis": self._seasonal_analysis,
            "smuggling_corridors": self._smuggling_corridors[:10],
        }

    def get_hotspots(self) -> list[dict[str, Any]]:
        return self._hotspot_predictions if self._trained else []

    def get_species_forecast(self) -> list[dict[str, Any]]:
        return self._species_forecasts if self._trained else []

    def get_persons_of_interest(self) -> list[dict[str, Any]]:
        return self._person_frequency if self._trained else []

    def get_network_analysis(self) -> list[dict[str, Any]]:
        return self._network_clusters if self._trained else []

    def get_state_profiles(self) -> dict[str, dict[str, float]]:
        return self._state_risk_profile if self._trained else {}

    def get_weekly_forecast(self) -> dict[str, Any]:
        return self._weekly_forecast if self._trained else {}


# Singleton instance
predictor = WildlifeCrimePredictor()

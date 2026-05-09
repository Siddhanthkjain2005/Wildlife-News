from __future__ import annotations

from collections import Counter
from itertools import combinations

import networkx as nx
from sqlalchemy.orm import Session

from app.models import NewsItem
from app.repositories.incident_repo import IncidentRepository


class GraphIntelligenceEngine:
    def __init__(self, default_incident_limit: int = 2000) -> None:
        self.default_incident_limit = default_incident_limit

    @staticmethod
    def _person_node_id(name: str) -> str:
        return f"person:{name.strip().lower()}"

    @staticmethod
    def _incident_node_id(news_id: int) -> str:
        return f"incident:{news_id}"

    @staticmethod
    def _extract_persons(raw_value: str) -> list[str]:
        persons: list[str] = []
        seen: set[str] = set()
        for chunk in (raw_value or "").split(","):
            name = chunk.strip()
            if not name:
                continue
            if "unnamed suspect" in name.lower():
                continue
            key = name.lower()
            if key in seen:
                continue
            seen.add(key)
            persons.append(name)
        return persons

    def _load_incidents(self, db: Session, limit: int | None = None) -> list[NewsItem]:
        safe_limit = max(1, min(10000, int(limit or self.default_incident_limit)))
        repo = IncidentRepository(db)
        return repo.list_recent_poaching(limit=safe_limit)

    def _build_graph(self, incidents: list[NewsItem]) -> nx.Graph:
        graph = nx.Graph()

        for incident in incidents:
            incident_node = self._incident_node_id(incident.id)
            graph.add_node(
                incident_node,
                type="incident",
                incident_id=incident.id,
                title=incident.title,
                state=incident.state,
                district=incident.district,
                species=incident.species,
                risk_score=incident.risk_score,
                published_at=incident.published_at.isoformat(),
            )

            persons = self._extract_persons(incident.involved_persons)
            if not persons:
                continue

            for person in persons:
                person_node = self._person_node_id(person)
                if graph.has_node(person_node):
                    graph.nodes[person_node]["incident_count"] = int(graph.nodes[person_node].get("incident_count", 0)) + 1
                else:
                    graph.add_node(
                        person_node,
                        type="person",
                        name=person,
                        incident_count=1,
                    )
                graph.add_edge(person_node, incident_node, edge_type="involved_in")

            for left, right in combinations(persons, 2):
                left_node = self._person_node_id(left)
                right_node = self._person_node_id(right)
                if graph.has_edge(left_node, right_node):
                    graph[left_node][right_node]["co_incident_count"] = int(
                        graph[left_node][right_node].get("co_incident_count", 0)
                    ) + 1
                else:
                    graph.add_edge(left_node, right_node, edge_type="co_accused", co_incident_count=1)

        return graph

    def get_networks(self, db: Session, *, min_size: int = 3, limit: int = 10, incident_limit: int | None = None) -> dict[str, object]:
        safe_min_size = max(2, min(20, min_size))
        safe_limit = max(1, min(100, limit))
        incidents = self._load_incidents(db, limit=incident_limit)
        graph = self._build_graph(incidents)

        person_nodes = [node for node, attrs in graph.nodes(data=True) if attrs.get("type") == "person"]
        person_graph = graph.subgraph(person_nodes).copy()
        components = sorted(nx.connected_components(person_graph), key=len, reverse=True)

        networks: list[dict[str, object]] = []
        for component in components:
            if len(component) < safe_min_size:
                continue
            component_graph = person_graph.subgraph(component).copy()
            centrality = nx.betweenness_centrality(component_graph)
            top_actors = sorted(
                [
                    {
                        "name": component_graph.nodes[node].get("name", node),
                        "centrality": round(float(score), 4),
                        "incident_count": int(component_graph.nodes[node].get("incident_count", 0)),
                    }
                    for node, score in centrality.items()
                ],
                key=lambda item: (item["centrality"], item["incident_count"]),
                reverse=True,
            )[:5]

            incident_ids: set[int] = set()
            state_counter: Counter[str] = Counter()
            species_counter: Counter[str] = Counter()
            for person_node in component:
                for neighbor in graph.neighbors(person_node):
                    neighbor_attrs = graph.nodes[neighbor]
                    if neighbor_attrs.get("type") != "incident":
                        continue
                    incident_id = int(neighbor_attrs.get("incident_id"))
                    incident_ids.add(incident_id)
                    state = str(neighbor_attrs.get("state") or "").strip()
                    if state:
                        state_counter[state] += 1
                    for species in str(neighbor_attrs.get("species") or "").split(","):
                        species_name = species.strip().lower()
                        if species_name:
                            species_counter[species_name] += 1

            networks.append(
                {
                    "network_id": f"net-{len(networks) + 1}",
                    "suspect_count": len(component),
                    "incident_count": len(incident_ids),
                    "top_states": [{"state": state, "count": count} for state, count in state_counter.most_common(5)],
                    "top_species": [{"species": species, "count": count} for species, count in species_counter.most_common(5)],
                    "top_actors": top_actors,
                }
            )
            if len(networks) >= safe_limit:
                break

        return {
            "incidents_analyzed": len(incidents),
            "person_nodes": len(person_nodes),
            "network_count": len(networks),
            "networks": networks,
        }

    def get_person_profile(self, db: Session, *, name: str, incident_limit: int | None = None) -> dict[str, object]:
        target = name.strip()
        if not target:
            return {"person": "", "incident_count": 0, "connections": [], "incidents": []}

        incidents = self._load_incidents(db, limit=incident_limit)
        graph = self._build_graph(incidents)
        node_id = self._person_node_id(target)

        if node_id not in graph.nodes:
            return {"person": target, "incident_count": 0, "connections": [], "incidents": []}

        incident_lookup = {item.id: item for item in incidents}

        related_incidents: list[dict[str, object]] = []
        for neighbor in graph.neighbors(node_id):
            attrs = graph.nodes[neighbor]
            if attrs.get("type") != "incident":
                continue
            incident_id = int(attrs.get("incident_id"))
            incident = incident_lookup.get(incident_id)
            if incident is None:
                continue
            related_incidents.append(
                {
                    "id": incident.id,
                    "title": incident.title,
                    "state": incident.state,
                    "district": incident.district,
                    "risk_score": incident.risk_score,
                    "published_at": incident.published_at.isoformat(),
                    "open_url": f"/open/{incident.id}",
                }
            )
        related_incidents.sort(key=lambda item: item["published_at"], reverse=True)

        connections: list[dict[str, object]] = []
        for neighbor in graph.neighbors(node_id):
            attrs = graph.nodes[neighbor]
            if attrs.get("type") != "person":
                continue
            edge = graph.get_edge_data(node_id, neighbor) or {}
            connections.append(
                {
                    "name": attrs.get("name", neighbor),
                    "co_incident_count": int(edge.get("co_incident_count", 0)),
                    "incident_count": int(attrs.get("incident_count", 0)),
                }
            )
        connections.sort(key=lambda item: (item["co_incident_count"], item["incident_count"]), reverse=True)

        return {
            "person": graph.nodes[node_id].get("name", target),
            "incident_count": int(graph.nodes[node_id].get("incident_count", 0)),
            "connections": connections[:20],
            "incidents": related_incidents[:50],
        }

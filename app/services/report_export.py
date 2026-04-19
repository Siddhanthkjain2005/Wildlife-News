from __future__ import annotations

import csv
from io import BytesIO, StringIO
from statistics import mean

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill


def build_csv_bytes(rows: list[dict[str, object]]) -> bytes:
    fields = [
        "date",
        "risk_score",
        "species",
        "state",
        "district",
        "crime_type",
        "source",
        "confidence",
        "title",
        "two_line_summary",
        "key_intelligence_points",
        "likely_smuggling_route",
        "action_recommendation",
        "confidence_explanation",
    ]
    stream = StringIO()
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    for row in rows:
        writer.writerow({key: row.get(key, "") for key in fields})
    return stream.getvalue().encode("utf-8")


def _date_range(rows: list[dict[str, object]]) -> str:
    values = [str(row.get("date", "")).strip() for row in rows if str(row.get("date", "")).strip()]
    if not values:
        return "-"
    values.sort()
    return f"{values[0][:10]} to {values[-1][:10]}"


def _top_hotspots(rows: list[dict[str, object]], limit: int = 6) -> list[tuple[str, int]]:
    counts: dict[str, int] = {}
    for row in rows:
        state = str(row.get("state", "")).strip() or "Unknown"
        district = str(row.get("district", "")).strip() or "Unknown"
        key = f"{district}, {state}"
        counts[key] = counts.get(key, 0) + 1
    return sorted(counts.items(), key=lambda item: item[1], reverse=True)[:limit]


def _top_recommendations(rows: list[dict[str, object]], limit: int = 6) -> list[tuple[str, int]]:
    counts: dict[str, int] = {}
    for row in rows:
        recommendation = str(row.get("action_recommendation", "")).strip()
        if not recommendation:
            continue
        counts[recommendation] = counts.get(recommendation, 0) + 1
    return sorted(counts.items(), key=lambda item: item[1], reverse=True)[:limit]


def build_excel_bytes(rows: list[dict[str, object]], title: str = "Wildlife Intelligence Report") -> bytes:
    wb = Workbook()
    ws_exec = wb.active
    ws_exec.title = "Executive Summary"
    ws_incidents = wb.create_sheet("Incidents")
    ws_reco = wb.create_sheet("Recommendations")

    heading_fill = PatternFill(start_color="1F4E78", end_color="1F4E78", fill_type="solid")
    heading_font = Font(color="FFFFFF", bold=True)

    ws_exec["A1"] = title
    ws_exec["A1"].font = Font(size=16, bold=True)
    ws_exec["A3"] = "Date Range"
    ws_exec["B3"] = _date_range(rows)
    ws_exec["A4"] = "Total Incidents"
    ws_exec["B4"] = len(rows)
    avg_risk = round(mean([float(row.get("risk_score", 0) or 0) for row in rows]), 2) if rows else 0.0
    ws_exec["A5"] = "Average Risk"
    ws_exec["B5"] = avg_risk
    ws_exec["A6"] = "High Risk Incidents (>80)"
    ws_exec["B6"] = sum(1 for row in rows if int(row.get("risk_score", 0) or 0) > 80)
    ws_exec["A8"] = "Top Hotspots"
    ws_exec["A8"].font = Font(bold=True)
    hotspot_row = 9
    for label, count in _top_hotspots(rows):
        ws_exec.cell(row=hotspot_row, column=1, value=label)
        ws_exec.cell(row=hotspot_row, column=2, value=count)
        hotspot_row += 1
    ws_exec.column_dimensions["A"].width = 42
    ws_exec.column_dimensions["B"].width = 20

    incident_fields = [
        "date",
        "risk_score",
        "species",
        "state",
        "district",
        "crime_type",
        "source",
        "confidence",
        "title",
        "two_line_summary",
        "key_intelligence_points",
        "likely_smuggling_route",
        "action_recommendation",
        "confidence_explanation",
    ]
    ws_incidents.append(incident_fields)
    for col_idx in range(1, len(incident_fields) + 1):
        cell = ws_incidents.cell(row=1, column=col_idx)
        cell.fill = heading_fill
        cell.font = heading_font
        cell.alignment = Alignment(horizontal="center", vertical="center")
    for row in rows:
        ws_incidents.append([row.get(key, "") for key in incident_fields])
    widths = {
        "A": 18,
        "B": 10,
        "C": 20,
        "D": 18,
        "E": 20,
        "F": 20,
        "G": 22,
        "H": 12,
        "I": 48,
        "J": 52,
        "K": 54,
        "L": 48,
        "M": 48,
        "N": 52,
    }
    for column, width in widths.items():
        ws_incidents.column_dimensions[column].width = width
    for row in ws_incidents.iter_rows(min_row=2):
        for cell in row:
            cell.alignment = Alignment(vertical="top", wrap_text=True)

    ws_reco.append(["Recommendation", "Incident Count"])
    for col_idx in (1, 2):
        cell = ws_reco.cell(row=1, column=col_idx)
        cell.fill = heading_fill
        cell.font = heading_font
    for recommendation, count in _top_recommendations(rows, limit=20):
        ws_reco.append([recommendation, count])
    ws_reco.column_dimensions["A"].width = 90
    ws_reco.column_dimensions["B"].width = 18
    for row in ws_reco.iter_rows(min_row=2):
        row[0].alignment = Alignment(vertical="top", wrap_text=True)

    buffer = BytesIO()
    wb.save(buffer)
    return buffer.getvalue()


def build_pdf_bytes(rows: list[dict[str, object]], title: str = "Wildlife Intelligence Report") -> bytes:
    buf = BytesIO()
    pdf = canvas.Canvas(buf, pagesize=A4)
    width, height = A4

    y = height - 2 * cm
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(2 * cm, y, title)
    y -= 0.8 * cm
    pdf.setFont("Helvetica", 9)
    pdf.drawString(2 * cm, y, f"Date range: {_date_range(rows)}")
    y -= 0.55 * cm
    pdf.drawString(2 * cm, y, f"Total incidents: {len(rows)}")
    y -= 0.8 * cm
    high_risk = sum(1 for row in rows if int(row.get("risk_score", 0) or 0) > 80)
    pdf.drawString(2 * cm, y, f"High-risk incidents (>80): {high_risk}")
    y -= 0.8 * cm

    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(2 * cm, y, "Top hotspots")
    y -= 0.5 * cm
    pdf.setFont("Helvetica", 9)
    for hotspot, count in _top_hotspots(rows):
        if y < 2.2 * cm:
            pdf.showPage()
            y = height - 2 * cm
            pdf.setFont("Helvetica", 9)
        pdf.drawString(2.3 * cm, y, f"- {hotspot}: {count}")
        y -= 0.42 * cm

    y -= 0.2 * cm
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(2 * cm, y, "Top recommendations")
    y -= 0.5 * cm
    pdf.setFont("Helvetica", 9)
    for recommendation, count in _top_recommendations(rows):
        if y < 2.2 * cm:
            pdf.showPage()
            y = height - 2 * cm
            pdf.setFont("Helvetica", 9)
        pdf.drawString(2.3 * cm, y, f"- ({count}) {recommendation[:95]}")
        y -= 0.42 * cm

    pdf.showPage()
    y = height - 2 * cm
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(2 * cm, y, "High-risk incident details")
    y -= 0.7 * cm
    pdf.setFont("Helvetica", 9)

    for idx, row in enumerate(rows[:220], start=1):
        if int(row.get("risk_score", 0) or 0) <= 80:
            continue
        if y < 2.2 * cm:
            pdf.showPage()
            y = height - 2 * cm
            pdf.setFont("Helvetica", 9)
        line = (
            f"{idx}. {row.get('date', '-')[:16]} | Risk {row.get('risk_score', 0)} | "
            f"{str(row.get('state', '-'))[:15]}/{str(row.get('district', '-'))[:15]} | "
            f"{str(row.get('crime_type', '-'))[:20]}"
        )
        pdf.drawString(2 * cm, y, line)
        y -= 0.45 * cm
        title_line = str(row.get("title", ""))[:105]
        pdf.setFillGray(0.15)
        pdf.drawString(2.4 * cm, y, title_line)
        pdf.setFillGray(0.0)
        y -= 0.42 * cm
        route_line = f"Route: {str(row.get('likely_smuggling_route', '-'))[:95]}"
        pdf.drawString(2.4 * cm, y, route_line)
        y -= 0.38 * cm
        reco_line = f"Action: {str(row.get('action_recommendation', '-'))[:95]}"
        pdf.drawString(2.4 * cm, y, reco_line)
        y -= 0.38 * cm

    pdf.save()
    return buf.getvalue()

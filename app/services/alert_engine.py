from __future__ import annotations

import smtplib
from email.message import EmailMessage

import requests
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.logger import get_logger
from app.models import Alert, NewsItem
from app.services.audit import record_audit

logger = get_logger("app.alerts")


class AlertEngine:
    def __init__(self) -> None:
        self.telegram_enabled = bool(
            settings.telegram_alerts_enabled and settings.telegram_bot_token and settings.telegram_chat_id
        )
        self.email_enabled = bool(
            settings.email_alerts_enabled
            and settings.smtp_host
            and settings.smtp_username
            and settings.smtp_password
            and settings.alert_email_to
        )

    def _telegram_send(self, text: str) -> bool:
        if not self.telegram_enabled:
            return False
        url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
        payload = {"chat_id": settings.telegram_chat_id, "text": text}
        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            return True
        except requests.RequestException as err:
            logger.warning("Telegram alert failed: %s", err)
            return False

    def _email_send(self, subject: str, body: str) -> bool:
        if not self.email_enabled:
            return False
        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = settings.smtp_username
        message["To"] = settings.alert_email_to
        message.set_content(body)
        try:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=12) as smtp:
                smtp.starttls()
                smtp.login(settings.smtp_username, settings.smtp_password)
                smtp.send_message(message)
            return True
        except (smtplib.SMTPException, OSError) as err:
            logger.warning("Email alert failed: %s", err)
            return False

    @staticmethod
    def _format_alert_message(alert: Alert, news: NewsItem) -> str:
        return (
            f"[{alert.severity.upper()}] Wildlife crime incident\n"
            f"Title: {news.title}\n"
            f"State/District: {news.state or '-'} / {news.district or '-'}\n"
            f"Risk: {news.risk_score} | Confidence: {news.confidence:.2f}\n"
            f"Crime: {news.crime_type}\n"
            f"Species: {news.species or '-'}\n"
            f"Reason: {alert.trigger_reason}\n"
            f"URL: {news.url}"
        )

    def dispatch_pending_alerts(self, db: Session, limit: int = 50) -> dict[str, int]:
        pending_filter = Alert.sent_popup.is_(False)
        if self.telegram_enabled:
            pending_filter = pending_filter | Alert.sent_telegram.is_(False)
        if self.email_enabled:
            pending_filter = pending_filter | Alert.sent_email.is_(False)

        pending = (
            db.execute(
                select(Alert)
                .where(pending_filter)
                .order_by(Alert.created_at.asc())
                .limit(max(1, min(200, limit)))
            )
            .scalars()
            .all()
        )
        if not pending:
            return {"processed": 0, "telegram_sent": 0, "email_sent": 0, "popup_marked": 0}

        news_map = {
            row.id: row
            for row in db.execute(
                select(NewsItem).where(NewsItem.id.in_([alert.news_id for alert in pending]))
            ).scalars().all()
        }
        telegram_sent = 0
        email_sent = 0
        popup_marked = 0

        for alert in pending:
            news = news_map.get(alert.news_id)
            if news is None:
                continue
            message = self._format_alert_message(alert, news)
            if not alert.sent_popup:
                alert.sent_popup = True
                popup_marked += 1
            if not alert.sent_telegram:
                if self.telegram_enabled:
                    if self._telegram_send(message):
                        alert.sent_telegram = True
                        telegram_sent += 1
                    else:
                        record_audit(
                            db,
                            actor="system",
                            action="failed_alert",
                            status="error",
                            notes=f"telegram failed for alert_id={alert.id} news_id={alert.news_id}",
                        )
                else:
                    alert.sent_telegram = True
            if not alert.sent_email:
                if self.email_enabled:
                    subject = f"[Wildlife Alert] {alert.severity.upper()} {news.state or ''} {news.crime_type}".strip()
                    if self._email_send(subject, message):
                        alert.sent_email = True
                        email_sent += 1
                    else:
                        record_audit(
                            db,
                            actor="system",
                            action="failed_alert",
                            status="error",
                            notes=f"email failed for alert_id={alert.id} news_id={alert.news_id}",
                        )
                else:
                    alert.sent_email = True

        db.commit()
        return {
            "processed": len(pending),
            "telegram_sent": telegram_sent,
            "email_sent": email_sent,
            "popup_marked": popup_marked,
        }

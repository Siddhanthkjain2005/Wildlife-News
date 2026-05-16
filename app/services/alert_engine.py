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
            (settings.email_alerts_enabled and settings.smtp_host and settings.smtp_username and settings.smtp_password)
            or settings.resend_api_key
            or settings.sendgrid_api_key
        )
        self.resend_enabled = bool(settings.resend_api_key)
        self.sendgrid_enabled = bool(settings.sendgrid_api_key)
        self.whatsapp_enabled = bool(
            settings.whatsapp_alerts_enabled and settings.whatsapp_phone and settings.whatsapp_api_key
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

    def _resend_send(self, subject: str, body: str) -> bool:
        if not self.resend_enabled or not settings.resend_api_key:
            return False
        url = "https://api.resend.com/emails"
        headers = {
            "Authorization": f"Bearer {settings.resend_api_key}",
            "Content-Type": "application/json",
        }
        # Use onboarding@resend.dev for testing if they haven't verified a domain
        payload = {
            "from": settings.alert_email_from,
            "to": [settings.alert_email_to or ""],
            "subject": subject,
            "text": body,
        }
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            if response.status_code != 201:
                logger.warning("Resend API error (%d): %s", response.status_code, response.text)
                return False
            return True
        except requests.RequestException as err:
            logger.warning("Resend alert failed: %s", err)
            return False

    def _sendgrid_send(self, subject: str, body: str) -> bool:
        if not self.sendgrid_enabled or not settings.sendgrid_api_key:
            return False
        url = "https://api.sendgrid.com/v3/mail/send"
        headers = {
            "Authorization": f"Bearer {settings.sendgrid_api_key}",
            "Content-Type": "application/json",
        }
        # Extract name from ALERT_EMAIL_FROM if present (e.g., "Name <email@site.com>")
        from_email = settings.alert_email_from
        from_name = "Wildlife Intelligence"
        if "<" in from_email and ">" in from_email:
            from_name = from_email.split("<")[0].strip()
            from_email = from_email.split("<")[1].split(">")[0].strip()

        payload = {
            "personalizations": [{"to": [{"email": settings.alert_email_to or ""}]}],
            "from": {"email": from_email, "name": from_name},
            "subject": subject,
            "content": [{"type": "text/plain", "value": body}],
        }
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            if response.status_code not in {200, 201, 202}:
                logger.warning("SendGrid API error (%d): %s", response.status_code, response.text)
                return False
            return True
        except requests.RequestException as err:
            logger.warning("SendGrid alert failed: %s", err)
            return False

    def _twilio_whatsapp_send(self, to_phone: str, text: str) -> tuple[bool, str]:
        if not settings.twilio_account_sid or not settings.twilio_auth_token:
            return False, "Missing Twilio Credentials"
        
        url = f"https://api.twilio.com/2010-04-01/Accounts/{settings.twilio_account_sid}/Messages.json"
        target = to_phone.strip()
        if not target.startswith("whatsapp:"):
            target = f"whatsapp:{target}"
            
        payload = {
            "From": settings.twilio_whatsapp_from,
            "To": target,
            "Body": text,
        }
        try:
            response = requests.post(
                url,
                data=payload,
                auth=(settings.twilio_account_sid, settings.twilio_auth_token),
                timeout=12
            )
            if response.status_code not in {200, 201}:
                err_msg = f"Twilio error {response.status_code}: {response.text[:200]}"
                logger.warning("Twilio error for %s: %s", target, err_msg)
                return False, err_msg
            logger.info("WhatsApp alert sent via Twilio to %s", target)
            return True, "OK"
        except requests.RequestException as err:
            logger.warning("Twilio connection failed for %s: %s", target, err)
            return False, str(err)

    def _whatsapp_send(self, text: str) -> tuple[bool, str]:
        if not self.whatsapp_enabled or not settings.whatsapp_phone:
            return False, "WhatsApp disabled or no phone number configured"
            
        phones = [p.strip() for p in settings.whatsapp_phone.split(",") if p.strip()]
        success_count = 0
        last_error = "Unknown error"
        
        for phone in phones:
            if settings.twilio_account_sid and settings.twilio_auth_token:
                ok, err = self._twilio_whatsapp_send(phone, text)
                if ok:
                    success_count += 1
                else:
                    last_error = err
            elif settings.whatsapp_api_key:
                url = "https://api.callmebot.com/whatsapp.php"
                params = {"phone": phone, "text": text, "apikey": settings.whatsapp_api_key}
                try:
                    resp = requests.get(url, params=params, timeout=12)
                    if resp.status_code == 200:
                        success_count += 1
                    else:
                        last_error = f"CallMeBot error {resp.status_code}"
                except requests.RequestException as e:
                    last_error = str(e)
        
        if success_count > 0:
            return True, f"Sent to {success_count} recipients"
        return False, last_error

    def _email_send(self, subject: str, body: str) -> bool:
        if not self.email_enabled:
            return False
        
        # Priority 1: SendGrid (Best for free users without domains)
        if self.sendgrid_enabled:
            return self._sendgrid_send(subject, body)

        # Priority 2: Resend (Best for users WITH domains)
        if self.resend_enabled:
            return self._resend_send(subject, body)
        
        import socket
        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = settings.alert_email_from
        message["To"] = settings.alert_email_to
        message.set_content(body)
        
        host = str(settings.smtp_host)
        port = int(settings.smtp_port)
        
        try:
            if port == 465:
                # Use SMTP_SSL for port 465 (Standard for SSL)
                with smtplib.SMTP_SSL(host, port, timeout=30) as smtp:
                    smtp.login(settings.smtp_username, settings.smtp_password)
                    smtp.send_message(message)
            else:
                # Use standard SMTP (Standard for 587/TLS)
                with smtplib.SMTP(host, port, timeout=30) as smtp:
                    if port == 587:
                        smtp.starttls()
                    smtp.login(settings.smtp_username, settings.smtp_password)
                    smtp.send_message(message)
            return True
        except (smtplib.SMTPException, OSError, socket.error) as err:
            logger.warning("Email alert failed (host=%s, port=%d): %s", host, port, err)
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
        if self.whatsapp_enabled:
            pending_filter = pending_filter | Alert.sent_whatsapp.is_(False)

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
            return {"processed": 0, "telegram_sent": 0, "email_sent": 0, "whatsapp_sent": 0, "popup_marked": 0}

        news_map = {
            row.id: row
            for row in db.execute(
                select(NewsItem).where(NewsItem.id.in_([alert.news_id for alert in pending]))
            ).scalars().all()
        }
        telegram_sent = 0
        email_sent = 0
        whatsapp_sent = 0
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
            if not alert.sent_whatsapp:
                if self.whatsapp_enabled:
                    ok, err = self._whatsapp_send(message)
                    if ok:
                        alert.sent_whatsapp = True
                        whatsapp_sent += 1
                    else:
                        record_audit(
                            db,
                            actor="system",
                            action="failed_alert",
                            status="error",
                            notes=f"whatsapp failed for alert_id={alert.id} news_id={alert.news_id}: {err}",
                        )
                else:
                    alert.sent_whatsapp = True

        db.commit()
        return {
            "processed": len(pending),
            "telegram_sent": telegram_sent,
            "email_sent": email_sent,
            "whatsapp_sent": whatsapp_sent,
            "popup_marked": popup_marked,
        }

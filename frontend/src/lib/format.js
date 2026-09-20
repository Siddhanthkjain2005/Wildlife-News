export function formatDate(value) {
  if (!value) return "-";
  const strValue = String(value).replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/, "$1T$2");
  const dt = new Date(strValue);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function formatDateShort(value) {
  if (!value) return "-";
  const strValue = String(value).replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/, "$1T$2");
  const dt = new Date(strValue);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function riskLevel(risk) {
  const value = Number(risk || 0);
  if (value > 80) return "high";
  if (value >= 50) return "medium";
  return "low";
}

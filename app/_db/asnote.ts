import { isKind, type Notice } from "../notice/data";

function asText(v: unknown) {
  return typeof v === "string" ? v : "";
}

function asTime(v: unknown) {
  if (typeof v === "string" && v.length > 0) return v;
  return "";
}

/** DB 행을 Notice로 바꾼다 */
export function toNote(row: Record<string, unknown>): Notice | null {
  const id = asText(row.id);
  const title = asText(row.title);
  const kind = asText(row.kind);
  const body = asText(row.body);
  const created = asTime(row.created_at);
  if (!id || !title || !body || !created || !isKind(kind)) return null;
  const pin = row.pin_until;
  const pinUntil = typeof pin === "string" && pin.length > 0 ? pin : null;
  return { id, title, kind, body, pinUntil, created };
}

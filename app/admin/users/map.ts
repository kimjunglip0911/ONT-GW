import { isRole, type Draft } from "./data";

export const MAX_B = 512 * 1024;

function asStr(v: unknown) {
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return typeof v === "string" ? v.trim() : "";
}

function asDay(v: unknown) {
  if (v instanceof Date && !Number.isNaN(v.getTime())) {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, "0");
    const d = String(v.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const s = asStr(v).replaceAll(".", "-");
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : "";
}

function asPay(v: unknown) {
  if (typeof v === "number") return v;
  const n = Number(String(v).replaceAll(",", ""));
  return Number.isFinite(n) ? n : NaN;
}

export function toDraft(row: Record<string, unknown>): Draft | null {
  const pass = asStr(row.pass);
  const name = asStr(row.name);
  const birth = asDay(row.birth);
  const hired = asDay(row.hired);
  const role = asStr(row.role);
  const pay = asPay(row.pay);
  if (!pass || !name || !birth || !hired || !isRole(role)) return null;
  if (!Number.isFinite(pay)) return null;
  return { pass, name, birth, pay, role, hired };
}

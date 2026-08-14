import { isRole, type Draft } from "./data.ts";

export const MAX_B = 512 * 1024;

export function asStr(v: unknown) {
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return typeof v === "string" ? v.trim() : "";
}

export function asDay(v: unknown) {
  if (v instanceof Date && !Number.isNaN(v.getTime())) {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, "0");
    const d = String(v.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const s = asStr(v).replaceAll(".", "-");
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : "";
}

export function asPay(v: unknown) {
  if (typeof v === "number") return v;
  const n = Number(String(v).replaceAll(",", ""));
  return Number.isFinite(n) ? n : NaN;
}

export function asEtc(v: unknown) {
  const n = asPay(v);
  return Number.isFinite(n) ? n : 0;
}

export function toDraft(row: Record<string, unknown>): Draft | null {
  const name = asStr(row.name);
  const birth = asDay(row.birth);
  const hired = asDay(row.hired);
  const role = asStr(row.role);
  const pay = asPay(row.pay);
  if (!name || !birth || !hired || !isRole(role)) return null;
  if (!Number.isFinite(pay)) return null;
  return {
    name, birth, hired, pay, role,
    wage: asEtc(row.wage),
    meal: asEtc(row.meal), fuel: asEtc(row.fuel),
    etc1: asEtc(row.etc1), etc2: asEtc(row.etc2),
  };
}

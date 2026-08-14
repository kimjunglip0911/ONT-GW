import { isRole, type User } from "../admin/users/data";

function asDay(v: unknown) {
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v)) {
    return v.slice(0, 10);
  }
  return "";
}

function asNum(v: unknown) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function asEtc(v: unknown) {
  const n = asNum(v);
  return Number.isFinite(n) ? n : 0;
}

/** DB 행을 목록용 User로 바꾼다. pass는 넣지 않는다 */
export function toUser(row: Record<string, unknown>): User | null {
  const uid = typeof row.uid === "string" ? row.uid : "";
  const name = typeof row.name === "string" ? row.name : "";
  const birth = asDay(row.birth);
  const hired = asDay(row.hired);
  const role = typeof row.role === "string" ? row.role : "";
  const pay = asNum(row.pay);
  if (!uid || !name || !birth || !hired || !isRole(role)) return null;
  if (!Number.isFinite(pay)) return null;
  return {
    uid, name, birth, hired, pay, role,
    wage: asEtc(row.wage),
    meal: asEtc(row.meal), fuel: asEtc(row.fuel),
    etc1: asEtc(row.etc1), etc2: asEtc(row.etc2),
  };
}

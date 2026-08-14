import { isRole, type Role } from "./data.ts";
import { asDay, asEtc, asPay, asStr } from "./map.ts";

/** 행 수정. 비밀번호는 초기화로만 바꾼다 */
export type Patch = {
  uid: string;
  name: string;
  birth: string;
  hired: string;
  pay: number;
  wage: number;
  meal: number;
  fuel: number;
  etc1: number;
  etc2: number;
  role: Role;
};

export function toPatch(
  uid: string,
  row: Record<string, unknown>,
): Patch | null {
  const name = asStr(row.name);
  const birth = asDay(row.birth);
  const hired = asDay(row.hired);
  const role = asStr(row.role);
  const pay = asPay(row.pay);
  if (!name || !birth || !hired || !isRole(role)) return null;
  if (!Number.isFinite(pay)) return null;
  return {
    uid, name, birth, hired, pay, role,
    wage: asEtc(row.wage),
    meal: asEtc(row.meal), fuel: asEtc(row.fuel),
    etc1: asEtc(row.etc1), etc2: asEtc(row.etc2),
  };
}

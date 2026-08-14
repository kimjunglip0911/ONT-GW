import { asTok, isOn } from "./check.ts";
import { isSeed } from "./seed.ts";

/** 쿠키 역할과 DB 행이 아직 유효한 세션인지 본다 */
export function sessTok(
  tok: string,
  uid: string,
  row: { pass: string; role: string } | null,
) {
  if (!isOn(tok) || !uid) return "";
  if (!row || isSeed(row.pass) || asTok(row.role) !== tok) return "";
  return tok;
}

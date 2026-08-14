import { cookies } from "next/headers";
import { clearRole } from "./cookie";
import { isOn } from "./check";
import { ROLE_KEY, UID_KEY } from "./names";
import { findUser } from "../_db/find";
import { sessTok } from "./sess";

/** 저장된 비밀번호가 기본값이거나 계정이 없으면 쿠키를 지운다 */
export async function liveTok() {
  const jar = await cookies();
  const tok = jar.get(ROLE_KEY)?.value ?? "";
  const uid = jar.get(UID_KEY)?.value ?? "";
  if (!isOn(tok)) return "";
  const row = uid ? await findUser(uid) : null;
  const next = sessTok(tok, uid, row);
  if (!next) await clearRole();
  return next;
}

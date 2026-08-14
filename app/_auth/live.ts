import { cookies } from "next/headers";
import { isOn } from "./check";
import { ROLE_KEY, UID_KEY } from "./names";
import { findUser } from "../_db/find";
import { sessTok } from "./sess";

/** 쿠키와 DB 행이 아직 유효한 역할인지 본다 */
export async function liveTok() {
  const jar = await cookies();
  const tok = jar.get(ROLE_KEY)?.value ?? "";
  const uid = jar.get(UID_KEY)?.value ?? "";
  if (!isOn(tok)) return "";
  try {
    const row = uid ? await findUser(uid) : null;
    return sessTok(tok, uid, row);
  } catch {
    return tok;
  }
}

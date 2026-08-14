import { cookies } from "next/headers";
import { isOk, isOn } from "./check";
import { ROLE_KEY } from "./names";

/** 요청 쿠키가 관리자인지 본다 */
export async function isAdmin() {
  const jar = await cookies();
  return isOk(jar.get(ROLE_KEY)?.value);
}

/** 요청 쿠키가 로그인인지 본다 */
export async function isAuthed() {
  const jar = await cookies();
  return isOn(jar.get(ROLE_KEY)?.value);
}

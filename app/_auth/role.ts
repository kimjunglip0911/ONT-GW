import { cookies } from "next/headers";
import { ROLE_KEY, ROLE_OK } from "./names";

/** 요청 쿠키가 임시 관리자인지 본다 */
export async function isAdmin() {
  const jar = await cookies();
  return jar.get(ROLE_KEY)?.value === ROLE_OK;
}

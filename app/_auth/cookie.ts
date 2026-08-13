import { cookies } from "next/headers";
import { ROLE_KEY, ROLE_OK } from "./names";

/** 임시 관리자 쿠키를 심는다 */
export async function setAdmin() {
  const jar = await cookies();
  jar.set(ROLE_KEY, ROLE_OK, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

/** 임시 관리자 쿠키를 지운다 */
export async function clearRole() {
  const jar = await cookies();
  jar.delete(ROLE_KEY);
}

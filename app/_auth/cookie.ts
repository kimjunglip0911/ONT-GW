import { cookies } from "next/headers";
import { ROLE_KEY } from "./names";

const AGE = 60 * 60 * 24 * 7;

function flags() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: AGE,
    secure: process.env.NODE_ENV === "production",
  };
}

/** 역할 쿠키를 심는다 */
export async function setRole(role: string) {
  const jar = await cookies();
  jar.set(ROLE_KEY, role, flags());
}

/** 역할 쿠키를 지운다 */
export async function clearRole() {
  const jar = await cookies();
  jar.delete(ROLE_KEY);
}

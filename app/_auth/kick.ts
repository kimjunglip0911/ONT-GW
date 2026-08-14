import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLogin } from "./gate";

/** 세션이 없으면 로그인으로 보낸다 */
export async function kickOff(authed: boolean) {
  if (authed) return;
  const path = (await headers()).get("x-path") ?? "";
  if (!path || isLogin(path)) return;
  redirect("/login");
}

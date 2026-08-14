import { NextResponse } from "next/server";
import { clearRole } from "../../_auth/cookie";

/** 레이아웃은 쿠키를 못 지우므로 여기서 지우고 로그인으로 보낸다 */
export async function GET(req: Request) {
  await clearRole();
  return NextResponse.redirect(new URL("/login", req.url));
}

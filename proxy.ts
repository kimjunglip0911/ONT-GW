import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_KEY, ROLE_OK } from "./app/_auth/names";

export function proxy(request: NextRequest) {
  const role = request.cookies.get(ROLE_KEY)?.value;
  if (role === ROLE_OK) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/notice", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

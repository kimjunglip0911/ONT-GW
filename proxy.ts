import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homeOf, isAdminPath, isApi, isLogin, safeNext } from "./app/_auth/gate";
import { isOk, isOn } from "./app/_auth/check";
import { ROLE_KEY } from "./app/_auth/names";

function goOn(request: NextRequest, path: string) {
  const h = new Headers(request.headers);
  h.set("x-path", path);
  return NextResponse.next({ request: { headers: h } });
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (isApi(path)) return NextResponse.next();
  const tok = request.cookies.get(ROLE_KEY)?.value ?? "";
  const next = request.nextUrl.searchParams.get("next") ?? "";
  if (!isOn(tok)) {
    if (isLogin(path)) return goOn(request, path);
    const url = new URL("/login", request.url);
    if (path !== "/") url.searchParams.set("next", path + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  if (isLogin(path)) {
    const go = safeNext(next, tok) || homeOf(tok);
    return NextResponse.redirect(new URL(go, request.url));
  }
  if (isAdminPath(path) && !isOk(tok)) {
    return NextResponse.redirect(new URL("/notice", request.url));
  }
  return goOn(request, path);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

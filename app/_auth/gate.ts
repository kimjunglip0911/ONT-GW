import { ROLE_OK, ROLE_STAFF } from "./names.ts";

/** 로그인·로그아웃 API인지 본다 */
export function isApi(path: string) {
  return path === "/api/login" || path === "/api/logout";
}

/** 로그인 화면인지 본다 */
export function isLogin(path: string) {
  return path === "/login";
}

/** 관리자 경로인지 본다 */
export function isAdminPath(path: string) {
  return path === "/admin" || path.startsWith("/admin/");
}

/** 역할 기본 화면 */
export function homeOf(tok: string) {
  return tok === ROLE_OK ? "/admin" : "/notice";
}

/** 안전한 next만 남긴다 */
export function safeNext(raw: string, tok: string) {
  if (!raw.startsWith("/") || raw.startsWith("//")) return "";
  if (raw.startsWith("/login")) return "";
  if (tok !== ROLE_OK && isAdminPath(raw.split("?")[0] ?? raw)) return "";
  if (tok !== ROLE_OK && tok !== ROLE_STAFF) return "";
  return raw;
}

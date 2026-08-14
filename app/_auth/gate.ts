import { ROLE_OK, ROLE_STAFF } from "./names.ts";

const APIS = ["/api/login", "/api/logout", "/api/passwd", "/api/kick"];

/** 로그인·로그아웃·비밀번호 변경·세션 종료 API인지 본다 */
export function isApi(path: string) {
  return APIS.includes(path);
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
  let path = raw.trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    return "";
  }
  if (path.includes("\\") || path.includes("..")) return "";
  if (!path.startsWith("/") || path.startsWith("//")) return "";
  if (path.startsWith("/login")) return "";
  if (tok !== ROLE_OK && isAdminPath(path.split("?")[0] ?? path)) return "";
  if (tok !== ROLE_OK && tok !== ROLE_STAFF) return "";
  return path;
}

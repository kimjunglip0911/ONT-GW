import { ROLE_OK, ROLE_STAFF } from "./names.ts";
import { isSeed } from "./seed.ts";

/** 아이디·비밀번호가 비어 있지 않은지 본다 */
export function hasCred(id: string, pass: string) {
  return id.length > 0 && pass.length > 0;
}

/** 저장된 비밀번호와 입력이 같은지 본다 */
export function passOk(got: string, want: string) {
  return want.length > 0 && got === want;
}

/** DB role을 쿠키 값으로 바꾼다 */
export function asTok(role: string) {
  if (role === "관리자") return ROLE_OK;
  if (role === "직원") return ROLE_STAFF;
  return "";
}

/** 관리자 쿠키인지 본다 */
export function isOk(v: string | undefined) {
  return v === ROLE_OK;
}

/** 로그인 쿠키인지 본다 */
export function isOn(v: string | undefined) {
  return v === ROLE_OK || v === ROLE_STAFF;
}

/** 기본 비밀번호면 변경 필요, 아니면 역할을 준다 */
export function loginOk(pass: string, tok: string) {
  if (isSeed(pass)) return { ok: true as const, need: true as const };
  return { ok: true as const, role: tok };
}

import { USER_ID } from "./names";

/** ADMIN 임시 계정과 환경 비밀번호가 맞는지 본다 */
export function passOk(id: string, pass: string, env: string) {
  return id === USER_ID && env.length > 0 && pass === env;
}

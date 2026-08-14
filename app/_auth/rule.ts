import { isSeed } from "./seed.ts";

/** 새 비밀번호와 확인이 같고 기본값이 아닌지 본다 */
export function newOk(a: string, b: string) {
  return a.length > 0 && a === b && !isSeed(a);
}

/** 아직 기본 비밀번호일 때만 새 값으로 바꿀 수 있다 */
export function canSet(stored: string, a: string, b: string) {
  return isSeed(stored) && newOk(a, b);
}

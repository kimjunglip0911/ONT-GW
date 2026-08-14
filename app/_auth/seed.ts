export const SEED = "1234";

/** 저장된 값이 기본 비밀번호인지 본다 */
export function isSeed(pass: string) {
  return pass === SEED;
}

import { isOk, isOn } from "./check";
import { liveTok } from "./live";

/** 요청 쿠키가 관리자인지 본다 */
export async function isAdmin() {
  return isOk(await liveTok());
}

/** 요청 쿠키가 로그인인지 본다 */
export async function isAuthed() {
  return isOn(await liveTok());
}

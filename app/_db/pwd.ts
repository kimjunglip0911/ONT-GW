import "server-only";
import { db } from "./sb";

/** uid의 비밀번호만 바꾼다 */
export async function setPass(uid: string, pass: string) {
  const { error } = await db().from("users").update({ pass }).eq("uid", uid);
  if (error) throw error;
}

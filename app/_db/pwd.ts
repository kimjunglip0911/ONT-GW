import "server-only";
import { db } from "./sb";

/** uid의 비밀번호만 바꾼다 */
export async function setPass(uid: string, pass: string) {
  const { error } = await db().from("users").update({ pass }).eq("uid", uid);
  if (error) throw error;
}

/** 저장된 값이 from일 때만 새 비밀번호로 바꾼다 */
export async function chgPass(uid: string, pass: string, from: string) {
  const { data, error } = await db()
    .from("users")
    .update({ pass })
    .eq("uid", uid)
    .eq("pass", from)
    .select("uid");
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

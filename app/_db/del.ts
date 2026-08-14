import "server-only";
import { db } from "./sb";

/** uid로 사용자를 지운다 */
export async function delUser(uid: string) {
  const { error } = await db().from("users").delete().eq("uid", uid);
  if (error) throw error;
}

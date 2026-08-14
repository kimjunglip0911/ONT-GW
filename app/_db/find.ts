import "server-only";
import { db } from "./sb";

export type Cred = { uid: string; pass: string; role: string };

/** uid로 로그인용 행을 읽는다. 목록에는 쓰지 않는다 */
export async function findUser(uid: string): Promise<Cred | null> {
  const { data, error } = await db()
    .from("users")
    .select("uid,pass,role")
    .eq("uid", uid)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const pass = typeof data.pass === "string" ? data.pass : "";
  const role = typeof data.role === "string" ? data.role : "";
  const id = typeof data.uid === "string" ? data.uid : "";
  if (!id || !pass || !role) return null;
  return { uid: id, pass, role };
}

import "server-only";
import { toUser } from "./cast";
import { COLS } from "./cols";
import { db } from "./sb";

/** public.users 목록. 비밀번호 없음 */
export async function listUsers() {
  const { data, error } = await db()
    .from("users")
    .select(COLS)
    .order("uid");
  if (error) throw error;
  return (data ?? []).flatMap((row) => {
    const user = toUser(row as Record<string, unknown>);
    return user ? [user] : [];
  });
}

import "server-only";
import type { User } from "../admin/users/data";
import type { Patch } from "../admin/users/patch";
import { toUser } from "./cast";
import { COLS } from "./cols";
import { db } from "./sb";

/** uid로 수정. pass가 없으면 비밀번호는 그대로 둔다 */
export async function updUser(row: Patch): Promise<User> {
  const body: Record<string, unknown> = {
    name: row.name,
    birth: row.birth,
    hired: row.hired,
    pay: row.pay,
    etc1: row.etc1,
    etc2: row.etc2,
    etc3: row.etc3,
    etc4: row.etc4,
    role: row.role,
  };
  if (row.pass) body.pass = row.pass;
  const { data, error } = await db()
    .from("users")
    .update(body)
    .eq("uid", row.uid)
    .select(COLS)
    .single();
  if (error || !data) throw error ?? new Error("update");
  const user = toUser(data as Record<string, unknown>);
  if (!user) throw new Error("map");
  return user;
}

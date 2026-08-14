import "server-only";
import { SEED } from "../_auth/seed";
import type { Draft, User } from "../admin/users/data";
import { nextUid } from "../admin/users/ids";
import { toUser } from "./cast";
import { COLS } from "./cols";
import { db } from "./sb";

/** 한 건 이상 insert. uid는 서버에서 붙인다 */
export async function addUsers(list: Draft[]): Promise<User[]> {
  if (!list.length) return [];
  const sb = db();
  const { data: prev, error: e1 } = await sb.from("users").select("uid");
  if (e1) throw e1;
  let cur = prev ?? [];
  const rows = list.map((row) => {
    const uid = nextUid(cur);
    cur = [...cur, { uid }];
    return { uid, ...row, pass: SEED };
  });
  const { data, error } = await sb.from("users").insert(rows).select(COLS);
  if (error || !data) throw error ?? new Error("insert");
  return data.flatMap((row) => {
    const user = toUser(row as Record<string, unknown>);
    return user ? [user] : [];
  });
}

export async function addUser(row: Draft): Promise<User> {
  const [user] = await addUsers([row]);
  if (!user) throw new Error("insert");
  return user;
}

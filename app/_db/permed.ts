import "server-only";
import { allOff, FEATS, staffOn, type Flags } from "./flags";
import { db } from "./sb";
import { listPerm, type Perm } from "./perm";

/** 역할 추가. 플래그는 직원 기본값 */
export async function addPerm(name: string): Promise<Perm[]> {
  const n = name.trim();
  if (!n) throw new Error("perm");
  const { error } = await db().from("perms").insert({
    name: n,
    pages: staffOn(),
    feats: allOff(FEATS),
  });
  if (error) throw error;
  return listPerm();
}

/** 역할 이름·플래그 저장 */
export async function setPerm(row: Perm): Promise<Perm[]> {
  const n = row.name.trim();
  if (!n) throw new Error("perm");
  const { error } = await db()
    .from("perms")
    .update({ name: n, pages: row.pages as Flags, feats: row.feats as Flags })
    .eq("id", row.id);
  if (error) throw error;
  return listPerm();
}

/** 역할 한 줄을 지운다 */
export async function delPerm(id: string): Promise<Perm[]> {
  const { error } = await db().from("perms").delete().eq("id", id);
  if (error) throw error;
  return listPerm();
}

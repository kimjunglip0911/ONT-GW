import "server-only";
import { db } from "./sb";
import { listPack, type Pack } from "./pack";

/** 이 패키지를 기본으로 둔다 */
export async function markDef(id: string): Promise<Pack[]> {
  const sb = db();
  const { error: e1 } = await sb.from("packs").update({ is_def: false }).eq("is_def", true);
  if (e1) throw e1;
  const { error } = await sb.from("packs").update({ is_def: true }).eq("id", id);
  if (error) throw error;
  return listPack();
}

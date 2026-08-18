import "server-only";
import { listBand, type Band } from "./band";
import { okRate } from "./rate";
import { db } from "./sb";

/** 구간 세율만 고친다 */
export async function setBand(row: Band): Promise<Band[]> {
  if (!row.id || !okRate(row.rate)) throw new Error("band");
  const { error } = await db()
    .from("bands")
    .update({ rate: row.rate })
    .eq("id", row.id);
  if (error) throw error;
  return listBand();
}

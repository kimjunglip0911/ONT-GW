import "server-only";
import { okRate } from "./rate";
import { db } from "./sb";
import { listTax, type Tax } from "./tax";

/** 공제 한 줄을 넣는다 */
export async function addTax(name: string, rate: number): Promise<Tax[]> {
  const n = name.trim();
  if (!n || !okRate(rate)) throw new Error("tax");
  const { error } = await db().from("taxes").insert({ name: n, rate, ord: 0 });
  if (error) throw error;
  return listTax();
}

/** 공제 한 줄을 고친다 */
export async function setTax(row: Tax): Promise<Tax[]> {
  const n = row.name.trim();
  if (!n || !okRate(row.rate)) throw new Error("tax");
  const { error } = await db()
    .from("taxes")
    .update({ name: n, rate: row.rate, ord: row.ord })
    .eq("id", row.id);
  if (error) throw error;
  return listTax();
}

/** 공제 한 줄을 지운다 */
export async function delTax(id: string): Promise<Tax[]> {
  const { error } = await db().from("taxes").delete().eq("id", id);
  if (error) throw error;
  return listTax();
}

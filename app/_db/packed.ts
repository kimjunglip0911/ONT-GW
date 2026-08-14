import "server-only";
import { asInt } from "./num";
import { asPack, listPack, type Pack } from "./pack";
import { db } from "./sb";

const COLS = "id,name,pay,hours,meal,fuel,is_def";

type Draft = Omit<Pack, "id" | "is_def">;

function body(row: Draft) {
  const name = row.name.trim();
  const pay = asInt(row.pay);
  const hours = asInt(row.hours);
  const meal = asInt(row.meal);
  const fuel = asInt(row.fuel);
  if (!name || [pay, hours, meal, fuel].some((n) => !Number.isFinite(n))) throw new Error("pack");
  return { name, pay, hours, meal, fuel };
}

/** 패키지 추가. 첫 건은 기본 */
export async function addPack(row: Draft): Promise<Pack[]> {
  const prev = await listPack();
  const { error } = await db()
    .from("packs")
    .insert({ ...body(row), is_def: prev.length === 0 });
  if (error) throw error;
  return listPack();
}

/** 패키지 숫자·이름 수정. 기본 여부는 안 바꿈 */
export async function setPack(row: Pack): Promise<Pack[]> {
  const { error } = await db().from("packs").update(body(row)).eq("id", row.id);
  if (error) throw error;
  return listPack();
}

/** 기본이 아닌 패키지만 지운다 */
export async function delPack(id: string): Promise<Pack[]> {
  const { data, error: e1 } = await db()
    .from("packs")
    .select(COLS)
    .eq("id", id)
    .maybeSingle();
  if (e1) throw e1;
  const pack = data ? asPack(data as Record<string, unknown>) : null;
  if (!pack || pack.is_def) throw new Error("def");
  const { error } = await db().from("packs").delete().eq("id", id);
  if (error) throw error;
  return listPack();
}

import "server-only";
import { asInt } from "./num";
import type { Pack } from "./rows";
import { db } from "./sb";

export type { Pack };

export function asPack(row: Record<string, unknown>): Pack | null {
  const id = typeof row.id === "string" ? row.id : "";
  const name = typeof row.name === "string" ? row.name.trim() : "";
  const pay = asInt(row.pay);
  const hours = asInt(row.hours);
  const meal = asInt(row.meal);
  const fuel = asInt(row.fuel);
  if (!id || !name || [pay, hours, meal, fuel].some((n) => !Number.isFinite(n))) {
    return null;
  }
  return { id, name, pay, hours, meal, fuel, is_def: row.is_def === true };
}

/** 급여 패키지 목록 */
export async function listPack(): Promise<Pack[]> {
  const { data, error } = await db()
    .from("packs")
    .select("id,name,pay,hours,meal,fuel,is_def")
    .order("name");
  if (error) throw error;
  return (data ?? []).flatMap((row) => {
    const pack = asPack(row as Record<string, unknown>);
    return pack ? [pack] : [];
  });
}

/** 기본 패키지. 없으면 null */
export async function defPack(): Promise<Pack | null> {
  const rows = await listPack();
  return rows.find((r) => r.is_def) ?? null;
}

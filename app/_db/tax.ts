import "server-only";
import { asNum } from "./num";
import { okRate } from "./rate";
import type { Tax } from "./rows";
import { db } from "./sb";

export type { Tax };

function asTax(row: Record<string, unknown>): Tax | null {
  const id = typeof row.id === "string" ? row.id : "";
  const name = typeof row.name === "string" ? row.name.trim() : "";
  const rate = asNum(row.rate);
  const ord = asNum(row.ord);
  if (!id || !name || !okRate(rate) || !Number.isFinite(ord)) return null;
  const note = typeof row.note === "string" ? row.note : "";
  return { id, name, rate, ord, note };
}

/** 공제 요율 목록 */
export async function listTax(): Promise<Tax[]> {
  const { data, error } = await db()
    .from("taxes")
    .select("id,name,rate,ord,note")
    .order("ord");
  if (error) throw error;
  return (data ?? []).flatMap((row) => {
    const tax = asTax(row as Record<string, unknown>);
    return tax ? [tax] : [];
  });
}

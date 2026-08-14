import "server-only";
import { asNum } from "./num";
import { okRate } from "./rate";
import { db } from "./sb";

export type Tax = { id: string; name: string; rate: number; ord: number };

function asTax(row: Record<string, unknown>): Tax | null {
  const id = typeof row.id === "string" ? row.id : "";
  const name = typeof row.name === "string" ? row.name.trim() : "";
  const rate = asNum(row.rate);
  const ord = asNum(row.ord);
  if (!id || !name || !okRate(rate) || !Number.isFinite(ord)) return null;
  return { id, name, rate, ord };
}

/** 공제 요율 목록 */
export async function listTax(): Promise<Tax[]> {
  const { data, error } = await db()
    .from("taxes")
    .select("id,name,rate,ord")
    .order("ord")
    .order("name");
  if (error) throw error;
  return (data ?? []).flatMap((row) => {
    const tax = asTax(row as Record<string, unknown>);
    return tax ? [tax] : [];
  });
}

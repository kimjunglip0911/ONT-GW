import "server-only";
import { asNum } from "./num";
import type { Band } from "./rows";
import { db } from "./sb";

export type { Band };

function asBand(row: Record<string, unknown>): Band | null {
  const id = typeof row.id === "string" ? row.id : "";
  const lo = asNum(row.lo);
  const hi = row.hi == null ? null : asNum(row.hi);
  const rate = asNum(row.rate);
  const cut = asNum(row.cut);
  const ord = asNum(row.ord);
  if (!id || [lo, rate, cut, ord].some((n) => !Number.isFinite(n))) return null;
  if (hi != null && !Number.isFinite(hi)) return null;
  return { id, lo, hi, rate, cut, ord };
}

/** 근로소득세 과세표준 구간 */
export async function listBand(): Promise<Band[]> {
  const { data, error } = await db()
    .from("bands")
    .select("id,lo,hi,rate,cut,ord")
    .order("ord");
  if (error) throw error;
  return (data ?? []).flatMap((row) => {
    const band = asBand(row as Record<string, unknown>);
    return band ? [band] : [];
  });
}

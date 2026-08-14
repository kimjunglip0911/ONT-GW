import "server-only";
import type { Flags } from "./flags";
import type { Perm } from "./rows";
import { db } from "./sb";

export type { Perm };

function asMap(v: unknown): Flags {
  if (!v || typeof v !== "object" || Array.isArray(v)) return {};
  return Object.fromEntries(
    Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, x === true]),
  );
}

function asPerm(row: Record<string, unknown>): Perm | null {
  const id = typeof row.id === "string" ? row.id : "";
  const name = typeof row.name === "string" ? row.name.trim() : "";
  if (!id || !name) return null;
  return { id, name, pages: asMap(row.pages), feats: asMap(row.feats) };
}

/** 권한 역할 목록 */
export async function listPerm(): Promise<Perm[]> {
  const { data, error } = await db()
    .from("perms")
    .select("id,name,pages,feats")
    .order("name");
  if (error) throw error;
  return (data ?? []).flatMap((row) => {
    const perm = asPerm(row as Record<string, unknown>);
    return perm ? [perm] : [];
  });
}

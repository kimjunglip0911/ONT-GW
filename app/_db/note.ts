import "server-only";
import type { Kind, Notice } from "../notice/data";
import { toNote } from "./asnote";
import { db } from "./sb";

const COLS = "id,title,kind,body,pin_until,created_at";

function pinAt(days: number) {
  if (days <= 0) return null;
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

/** 공지 한 건을 넣는다 */
export async function addNote(
  title: string,
  kind: Kind,
  body: string,
  days: number,
): Promise<Notice> {
  const { data, error } = await db()
    .from("notices")
    .insert({ title, kind, body, pin_until: pinAt(days) })
    .select(COLS)
    .single();
  if (error || !data) throw error ?? new Error("insert");
  const note = toNote(data as Record<string, unknown>);
  if (!note) throw new Error("map");
  return note;
}

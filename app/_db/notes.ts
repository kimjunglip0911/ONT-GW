import "server-only";
import type { Notice } from "../notice/data";
import { toNote } from "./asnote";
import { byPin } from "./rank";
import { db } from "./sb";

const COLS = "id,title,kind,body,pin_until,created_at";

/** public.notices 목록. 고정 글을 위로 둔다 */
export async function listNotes(): Promise<Notice[]> {
  const { data, error } = await db().from("notices").select(COLS);
  if (error) throw error;
  const rows = (data ?? []).flatMap((row) => {
    const note = toNote(row as Record<string, unknown>);
    return note ? [note] : [];
  });
  return byPin(rows, new Date());
}

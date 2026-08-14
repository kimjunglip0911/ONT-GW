import { listNotes } from "../_db/notes";
import type { Notice } from "./data";
import { List } from "./list";

export const dynamic = "force-dynamic";

export default async function Page() {
  let rows: Notice[] = [];
  let note = "사내 공지와 현장 안내를 확인합니다.";
  try {
    rows = await listNotes();
  } catch {
    note = "공지를 불러오지 못했습니다.";
  }
  return (
    <section>
      <p className="mb-6 text-sm text-muted">{note}</p>
      <List rows={rows} />
    </section>
  );
}

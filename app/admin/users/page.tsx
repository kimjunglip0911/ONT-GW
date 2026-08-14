import { listUsers } from "../../_db/list";
import type { User } from "./data";
import { Shell } from "./shell";

export const dynamic = "force-dynamic";

export default async function Page() {
  let rows: User[] = [];
  let note = "목록은 DB에 저장됩니다. 새로고침해도 유지됩니다.";
  try {
    rows = await listUsers();
  } catch {
    note = "DB에서 목록을 불러오지 못했습니다.";
  }
  return (
    <section>
      <p className="mb-6 text-sm text-muted">{note}</p>
      <Shell rows={rows} />
    </section>
  );
}

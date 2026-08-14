import { listUsers } from "../../_db/list";
import { defPack } from "../../_db/pack";
import type { User } from "./data";
import { fillOf } from "./fill";
import { Shell } from "./shell";

export const dynamic = "force-dynamic";

export default async function Page() {
  let rows: User[] = [];
  let note = "";
  let fill = fillOf(null);
  try {
    rows = await listUsers();
  } catch {
    note = "DB에서 목록을 불러오지 못했습니다.";
  }
  try {
    fill = fillOf(await defPack());
  } catch { /* 기본 패키지 조회 실패면 0 */ }
  return (
    <section>
      {note ? <p className="mb-6 text-sm text-muted">{note}</p> : null}
      <Shell fill={fill} rows={rows} />
    </section>
  );
}

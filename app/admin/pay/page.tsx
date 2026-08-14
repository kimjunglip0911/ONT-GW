import { listBand } from "../../_db/band";
import { listPack } from "../../_db/pack";
import { listPerm } from "../../_db/perm";
import { listTax } from "../../_db/tax";
import { Packs } from "./packs";
import { Pane } from "./pane";
import { Perms } from "./perms";
import { Taxs } from "./taxs";

export const dynamic = "force-dynamic";

export default async function Page() {
  let tax: Awaited<ReturnType<typeof listTax>> = [];
  let pack: Awaited<ReturnType<typeof listPack>> = [];
  let perm: Awaited<ReturnType<typeof listPerm>> = [];
  let band: Awaited<ReturnType<typeof listBand>> = [];
  let note = "";
  try {
    [tax, pack, perm, band] = await Promise.all([
      listTax(), listPack(), listPerm(), listBand(),
    ]);
  } catch {
    note = "DB에서 설정을 불러오지 못했습니다.";
  }
  return (
    <section className="grid gap-3">
      {note ? <p className="text-sm text-muted">{note}</p> : null}
      <Pane title="세금" kids={<Taxs bands={band} rows={tax} />} />
      <Pane title="급여" kids={<Packs rows={pack} />} />
      <Pane title="권한 설정" kids={<Perms rows={perm} />} />
    </section>
  );
}

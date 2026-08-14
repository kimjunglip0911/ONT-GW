"use client";

import type { User } from "./data";
import { Find } from "./find";
import { Form } from "./form";
import { nextUid } from "./ids";
import { Panel } from "./panel";
import { Upload } from "./upload";
import { useRows } from "./use";

export function Shell({ rows: init }: { rows: User[] }) {
  const x = useRows(init);
  return (
    <section>
      <Upload onMany={x.onMany} />
      <Form uid={nextUid(x.rows)} onAdd={x.onAdd} />
      <Find q={x.q} setQ={x.setQ} />
      <Panel
        empty={x.empty}
        onDrop={x.onDrop}
        onEdit={x.onEdit}
        onRst={x.onRst}
        rows={x.shown}
      />
    </section>
  );
}

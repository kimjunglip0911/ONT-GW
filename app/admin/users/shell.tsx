"use client";

import { useState } from "react";
import { saveEdit } from "./chg";
import type { Draft, User } from "./data";
import { byQuery } from "./filt";
import { Find } from "./find";
import { Form } from "./form";
import { nextUid } from "./ids";
import { Panel } from "./panel";
import type { Patch } from "./patch";
import { saveMany, saveOne } from "./save";
import { Upload } from "./upload";

export function Shell({ rows: init }: { rows: User[] }) {
  const [rows, setRows] = useState(init);
  const [q, setQ] = useState("");

  async function onAdd(row: Draft) {
    const { ok, err } = await saveOne(row);
    if (!ok) return err || "저장에 실패했습니다.";
    setRows((cur) => [...cur, ok]);
    return "";
  }

  async function onMany(list: Draft[]) {
    const { ok, err } = await saveMany(list);
    if (err) return { n: 0, err };
    setRows((cur) => [...cur, ...ok]);
    return { n: ok.length, err: "" };
  }

  async function onEdit(row: Patch) {
    const { ok, err } = await saveEdit(row);
    if (!ok) return err || "저장에 실패했습니다.";
    setRows((cur) => cur.map((r) => (r.uid === ok.uid ? ok : r)));
    return "";
  }

  const shown = byQuery(rows, q);
  const empty = q.trim() ? "조회 결과가 없습니다." : "등록된 사용자가 없습니다.";
  return (
    <section>
      <Upload onMany={onMany} />
      <Form uid={nextUid(rows)} onAdd={onAdd} />
      <Find q={q} setQ={setQ} />
      <Panel empty={empty} onEdit={onEdit} rows={shown} />
    </section>
  );
}

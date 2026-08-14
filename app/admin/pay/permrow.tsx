"use client";

import { useState } from "react";
import { FEATS, PAGES } from "../../_db/flags";
import type { Perm } from "../../_db/rows";
import { tiny } from "../box";
import { Checks } from "./checks";
import { btn, FEAT_LAB, PAGE_LAB } from "./labs";

type Props = { row: Perm; onSet: (row: Perm) => void; onDel: (id: string) => void };

export function PermRow({ row, onSet, onDel }: Props) {
  const [name, setName] = useState(row.name);
  const [pages, setPages] = useState(row.pages);
  const [feats, setFeats] = useState(row.feats);
  return (
    <li className="mb-3 grid gap-2 border-b border-line pb-3 last:border-0">
      <input className={tiny} value={name} onChange={(e) => setName(e.target.value)} />
      <p className="text-xs text-muted">페이지</p>
      <Checks keys={PAGES} labs={PAGE_LAB} flags={pages} onFlag={(k, on) => setPages((c) => ({ ...c, [k]: on }))} />
      <p className="text-xs text-muted">기능</p>
      <Checks keys={FEATS} labs={FEAT_LAB} flags={feats} onFlag={(k, on) => setFeats((c) => ({ ...c, [k]: on }))} />
      <div className="flex gap-2">
        <button className={btn} type="button" onClick={() => onSet({ ...row, name, pages, feats })}>저장</button>
        <button className={btn} type="button" onClick={() => onDel(row.id)}>삭제</button>
      </div>
    </li>
  );
}

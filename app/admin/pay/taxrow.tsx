"use client";

import { useState } from "react";
import { tiny } from "../box";
import type { Tax } from "../../_db/rows";
import { btn } from "./labs";

type Props = { row: Tax; onSet: (row: Tax) => void; onDel: (id: string) => void };

export function TaxRow({ row, onSet, onDel }: Props) {
  const [name, setName] = useState(row.name);
  const [rate, setRate] = useState(String(row.rate));
  return (
    <li className="mb-2 flex flex-wrap items-center gap-2">
      <input className={tiny} value={name} onChange={(e) => setName(e.target.value)} />
      <input
        className={tiny}
        type="number"
        min={0}
        max={100}
        step="0.001"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <span className="text-xs text-muted">%</span>
      <button className={btn} type="button" onClick={() => onSet({ ...row, name, rate: Number(rate) })}>
        저장
      </button>
      <button className={btn} type="button" onClick={() => onDel(row.id)}>삭제</button>
    </li>
  );
}

"use client";

import { useState } from "react";
import type { Band } from "../../_db/rows";
import { spanOf } from "../../_db/won";
import { btn } from "./labs";
import { Pct } from "./pct";

type Props = { row: Band; onSet: (row: Band) => void };

export function BandRow({ row, onSet }: Props) {
  const [rate, setRate] = useState(String(row.rate));
  return (
    <li className="mb-2 flex flex-wrap items-center gap-2">
      <span className="min-w-40 text-xs">{spanOf(row.lo, row.hi)}</span>
      <Pct val={rate} onVal={setRate} />
      <button
        className={btn}
        type="button"
        onClick={() => onSet({ ...row, rate: Number(rate) })}
      >
        저장
      </button>
    </li>
  );
}

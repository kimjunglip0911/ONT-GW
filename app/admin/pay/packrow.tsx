"use client";

import { useState } from "react";
import type { Pack } from "../../_db/rows";
import { wageOf } from "../../_db/wage";
import { tiny } from "../box";
import { btn } from "./labs";
import { PackNum } from "./packnum";

type Props = {
  row: Pack;
  onSet: (row: Pack) => void;
  onDel: (id: string) => void;
  onDef: (id: string) => void;
};

export function PackRow({ row, onSet, onDel, onDef }: Props) {
  const [name, setName] = useState(row.name);
  const [pay, setPay] = useState(String(row.pay));
  const [hours, setHours] = useState(String(row.hours));
  const [meal, setMeal] = useState(String(row.meal));
  const [fuel, setFuel] = useState(String(row.fuel));
  const next = {
    ...row, name, pay: Number(pay), hours: Number(hours),
    meal: Number(meal), fuel: Number(fuel),
  };
  return (
    <li className="mb-3 grid gap-2 border-b border-line pb-3 last:border-0">
      <input className={tiny} value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <PackNum text="기본급" value={pay} onVal={setPay} />
        <PackNum text="월시간" value={hours} onVal={setHours} />
        <PackNum text="식대" value={meal} onVal={setMeal} />
        <PackNum text="유류비" value={fuel} onVal={setFuel} />
        <span className="text-xs text-muted">시급 {wageOf(next.pay, next.hours).toLocaleString()}</span>
      </div>
      <div className="flex gap-2">
        <button className={btn} type="button" onClick={() => onSet(next)}>저장</button>
        {row.is_def ? <span className="text-xs text-muted">기본</span> : (
          <>
            <button className={btn} type="button" onClick={() => onDef(row.id)}>기본으로</button>
            <button className={btn} type="button" onClick={() => onDel(row.id)}>삭제</button>
          </>
        )}
      </div>
    </li>
  );
}

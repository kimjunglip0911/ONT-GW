"use client";

import { TAXES } from "../../_db/rate";
import type { Band, Tax } from "../../_db/rows";
import { Bands } from "./bands";
import { onAddTax, onDelTax, onSetTax } from "./taxact";
import { TaxAdd } from "./taxadd";
import { TaxRow } from "./taxrow";
import { useList } from "./use";

export function Taxs({ bands, rows: init }: { bands: Band[]; rows: Tax[] }) {
  const x = useList(init);
  const loc = x.rows.find((row) => row.name === TAXES[1])?.rate;
  return (
    <div>
      <p className="mb-2 text-xs text-muted">직장인 공제 요율(%). 전 직원 공통입니다. 2026년 기준.</p>
      <ul>
        {x.rows.filter((row) => row.name !== TAXES[0]).map((row) => (
          <TaxRow
            key={row.id}
            row={row}
            onSet={(row) => void x.go(() => onSetTax(row))}
            onDel={(id) => void x.go(() => onDelTax(id))}
          />
        ))}
      </ul>
      <TaxAdd onAdd={(name, rate) => void x.go(() => onAddTax(name, rate))} />
      {x.err ? <p className="mt-2 text-xs text-muted">{x.err}</p> : null}
      <Bands rows={bands} loc={loc} />
    </div>
  );
}

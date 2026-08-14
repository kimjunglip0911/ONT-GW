"use client";

import type { Tax } from "../../_db/rows";
import { onAddTax, onDelTax, onSetTax } from "./taxact";
import { TaxAdd } from "./taxadd";
import { TaxRow } from "./taxrow";
import { useList } from "./use";

export function Taxs({ rows: init }: { rows: Tax[] }) {
  const x = useList(init);
  return (
    <div>
      <p className="mb-2 text-xs text-muted">직장인 공제 요율(%). 전 직원 공통입니다.</p>
      <ul>
        {x.rows.map((row) => (
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
    </div>
  );
}

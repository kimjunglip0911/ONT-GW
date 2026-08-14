"use client";

import type { Pack } from "../../_db/rows";
import { onAddPack, onDefPack, onDelPack, onSetPack } from "./packact";
import { PackAdd } from "./packadd";
import { PackRow } from "./packrow";
import { useList } from "./use";

export function Packs({ rows: init }: { rows: Pack[] }) {
  const x = useList(init);
  return (
    <div>
      <p className="mb-2 text-xs text-muted">시급은 기본급÷월 소정근로시간입니다. 기본 패키지 1개가 등록 폼에 들어갑니다.</p>
      <ul>
        {x.rows.map((row) => (
          <PackRow
            key={row.id}
            row={row}
            onSet={(row) => void x.go(() => onSetPack(row))}
            onDel={(id) => void x.go(() => onDelPack(id))}
            onDef={(id) => void x.go(() => onDefPack(id))}
          />
        ))}
      </ul>
      <PackAdd onAdd={(row) => void x.go(() => onAddPack(row))} />
      {x.err ? <p className="mt-2 text-xs text-muted">{x.err}</p> : null}
    </div>
  );
}

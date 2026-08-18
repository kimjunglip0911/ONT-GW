"use client";

import type { Band } from "../../_db/rows";
import { onSetBand } from "./bandact";
import { BandRow } from "./bandrow";
import { useList } from "./use";

/** 과세구간 세율 8칸 */
export function Bands({ rows: init, loc }: { rows: Band[]; loc?: number }) {
  const x = useList(init);
  const locNote = loc == null
    ? "지방소득세는 근로소득세 세액에 요율을 곱합니다."
    : `지방소득세는 근로소득세 세액의 ${loc}%입니다.`;
  return (
    <div className="mt-4 border-t border-line pt-3">
      <p className="mb-2 text-xs text-muted">
        월급을 12배로 연환산한 뒤 해당 구간 세율만 적용합니다. {locNote}
      </p>
      <ul>
        {x.rows.map((row) => (
          <BandRow
            key={row.id}
            row={row}
            onSet={(row) => void x.go(() => onSetBand(row))}
          />
        ))}
      </ul>
      {x.err ? <p className="mt-2 text-xs text-muted">{x.err}</p> : null}
    </div>
  );
}

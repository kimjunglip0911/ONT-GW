"use client";

import type { Perm } from "../../_db/rows";
import { onAddPerm, onDelPerm, onSetPerm } from "./permact";
import { PermAdd } from "./permadd";
import { PermRow } from "./permrow";
import { useList } from "./use";

export function Perms({ rows: init }: { rows: Perm[] }) {
  const x = useList(init);
  return (
    <div>
      <p className="mb-2 text-xs text-muted">역할과 페이지·기능을 저장합니다. 메뉴 적용은 다음 작업입니다.</p>
      <ul>
        {x.rows.map((row) => (
          <PermRow
            key={row.id}
            row={row}
            onSet={(row) => void x.go(() => onSetPerm(row))}
            onDel={(id) => void x.go(() => onDelPerm(id))}
          />
        ))}
      </ul>
      <PermAdd onAdd={(name) => void x.go(() => onAddPerm(name))} />
      {x.err ? <p className="mt-2 text-xs text-muted">{x.err}</p> : null}
    </div>
  );
}

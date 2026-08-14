"use client";

import { useState } from "react";
import type { User } from "./data";
import { Erow } from "./erow";
import type { Patch } from "./patch";

function won(n: number) {
  return n.toLocaleString();
}

const btn = "rounded-md bg-ink px-2 py-1 text-xs text-card";

type Props = { row: User; onEdit: (row: Patch) => Promise<string> };

export function Trow({ row, onEdit }: Props) {
  const [on, setOn] = useState(false);
  if (on) {
    return <Erow onQuit={() => setOn(false)} onSave={onEdit} row={row} />;
  }
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-4 py-2">{row.uid}</td>
      <td className="px-4 py-2">{row.name}</td>
      <td className="px-4 py-2">{row.birth}</td>
      <td className="px-4 py-2">{row.hired}</td>
      <td className="px-4 py-2">{won(row.pay)}</td>
      <td className="px-4 py-2">{won(row.etc1)}</td>
      <td className="px-4 py-2">{won(row.etc2)}</td>
      <td className="px-4 py-2">{won(row.etc3)}</td>
      <td className="px-4 py-2">{won(row.etc4)}</td>
      <td className="px-4 py-2">{row.role}</td>
      <td className="px-4 py-2" />
      <td className="px-4 py-2">
        <button className={btn} onClick={() => setOn(true)} type="button">수정</button>
      </td>
    </tr>
  );
}

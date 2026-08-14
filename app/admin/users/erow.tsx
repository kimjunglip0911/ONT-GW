"use client";

import { useState } from "react";
import type { User } from "./data";
import { Ecell, Esel } from "./ecell";
import { toPatch, type Patch } from "./patch";

const btn = "rounded-md bg-ink px-2 py-1 text-xs text-card";
type Props = { row: User; onSave: (row: Patch) => Promise<string>; onQuit: () => void };

export function Erow({ row, onSave, onQuit }: Props) {
  const [err, setErr] = useState("");
  const [edit, setEdit] = useState({
    name: row.name, role: row.role, birth: row.birth, hired: row.hired,
    pay: String(row.pay), wage: String(row.wage),
    meal: String(row.meal), fuel: String(row.fuel),
    etc1: String(row.etc1), etc2: String(row.etc2),
  });
  function set(k: keyof typeof edit, v: string) {
    setEdit((cur) => ({ ...cur, [k]: v }));
  }
  async function onOk() {
    const next = toPatch(row.uid, edit);
    if (!next) { setErr("필수 항목을 입력하세요."); return; }
    const fail = await onSave(next);
    if (fail) { setErr(fail); return; }
    onQuit();
  }

  return (
    <tr className="border-b border-line bg-canvas last:border-0">
      <td className="px-4 py-2">{row.uid}</td>
      <Ecell onVal={(v) => set("name", v)} value={edit.name} />
      <Ecell onVal={(v) => set("birth", v)} type="date" value={edit.birth} />
      <Ecell onVal={(v) => set("hired", v)} type="date" value={edit.hired} />
      <Esel onVal={(v) => set("role", v)} value={edit.role} />
      <Ecell onVal={(v) => set("pay", v)} type="number" value={edit.pay} />
      <Ecell onVal={(v) => set("wage", v)} type="number" value={edit.wage} />
      <Ecell onVal={(v) => set("meal", v)} type="number" value={edit.meal} />
      <Ecell onVal={(v) => set("fuel", v)} type="number" value={edit.fuel} />
      <Ecell onVal={(v) => set("etc1", v)} type="number" value={edit.etc1} />
      <Ecell onVal={(v) => set("etc2", v)} type="number" value={edit.etc2} />
      <td className="w-px whitespace-nowrap px-2 py-2">
        <button className={btn} onClick={() => void onOk()} type="button">저장</button>
        {err ? <p className="mt-1 text-xs text-muted">{err}</p> : null}
      </td>
    </tr>
  );
}

"use client";

import { useState, type ChangeEvent } from "react";
import { fileOk, fromSheet } from "./parse";
import type { Draft } from "./data";

const CAP = 200;

type Props = { onMany: (list: Draft[]) => void };

export function Upload({ onMany }: Props) {
  const [msg, setMsg] = useState("");

  async function onPick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const bad = fileOk(file);
    if (bad) {
      setMsg(bad);
      return;
    }
    try {
      const { readSheet } = await import("read-excel-file/browser");
      const data = (await readSheet(file)) as unknown[][];
      const cut = data.slice(0, CAP + 1);
      const extra = Math.max(0, data.length - cut.length);
      const { ok, skip, err } = fromSheet(cut);
      if (err) {
        setMsg(err);
        return;
      }
      if (ok.length) onMany(ok);
      setMsg(`${ok.length}명 추가, ${skip + extra}행 건너뜀`);
    } catch {
      setMsg("파일을 읽을 수 없습니다.");
    }
  }

  return (
    <div className="mb-4 max-w-md rounded-xl border border-line bg-card p-4">
      <label className="block text-sm">
        엑셀 업로드
        <input accept=".xlsx" className="mt-1 block text-sm" onChange={onPick} type="file" />
      </label>
      <p className="mt-2 text-xs text-muted">PW, 이름, 생년월일, 기본급, 권한, 입사일</p>
      {msg ? <p className="mt-2 text-xs text-muted">{msg}</p> : null}
    </div>
  );
}

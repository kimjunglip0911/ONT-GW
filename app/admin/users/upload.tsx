"use client";

import { useRef, useState, type ChangeEvent } from "react";
import type { Draft } from "./data";
import { loadXls } from "./load";
import { fileOk } from "./parse";
import { saveTmpl } from "./tmpl";

const btn = "rounded-md bg-ink px-3 py-2 text-sm text-card";

type Props = { onMany: (list: Draft[]) => void };

export function Upload({ onMany }: Props) {
  const [msg, setMsg] = useState("");
  const pick = useRef<HTMLInputElement>(null);

  async function onPick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const bad = fileOk(file);
    if (bad) { setMsg(bad); return; }
    try {
      const { ok, skip, err } = await loadXls(file);
      if (err) { setMsg(err); return; }
      if (ok.length) onMany(ok);
      setMsg(`${ok.length}명 추가, ${skip}행 건너뜀`);
    } catch {
      setMsg("파일을 읽을 수 없습니다.");
    }
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <button className={btn} onClick={() => void saveTmpl()} type="button">
        엑셀 양식 다운로드
      </button>
      <button className={btn} onClick={() => pick.current?.click()} type="button">
        엑셀 업로드
      </button>
      <input accept=".xlsx" className="hidden" onChange={onPick} ref={pick} type="file" />
      {msg ? <p className="w-full text-xs text-muted">{msg}</p> : null}
    </div>
  );
}

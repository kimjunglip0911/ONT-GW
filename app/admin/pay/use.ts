"use client";

import { useState } from "react";

/** 목록 액션 결과로 행을 갈아끼운다 */
export function useList<T>(init: T[]) {
  const [rows, setRows] = useState(init);
  const [err, setErr] = useState("");
  async function go(fn: () => Promise<{ err: string; rows: T[] }>) {
    const out = await fn();
    if (out.err) {
      setErr(out.err);
      return;
    }
    setErr("");
    setRows(out.rows);
  }
  return { rows, err, go };
}

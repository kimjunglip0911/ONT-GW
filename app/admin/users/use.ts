"use client";

import { useState } from "react";
import { saveEdit } from "./chg";
import type { Draft, User } from "./data";
import { dropUser } from "./drop";
import { byQuery } from "./filt";
import type { Patch } from "./patch";
import { saveMany, saveOne } from "./save";

export function useRows(init: User[]) {
  const [rows, setRows] = useState(init);
  const [q, setQ] = useState("");

  async function onAdd(row: Draft) {
    const { ok, err } = await saveOne(row);
    if (!ok) return err || "저장에 실패했습니다.";
    setRows((cur) => [...cur, ok]);
    return "";
  }

  async function onMany(list: Draft[]) {
    const { ok, err } = await saveMany(list);
    if (err) return { n: 0, err };
    setRows((cur) => [...cur, ...ok]);
    return { n: ok.length, err: "" };
  }

  async function onEdit(row: Patch) {
    const { ok, err } = await saveEdit(row);
    if (!ok) return err || "저장에 실패했습니다.";
    setRows((cur) => cur.map((r) => (r.uid === ok.uid ? ok : r)));
    return "";
  }

  async function onDrop(uid: string) {
    const { err } = await dropUser(uid);
    if (err) return err;
    setRows((cur) => cur.filter((r) => r.uid !== uid));
    return "";
  }

  const shown = byQuery(rows, q);
  const empty = q.trim() ? "조회 결과가 없습니다." : "등록된 사용자가 없습니다.";
  return { rows, q, setQ, shown, empty, onAdd, onMany, onEdit, onDrop };
}

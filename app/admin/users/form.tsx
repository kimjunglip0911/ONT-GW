"use client";

import { useState, type FormEvent } from "react";
import { box } from "../box";
import { isRole, type Draft } from "./data";
import { Inputs } from "./inputs";

type Props = { uid: string; onAdd: (row: Draft) => void };

export function Form({ uid, onAdd }: Props) {
  const [err, setErr] = useState("");

  function onSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pass = String(fd.get("pass") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const birth = String(fd.get("birth") ?? "");
    const hired = String(fd.get("hired") ?? "");
    const role = String(fd.get("role") ?? "");
    const pay = Number(fd.get("pay"));
    if (!pass || !name || !birth || !hired || !isRole(role) || !Number.isFinite(pay)) {
      setErr("필수 항목을 입력하세요.");
      return;
    }
    onAdd({ pass, name, birth, pay, role, hired });
    setErr("");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSend} className="mb-6 max-w-md rounded-xl border border-line bg-card p-4">
      <label className="block text-sm">
        ID
        <input name="uid" value={uid} readOnly className={box} />
      </label>
      <Inputs />
      <button type="submit" className="mt-4 rounded-md bg-ink px-3 py-2 text-sm text-card">
        등록
      </button>
      {err ? <p className="mt-2 text-xs text-muted">{err}</p> : null}
    </form>
  );
}

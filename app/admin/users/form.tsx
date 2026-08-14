"use client";

import { useState, type FormEvent } from "react";
import { cell, lab, row } from "../box";
import type { Draft } from "./data";
import { Inputs } from "./inputs";
import { fromForm } from "./read";

type Props = { uid: string; onAdd: (row: Draft) => Promise<string> };

export function Form({ uid, onAdd }: Props) {
  const [err, setErr] = useState("");

  async function onSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const draft = fromForm(new FormData(form));
    if (!draft) {
      setErr("필수 항목을 입력하세요.");
      return;
    }
    const fail = await onAdd(draft);
    if (fail) { setErr(fail); return; }
    setErr("");
    form.reset();
  }

  return (
    <form
      onSubmit={(e) => void onSend(e)}
      className="mb-6 grid grid-cols-5 gap-3 rounded-xl border border-line bg-card p-4"
    >
      <label className={row}>
        <span className={lab}>ID</span>
        <input name="uid" value={uid} readOnly className={cell} />
      </label>
      <Inputs />
      <button
        type="submit"
        className="col-start-5 justify-self-end rounded-md bg-ink px-3 py-2 text-sm text-card"
      >
        등록
      </button>
      {err ? <p className="col-span-5 text-right text-xs text-muted">{err}</p> : null}
    </form>
  );
}

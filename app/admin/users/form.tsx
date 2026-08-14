"use client";

import { useState, type FormEvent } from "react";
import type { Draft } from "./data";
import type { Fill } from "./fill";
import { Inputs } from "./inputs";
import { Etcs, Pays } from "./pays";
import { fromForm } from "./read";

type Props = {
  fill: Fill;
  uid: string;
  onAdd: (row: Draft) => Promise<string>;
};

export function Form({ fill, uid, onAdd }: Props) {
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
      className="mb-6 rounded-xl border border-line bg-card p-4"
    >
      <div className="grid grid-cols-5 gap-x-3 gap-y-3">
        <Inputs uid={uid} />
        <Pays fill={fill} />
        <Etcs />
      </div>
      <div className="mt-3 flex justify-end">
        <button type="submit" className="rounded-md bg-ink px-3 py-2 text-sm text-card">
          등록
        </button>
      </div>
      {err ? <p className="mt-2 text-right text-xs text-muted">{err}</p> : null}
    </form>
  );
}

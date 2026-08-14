"use client";

import { useState, type FormEvent } from "react";
import { Edit } from "./edit";
import { Meta } from "./meta";
import { saveNote } from "./save";

export function Form() {
  const [err, setErr] = useState("");
  const [html, setHtml] = useState("");
  const [n, setN] = useState(0);

  async function onSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "");
    const kind = String(fd.get("kind") ?? "일반");
    const days = Number(fd.get("days") ?? 0);
    const { err: fail } = await saveNote({
      title, kind, body: html,
      days: Number.isFinite(days) ? days : 0,
    });
    if (fail) { setErr(fail); return; }
    setErr("");
    e.currentTarget.reset();
    setHtml("");
    setN((x) => x + 1);
  }

  return (
    <form
      className="w-full rounded-xl border border-line bg-card p-4"
      onSubmit={(e) => void onSend(e)}
    >
      <Meta />
      <div className="mt-3 text-sm">
        본문
        <Edit key={n} onHtml={setHtml} />
      </div>
      <button
        className="mt-4 rounded-md bg-ink px-3 py-2 text-sm text-card"
        type="submit"
      >
        등록
      </button>
      {err ? <p className="mt-2 text-xs text-muted">{err}</p> : null}
    </form>
  );
}

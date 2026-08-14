"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { foldUid } from "../_auth/fold";
import { homeOf, safeNext } from "../_auth/gate";
import { Fields } from "./fields";

export function Form() {
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "";
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  async function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pass }),
    });
    if (!res.ok) {
      setErr("계정을 확인하세요.");
      return;
    }
    const data = (await res.json()) as { role?: string };
    const tok = data.role ?? "";
    router.push(safeNext(next, tok) || homeOf(tok));
    router.refresh();
  }

  return (
    <form
      onSubmit={onSend}
      className="w-full max-w-sm rounded-xl border border-line bg-card p-6 shadow-lg"
    >
      <h2 className="mb-4 text-lg font-semibold">로그인</h2>
      <Fields id={id} pass={pass} err={err} setId={(v) => setId(foldUid(v))} setPass={setPass} />
      <div className="mt-5 flex justify-end">
        <button type="submit" className="rounded-md bg-ink px-3 py-2 text-sm text-card">
          확인
        </button>
      </div>
    </form>
  );
}

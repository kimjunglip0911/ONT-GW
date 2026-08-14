"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { homeOf, safeNext } from "../_auth/gate";
import { Npw } from "./npw";

type Props = { id: string; next: string };

export function Chg({ id, next }: Props) {
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [err, setErr] = useState("");

  async function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/passwd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pass, pass2 }),
    });
    if (!res.ok) { setErr("비밀번호를 확인하세요."); return; }
    const data = (await res.json()) as { role?: string };
    const tok = data.role ?? "";
    router.push(safeNext(next, tok) || homeOf(tok));
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40">
      <form
        aria-labelledby="chg-title"
        aria-modal="true"
        className="w-full max-w-sm rounded-xl border border-line bg-card p-6 shadow-lg"
        onSubmit={(e) => void onSend(e)}
        role="dialog"
      >
        <h2 className="mb-4 text-lg font-semibold" id="chg-title">비밀번호 변경</h2>
        <Npw err={err} pass={pass} pass2={pass2} setPass={setPass} setPass2={setPass2} />
        <div className="mt-5 flex justify-end">
          <button className="rounded-md bg-ink px-3 py-2 text-sm text-card" type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { homeOf, safeNext } from "../_auth/gate";
import { Card } from "./card";
import { Chg } from "./chg";

export function Form() {
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "";
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [need, setNeed] = useState(false);

  async function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pass }),
    });
    if (!res.ok) { setErr("계정을 확인하세요."); return; }
    const data = (await res.json()) as { role?: string; need?: boolean };
    if (data.need) { setNeed(true); return; }
    const tok = data.role ?? "";
    router.push(safeNext(next, tok) || homeOf(tok));
    router.refresh();
  }

  return (
    <>
      <Card err={err} id={id} onSend={onSend} pass={pass} setId={setId} setPass={setPass} />
      {need ? <Chg id={id} next={next} /> : null}
    </>
  );
}

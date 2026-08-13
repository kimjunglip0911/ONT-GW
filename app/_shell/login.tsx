"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fields } from "./fields";

export function Login({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const id = String(fd.get("id") ?? "");
    const pass = String(fd.get("pass") ?? "");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pass }),
    });
    if (!res.ok) {
      setErr("계정을 확인하세요.");
      return;
    }
    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-line bg-card p-6 shadow-lg"
      >
        <h2 className="mb-4 text-lg font-semibold">로그인</h2>
        <Fields id={id} pass={pass} err={err} setId={setId} setPass={setPass} />
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="px-3 py-2 text-sm" onClick={onClose}>
            취소
          </button>
          <button type="submit" className="rounded-md bg-ink px-3 py-2 text-sm text-card">
            확인
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cx } from "./cx";

type Props = {
  admin: boolean;
  mode: "icon" | "text";
  tone?: "rail" | "page";
  onLogin: () => void;
};

export function AuthBtn({ admin, mode, tone = "rail", onLogin }: Props) {
  const router = useRouter();
  const rail = tone === "rail";

  async function onOut() {
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={admin ? onOut : onLogin}
      aria-label={admin ? "로그아웃" : "로그인"}
      className={cx(
        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm",
        rail ? "w-full text-rail-fg hover:bg-chip" : "text-ink hover:bg-card",
        mode === "icon" && "justify-center",
      )}
    >
      {admin ? <LogOut className="size-5" /> : <LogIn className="size-5" />}
      {mode === "text" ? (
        <span>{admin ? "ADMIN 로그아웃" : "로그인"}</span>
      ) : null}
    </button>
  );
}

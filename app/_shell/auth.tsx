"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cx } from "./cx";

type Props = {
  mode: "icon" | "text";
  tone?: "rail" | "page";
};

export function AuthBtn({ mode, tone = "rail" }: Props) {
  const router = useRouter();
  const rail = tone === "rail";

  async function onOut() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onOut}
      aria-label="로그아웃"
      className={cx(
        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm",
        rail ? "w-full text-rail-fg hover:bg-chip" : "text-ink hover:bg-card",
        mode === "icon" && "justify-center",
      )}
    >
      <LogOut className="size-5" />
      {mode === "text" ? <span>로그아웃</span> : null}
    </button>
  );
}

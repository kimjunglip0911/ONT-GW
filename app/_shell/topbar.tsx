"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuthBtn } from "./auth";
import { pageName } from "./title";

type Props = {
  admin: boolean;
  onMenu: () => void;
  onLogin: () => void;
};

export function Topbar({ admin, onMenu, onLogin }: Props) {
  const path = usePathname();
  return (
    <header className="flex h-14 items-center gap-3 border-b border-line px-4">
      <button
        type="button"
        className="rounded-md p-1 hover:bg-card md:hidden"
        onClick={onMenu}
        aria-label="메뉴"
      >
        <Menu className="size-5" />
      </button>
      <h1 className="text-lg font-semibold">{pageName(path)}</h1>
      <div className="ml-auto md:hidden">
        <AuthBtn admin={admin} mode="icon" tone="page" onLogin={onLogin} />
      </div>
    </header>
  );
}

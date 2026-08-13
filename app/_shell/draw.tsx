"use client";

import { X } from "lucide-react";
import { AuthBtn } from "./auth";
import { Brand } from "./brand";
import { Links } from "./links";

type Props = {
  admin: boolean;
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
};

export function Draw({ admin, show, onClose, onLogin }: Props) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="닫기"
        onClick={onClose}
      />
      <nav className="relative flex h-full w-60 flex-col bg-rail">
        <div className="flex items-center justify-between pr-2">
          <Brand wide />
          <button type="button" onClick={onClose} aria-label="닫기">
            <X className="size-5 text-rail-fg" />
          </button>
        </div>
        <div className="flex-1">
          <Links admin={admin} mode="text" onPick={onClose} />
        </div>
        <div className="p-2">
          <AuthBtn admin={admin} mode="text" onLogin={onLogin} />
        </div>
      </nav>
    </div>
  );
}

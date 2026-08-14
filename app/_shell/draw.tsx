import { X } from "lucide-react";
import { AuthBtn } from "./auth";
import { Brand } from "./brand";
import { Links } from "./links";

type Props = {
  admin: boolean;
  authed: boolean;
  show: boolean;
  onClose: () => void;
};

export function Draw({ admin, authed, show, onClose }: Props) {
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
          {authed ? <Links admin={admin} mode="text" onPick={onClose} /> : null}
        </div>
        <div className="p-2">{authed ? <AuthBtn mode="text" /> : null}</div>
      </nav>
    </div>
  );
}

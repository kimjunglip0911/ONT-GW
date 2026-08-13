import { AuthBtn } from "./auth";
import { Brand } from "./brand";
import { Links } from "./links";

type Props = { admin: boolean; onLogin: () => void };

export function Rail({ admin, onLogin }: Props) {
  return (
    <nav
      className="flex h-full flex-col bg-rail text-rail-fg"
      aria-label="주 메뉴"
    >
      <Brand />
      <div className="flex-1">
        <Links admin={admin} mode="icon" />
      </div>
      <div className="p-2">
        <AuthBtn admin={admin} mode="icon" onLogin={onLogin} />
      </div>
    </nav>
  );
}

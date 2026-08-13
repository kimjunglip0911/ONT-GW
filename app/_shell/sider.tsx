import { AuthBtn } from "./auth";
import { Brand } from "./brand";
import { Links } from "./links";

type Props = { admin: boolean; onLogin: () => void };

export function Sider({ admin, onLogin }: Props) {
  return (
    <nav
      className="flex h-full flex-col bg-rail text-rail-fg shadow-xl"
      aria-label="주 메뉴"
    >
      <Brand wide />
      <div className="flex-1">
        <Links admin={admin} mode="text" />
      </div>
      <div className="p-2">
        <AuthBtn admin={admin} mode="text" onLogin={onLogin} />
      </div>
    </nav>
  );
}

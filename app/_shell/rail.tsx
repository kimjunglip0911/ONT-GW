import { AuthBtn } from "./auth";
import { Brand } from "./brand";
import { Links } from "./links";

type Props = { admin: boolean; authed: boolean };

export function Rail({ admin, authed }: Props) {
  return (
    <nav
      className="flex h-full flex-col bg-rail text-rail-fg"
      aria-label="주 메뉴"
    >
      <Brand />
      <div className="flex-1">
        {authed ? <Links admin={admin} mode="icon" /> : null}
      </div>
      <div className="p-2">{authed ? <AuthBtn mode="icon" /> : null}</div>
    </nav>
  );
}

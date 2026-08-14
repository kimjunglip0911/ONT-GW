import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuthBtn } from "./auth";
import { pageName } from "./title";

type Props = {
  authed: boolean;
  onMenu: () => void;
};

export function Topbar({ authed, onMenu }: Props) {
  const path = usePathname();
  return (
    <header className="flex h-14 items-center gap-3 border-b border-line px-4">
      {authed ? (
        <button
          type="button"
          className="rounded-md p-1 hover:bg-card md:hidden"
          onClick={onMenu}
          aria-label="메뉴"
        >
          <Menu className="size-5" />
        </button>
      ) : null}
      <h1 className="text-lg font-semibold">{pageName(path)}</h1>
      <div className="ml-auto md:hidden">
        {authed ? <AuthBtn mode="icon" tone="page" /> : null}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "./cx";
import { Glyph } from "./glyph";
import { navList } from "./menu";

type Props = {
  admin: boolean;
  mode: "icon" | "text";
  onPick?: () => void;
};

export function Links({ admin, mode, onPick }: Props) {
  const path = usePathname();
  return (
    <ul className="flex flex-col gap-1 px-2">
      {navList(admin).map((item) => {
        const on = path.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onPick}
              title={item.label}
              className={cx(
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm",
                on ? "bg-chip text-rail-on" : "text-rail-fg hover:bg-chip",
              )}
            >
              <Glyph name={item.icon} />
              {mode === "text" ? <span>{item.label}</span> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

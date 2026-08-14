"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navCls } from "./chip";
import { Glyph } from "./glyph";
import { navList, pathOn } from "./menu";
import { Nest } from "./nest";

type Props = {
  admin: boolean;
  mode: "icon" | "text";
  onPick?: () => void;
};

export function Links({ admin, mode, onPick }: Props) {
  const path = usePathname();
  return (
    <ul className="flex flex-col gap-1 px-2">
      {navList(admin).map((item) => (
        <li key={item.href}>
          {item.kids ? (
            <Nest item={item} path={path} mode={mode} onPick={onPick} />
          ) : (
            <Link
              href={item.href}
              onClick={onPick}
              title={item.label}
              className={navCls(pathOn(path, item.href))}
            >
              <Glyph name={item.icon} />
              {mode === "text" ? <span>{item.label}</span> : null}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

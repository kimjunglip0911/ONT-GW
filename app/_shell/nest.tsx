"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navCls } from "./chip";
import { Glyph } from "./glyph";
import { Kids } from "./kids";
import { pathOn, type NavItem } from "./menu";

type Props = {
  item: NavItem;
  path: string;
  mode: "icon" | "text";
  onPick?: () => void;
};

export function Nest({ item, path, mode, onPick }: Props) {
  const under = path.startsWith(item.href);
  const [open, setOpen] = useState(under);
  const show = under || open;
  const on =
    mode === "icon"
      ? path.startsWith(item.href)
      : pathOn(path, item.href, true);
  if (mode === "icon") {
    return (
      <Link href={item.href} onClick={onPick} title={item.label} className={navCls(on)}>
        <Glyph name={item.icon} />
      </Link>
    );
  }
  return (
    <div>
      <button
        type="button"
        className={navCls(on)}
        aria-expanded={show}
        onClick={() => setOpen((v) => !v)}
      >
        <Glyph name={item.icon} />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown className={show ? "size-4 rotate-180" : "size-4"} />
      </button>
      {show ? <Kids items={item.kids ?? []} path={path} onPick={onPick} /> : null}
    </div>
  );
}

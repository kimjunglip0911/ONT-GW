"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

type Props = { title: string; kids: ReactNode };

export function Pane({ title, kids }: Props) {
  const [on, setOn] = useState(false);
  return (
    <section className="rounded-xl border border-line bg-card">
      <button
        type="button"
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
        aria-expanded={on}
        onClick={() => setOn((v) => !v)}
      >
        <span className="flex-1 font-medium">{title}</span>
        <ChevronDown className={on ? "size-4 rotate-180" : "size-4"} />
      </button>
      {on ? <div className="border-t border-line px-4 py-3">{kids}</div> : null}
    </section>
  );
}

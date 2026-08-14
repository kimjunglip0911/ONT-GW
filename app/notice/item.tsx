"use client";

import { useState } from "react";
import type { Notice } from "./data";

const body =
  "mt-2 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

export function Item({ row }: { row: Notice }) {
  const [on, setOn] = useState(false);
  const hot = row.kind === "중요";
  return (
    <li>
      <button
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
        onClick={() => setOn((v) => !v)}
        type="button"
      >
        <span
          className={
            hot
              ? "shrink-0 rounded-md bg-ink px-2 py-0.5 text-xs text-card"
              : "shrink-0 rounded-md border border-line px-2 py-0.5 text-xs text-muted"
          }
        >
          {row.kind}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{row.title}</p>
          <p className="text-xs text-muted">{row.created.slice(0, 10)}</p>
          {on ? (
            <div
              className={body}
              dangerouslySetInnerHTML={{ __html: row.body }}
            />
          ) : null}
        </div>
      </button>
    </li>
  );
}

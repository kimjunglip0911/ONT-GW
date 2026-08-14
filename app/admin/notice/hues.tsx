"use client";

import type { Editor } from "@tiptap/react";
import { HUES } from "../../_db/hues.ts";

const box = "size-4 rounded-sm border";

export function Hues({ editor }: { editor: Editor }) {
  const cur = String(
    editor.getAttributes("textStyle").color ?? "",
  ).toLowerCase();
  return (
    <>
      <span className="mx-1 h-4 w-px bg-line" />
      {HUES.map((h) => (
        <button
          aria-label={h}
          className={cur === h ? `${box} border-ink` : `${box} border-line`}
          key={h}
          onClick={() => editor.chain().focus().setColor(h).run()}
          style={{ background: h }}
          type="button"
        />
      ))}
      <button
        className="rounded px-1 text-xs text-muted"
        onClick={() => editor.chain().focus().unsetColor().run()}
        type="button"
      >
        기본
      </button>
    </>
  );
}

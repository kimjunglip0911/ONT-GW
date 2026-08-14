"use client";

import type { Editor } from "@tiptap/react";
import { isSize, SIZES } from "../../_db/sizes.ts";

export function Sizes({ editor }: { editor: Editor }) {
  const raw = String(editor.getAttributes("textStyle").fontSize ?? "");
  const cur = isSize(raw) ? raw : "";
  return (
    <>
      <span className="mx-1 h-4 w-px bg-line" />
      <select
        aria-label="글자 크기"
        className="min-w-12 rounded border border-line bg-canvas px-1 py-0.5 text-xs"
        onChange={(e) => {
          const v = e.target.value;
          const run = editor.chain().focus();
          if (v) run.setFontSize(v).run();
          else run.unsetFontSize().run();
        }}
        value={cur}
      >
        <option value="">크기</option>
        {SIZES.map((s) => (
          <option key={s} value={s}>
            {s.replace("pt", "")}
          </option>
        ))}
      </select>
    </>
  );
}

"use client";

import type { Editor } from "@tiptap/react";
import {
  AlignCenter, AlignLeft, AlignRight,
  Bold, Italic, List, ListOrdered, Underline,
} from "lucide-react";
import { Hues } from "./hues";
import { Sizes } from "./sizes";

const btn = "rounded p-1";

export function Tools({ editor }: { editor: Editor }) {
  const items = [
    { on: editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run(), Icon: Bold },
    { on: editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run(), Icon: Italic },
    { on: editor.isActive("underline"), run: () => editor.chain().focus().toggleUnderline().run(), Icon: Underline },
    { on: editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run(), Icon: List },
    { on: editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run(), Icon: ListOrdered },
    { on: editor.isActive({ textAlign: "left" }), run: () => editor.chain().focus().setTextAlign("left").run(), Icon: AlignLeft },
    { on: editor.isActive({ textAlign: "center" }), run: () => editor.chain().focus().setTextAlign("center").run(), Icon: AlignCenter },
    { on: editor.isActive({ textAlign: "right" }), run: () => editor.chain().focus().setTextAlign("right").run(), Icon: AlignRight },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-line p-2">
      {items.map((it, i) => (
        <button
          className={it.on ? `${btn} bg-ink text-card` : `${btn} text-ink`}
          key={i}
          onClick={it.run}
          type="button"
        >
          <it.Icon className="size-4" />
        </button>
      ))}
      <Sizes editor={editor} />
      <Hues editor={editor} />
    </div>
  );
}

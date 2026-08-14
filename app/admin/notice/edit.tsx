"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Tools } from "./tools";

const body =
  "min-h-48 px-3 py-2 outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

export function Edit({ onHtml }: { onHtml: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, code: false, codeBlock: false,
        blockquote: false, strike: false, horizontalRule: false,
      }),
      Underline,
      TextAlign.configure({ types: ["paragraph"] }),
    ],
    content: "<p></p>",
    onUpdate: ({ editor: ed }) => onHtml(ed.getHTML()),
    editorProps: { attributes: { class: body } },
  });
  if (!editor) return <div className="min-h-48 rounded-md border border-line" />;
  return (
    <div className="mt-1 rounded-md border border-line bg-canvas">
      <Tools editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

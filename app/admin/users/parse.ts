import { MAX_B } from "./map.ts";
import type { Draft } from "./data.ts";
import { NEED } from "./head.ts";
import { fromCells } from "./read.ts";

export function fileOk(file: File) {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".xlsx")) return "xlsx 파일만 올릴 수 있습니다.";
  if (file.size > MAX_B) return "파일이 너무 큽니다.";
  return "";
}

export function fromSheet(data: unknown[][]): {
  ok: Draft[];
  skip: number;
  err: string;
} {
  if (!Array.isArray(data) || data.length < 2) {
    return { ok: [], skip: 0, err: "시트가 비어 있습니다." };
  }
  const head = data[0].map((c) => String(c ?? "").trim());
  const col = NEED.map((k) => head.indexOf(k));
  if (col.some((i) => i < 0)) return { ok: [], skip: 0, err: "헤더를 확인하세요." };
  const ok: Draft[] = [];
  let skip = 0;
  for (const row of data.slice(1)) {
    const blank = !row.some((c) => c != null && String(c).trim() !== "");
    if (blank) continue;
    const draft = fromCells(row, head);
    if (draft) ok.push(draft);
    else skip += 1;
  }
  return { ok, skip, err: "" };
}

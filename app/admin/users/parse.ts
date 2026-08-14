import { MAX_B, toDraft } from "./map";
import type { Draft } from "./data";

export function fileOk(file: File) {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".xlsx")) return "xlsx 파일만 올릴 수 있습니다.";
  if (file.size > MAX_B) return "파일이 너무 큽니다.";
  return "";
}

const NEED = ["PW", "이름", "생년월일", "기본급", "권한", "입사일"] as const;

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
    const draft = toDraft({
      pass: row[col[0]],
      name: row[col[1]],
      birth: row[col[2]],
      pay: row[col[3]],
      role: row[col[4]],
      hired: row[col[5]],
    });
    if (draft) ok.push(draft);
    else skip += 1;
  }
  return { ok, skip, err: "" };
}

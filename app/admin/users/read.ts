import type { Draft } from "./data";
import { toDraft } from "./map";

export function fromForm(fd: FormData): Draft | null {
  return toDraft({
    pass: fd.get("pass"),
    name: fd.get("name"),
    birth: fd.get("birth"),
    hired: fd.get("hired"),
    role: fd.get("role"),
    pay: fd.get("pay"),
    etc1: fd.get("etc1"),
    etc2: fd.get("etc2"),
    etc3: fd.get("etc3"),
    etc4: fd.get("etc4"),
  });
}

export function fromCells(
  row: unknown[],
  col: number[],
  head: string[],
): Draft | null {
  const take = (k: string) => {
    const i = head.indexOf(k);
    return i < 0 ? undefined : row[i];
  };
  return toDraft({
    pass: row[col[0]],
    name: row[col[1]],
    birth: row[col[2]],
    pay: row[col[3]],
    role: row[col[4]],
    hired: row[col[5]],
    etc1: take("기타급여1"),
    etc2: take("기타급여2"),
    etc3: take("기타급여3"),
    etc4: take("기타급여4"),
  });
}

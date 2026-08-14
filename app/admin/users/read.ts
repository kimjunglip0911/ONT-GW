import type { Draft } from "./data.ts";
import { toDraft } from "./map.ts";

export function fromForm(fd: FormData): Draft | null {
  return toDraft({
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

export function fromCells(row: unknown[], head: string[]): Draft | null {
  const take = (k: string) => {
    const i = head.indexOf(k);
    return i < 0 ? undefined : row[i];
  };
  return toDraft({
    name: take("이름"),
    birth: take("생년월일"),
    pay: take("기본급"),
    role: take("권한"),
    hired: take("입사일"),
    etc1: take("기타급여1"),
    etc2: take("기타급여2"),
    etc3: take("기타급여3"),
    etc4: take("기타급여4"),
  });
}

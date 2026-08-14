import type { Draft } from "./data.ts";
import { toDraft } from "./map.ts";

export function fromForm(fd: FormData): Draft | null {
  return toDraft({
    name: fd.get("name"),
    birth: fd.get("birth"),
    hired: fd.get("hired"),
    role: fd.get("role"),
    pay: fd.get("pay"),
    wage: fd.get("wage"),
    meal: fd.get("meal"),
    fuel: fd.get("fuel"),
    etc1: fd.get("etc1"),
    etc2: fd.get("etc2"),
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
    wage: take("기본 시급"),
    role: take("권한"),
    hired: take("입사일"),
    meal: take("식대"),
    fuel: take("유류비"),
    etc1: take("기타급여1") ?? take("기타급여3"),
    etc2: take("기타급여2") ?? take("기타급여4"),
  });
}

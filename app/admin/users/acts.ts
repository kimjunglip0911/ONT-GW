import { nextUid } from "./ids";
import type { Draft, User } from "./data";

export function addOne(rows: User[], row: Draft): User[] {
  return [...rows, { ...row, uid: nextUid(rows) }];
}

export function addMany(rows: User[], list: Draft[]): User[] {
  const out = [...rows];
  for (const row of list) out.push({ ...row, uid: nextUid(out) });
  return out;
}

"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { addPerm, delPerm, setPerm } from "../../_db/permed";
import type { Perm } from "../../_db/perm";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const PATH = "/admin/pay";

async function run(work: () => Promise<Perm[]>) {
  if (!(await isAdmin())) return { err: DENY, rows: [] as Perm[] };
  try {
    const rows = await work();
    revalidatePath(PATH);
    return { err: "", rows };
  } catch {
    return { err: FAIL, rows: [] as Perm[] };
  }
}

export function onAddPerm(name: string) {
  return run(() => addPerm(name));
}

export function onSetPerm(row: Perm) {
  return run(() => setPerm(row));
}

export function onDelPerm(id: string) {
  return run(() => delPerm(id));
}

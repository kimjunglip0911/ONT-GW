"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { addTax, delTax, setTax } from "../../_db/taxed";
import type { Tax } from "../../_db/tax";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const PATH = "/admin/pay";

async function run(work: () => Promise<Tax[]>) {
  if (!(await isAdmin())) return { err: DENY, rows: [] as Tax[] };
  try {
    const rows = await work();
    revalidatePath(PATH);
    return { err: "", rows };
  } catch {
    return { err: FAIL, rows: [] as Tax[] };
  }
}

export function onAddTax(name: string, rate: number) {
  return run(() => addTax(name, rate));
}

export function onSetTax(row: Tax) {
  return run(() => setTax(row));
}

export function onDelTax(id: string) {
  return run(() => delTax(id));
}

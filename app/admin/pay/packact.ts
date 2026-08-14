"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { markDef } from "../../_db/packdef";
import { addPack, delPack, setPack } from "../../_db/packed";
import type { Pack } from "../../_db/pack";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const DEF = "기본 패키지는 다른 건을 기본으로 고른 뒤에 지울 수 있습니다.";

function boom(e: unknown) {
  return e instanceof Error && e.message === "def" ? DEF : FAIL;
}

async function run(work: () => Promise<Pack[]>) {
  if (!(await isAdmin())) return { err: DENY, rows: [] as Pack[] };
  try {
    const rows = await work();
    revalidatePath("/admin/pay");
    revalidatePath("/admin/users");
    return { err: "", rows };
  } catch (e) {
    return { err: boom(e), rows: [] as Pack[] };
  }
}

export async function onAddPack(row: Omit<Pack, "id" | "is_def">) {
  return run(() => addPack(row));
}

export async function onSetPack(row: Pack) {
  return run(() => setPack(row));
}

export async function onDelPack(id: string) {
  return run(() => delPack(id));
}

export async function onDefPack(id: string) {
  return run(() => markDef(id));
}

"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { setBand } from "../../_db/banded";
import type { Band } from "../../_db/band";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const PATH = "/admin/pay";

export async function onSetBand(row: Band) {
  if (!(await isAdmin())) return { err: DENY, rows: [] as Band[] };
  try {
    const rows = await setBand(row);
    revalidatePath(PATH);
    return { err: "", rows };
  } catch {
    return { err: FAIL, rows: [] as Band[] };
  }
}

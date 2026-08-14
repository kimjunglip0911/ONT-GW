"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { updUser } from "../../_db/upd";
import type { User } from "./data";
import type { Patch } from "./patch";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const PATH = "/admin/users";

export async function saveEdit(
  row: Patch,
): Promise<{ ok: User | null; err: string }> {
  if (!(await isAdmin())) return { ok: null, err: DENY };
  try {
    const ok = await updUser(row);
    revalidatePath(PATH);
    return { ok, err: "" };
  } catch {
    return { ok: null, err: FAIL };
  }
}

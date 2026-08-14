"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { addUser, addUsers } from "../../_db/add";
import type { Draft, User } from "./data";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const PATH = "/admin/users";

export async function saveOne(
  row: Draft,
): Promise<{ ok: User | null; err: string }> {
  if (!(await isAdmin())) return { ok: null, err: DENY };
  try {
    const ok = await addUser(row);
    revalidatePath(PATH);
    return { ok, err: "" };
  } catch {
    return { ok: null, err: FAIL };
  }
}

export async function saveMany(
  list: Draft[],
): Promise<{ ok: User[]; err: string }> {
  if (!(await isAdmin())) return { ok: [], err: DENY };
  try {
    const ok = await addUsers(list);
    revalidatePath(PATH);
    return { ok, err: "" };
  } catch {
    return { ok: [], err: FAIL };
  }
}

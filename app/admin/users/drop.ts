"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { delUser } from "../../_db/del";

const DENY = "권한이 없습니다.";
const FAIL = "삭제에 실패했습니다.";
const PATH = "/admin/users";

/** 관리자만 uid 한 건을 지운다 */
export async function dropUser(uid: string) {
  if (!(await isAdmin())) return { err: DENY };
  try {
    await delUser(uid);
    revalidatePath(PATH);
    return { err: "" };
  } catch {
    return { err: FAIL };
  }
}

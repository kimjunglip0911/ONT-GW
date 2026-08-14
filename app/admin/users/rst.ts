"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { SEED } from "../../_auth/seed";
import { setPass } from "../../_db/pwd";

const DENY = "권한이 없습니다.";
const FAIL = "초기화에 실패했습니다.";
const PATH = "/admin/users";

/** 관리자만 비밀번호를 1234로 되돌린다 */
export async function rstPass(uid: string) {
  if (!(await isAdmin())) return { err: DENY };
  try {
    await setPass(uid, SEED);
    revalidatePath(PATH);
    return { err: "" };
  } catch {
    return { err: FAIL };
  }
}

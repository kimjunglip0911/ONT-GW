"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "../../_auth/role";
import { cleanHtml, textOf } from "../../_db/html";
import { addNote } from "../../_db/note";
import { isKind, type Notice } from "../../notice/data";

const DENY = "권한이 없습니다.";
const FAIL = "저장에 실패했습니다.";
const NEED = "제목과 본문을 입력하세요.";

export async function saveNote(input: {
  title: string;
  kind: string;
  days: number;
  body: string;
}): Promise<{ ok: Notice | null; err: string }> {
  if (!(await isAdmin())) return { ok: null, err: DENY };
  const title = input.title.trim();
  const body = cleanHtml(input.body);
  const days = Number.isFinite(input.days) && input.days > 0
    ? Math.floor(input.days)
    : 0;
  if (!title || !textOf(body) || !isKind(input.kind)) {
    return { ok: null, err: NEED };
  }
  try {
    const ok = await addNote(title, input.kind, body, days);
    revalidatePath("/notice");
    revalidatePath("/admin/notice");
    return { ok, err: "" };
  } catch {
    return { ok: null, err: FAIL };
  }
}

import { NextResponse } from "next/server";
import { asTok, hasCred } from "../../_auth/check";
import { setRole } from "../../_auth/cookie";
import { foldUid } from "../../_auth/fold";
import { canSet } from "../../_auth/rule";
import { findUser } from "../../_db/find";
import { setPass } from "../../_db/pwd";

export async function POST(req: Request) {
  let body: { id?: string; pass?: string; pass2?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const id = foldUid(body.id ?? "");
  const pass = typeof body.pass === "string" ? body.pass : "";
  const pass2 = typeof body.pass2 === "string" ? body.pass2 : "";
  if (!hasCred(id, pass)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const row = await findUser(id);
  if (!row || !canSet(row.pass, pass, pass2)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const tok = asTok(row.role);
  if (!tok) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  await setPass(id, pass);
  await setRole(tok);
  return NextResponse.json({ ok: true, role: tok });
}

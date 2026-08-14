import { NextResponse } from "next/server";
import { asTok, hasCred, loginOk, passOk } from "../../_auth/check";
import { setRole } from "../../_auth/cookie";
import { foldUid } from "../../_auth/fold";
import { findUser } from "../../_db/find";

export async function POST(req: Request) {
  let body: { id?: string; pass?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const id = foldUid(body.id ?? "");
  const pass = typeof body.pass === "string" ? body.pass : "";
  if (!hasCred(id, pass)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let row;
  try {
    row = await findUser(id);
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  const tok = row && passOk(row.pass, pass) ? asTok(row.role) : "";
  if (!row || !tok) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const data = loginOk(row.pass, tok);
  if (!("need" in data)) await setRole(tok, id);
  return NextResponse.json(data);
}

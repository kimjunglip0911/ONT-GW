import { NextResponse } from "next/server";
import { passOk } from "../../_auth/check";
import { setAdmin } from "../../_auth/cookie";

export async function POST(req: Request) {
  let body: { id?: string; pass?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const env = process.env.ADMIN_PASS ?? "";
  if (!passOk(body.id ?? "", body.pass ?? "", env)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  await setAdmin();
  return NextResponse.json({ ok: true });
}

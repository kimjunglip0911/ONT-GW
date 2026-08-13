import { NextResponse } from "next/server";
import { clearRole } from "../../_auth/cookie";

export async function POST() {
  await clearRole();
  return NextResponse.json({ ok: true });
}

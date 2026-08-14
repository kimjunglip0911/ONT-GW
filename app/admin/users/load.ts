import type { Draft } from "./data";
import { fromSheet } from "./parse";

const CAP = 200;

export async function loadXls(file: File): Promise<{
  ok: Draft[];
  skip: number;
  err: string;
}> {
  const { readSheet } = await import("read-excel-file/browser");
  const data = (await readSheet(file)) as unknown[][];
  const cut = data.slice(0, CAP + 1);
  const extra = Math.max(0, data.length - cut.length);
  const { ok, skip, err } = fromSheet(cut);
  return { ok, skip: skip + extra, err };
}

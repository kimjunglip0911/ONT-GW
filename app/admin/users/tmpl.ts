import { TMPL } from "./head";

export async function saveTmpl() {
  const mod = await import("write-excel-file/browser");
  const write = mod.default;
  await write([[...TMPL]]).toFile("users.xlsx");
}

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("pack save checks admin before writing", () => {
  const src = readFileSync(new URL("./packact.ts", import.meta.url), "utf8");
  const admin = src.indexOf("isAdmin");
  const add = src.indexOf("addPack(");
  assert.ok(admin >= 0 && add > admin);
});

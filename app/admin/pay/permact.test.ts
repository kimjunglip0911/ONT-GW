import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("perm save checks admin before writing", () => {
  const src = readFileSync(new URL("./permact.ts", import.meta.url), "utf8");
  const admin = src.indexOf("isAdmin");
  const add = src.indexOf("addPerm(");
  assert.ok(admin >= 0 && add > admin);
});

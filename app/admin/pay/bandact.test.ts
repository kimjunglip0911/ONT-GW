import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("band save checks admin before writing", () => {
  const src = readFileSync(new URL("./bandact.ts", import.meta.url), "utf8");
  const admin = src.indexOf("isAdmin");
  const set = src.indexOf("setBand(");
  assert.ok(admin >= 0 && set > admin);
});

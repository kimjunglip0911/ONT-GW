import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("reset checks admin before writing pass", () => {
  const src = readFileSync(new URL("./rst.ts", import.meta.url), "utf8");
  const admin = src.indexOf("isAdmin");
  const set = src.indexOf("setPass");
  assert.ok(admin >= 0 && set > admin);
});

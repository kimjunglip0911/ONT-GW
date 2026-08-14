import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("change dialog has save only and is not a label", () => {
  const src = readFileSync(new URL("./chg.tsx", import.meta.url), "utf8");
  assert.match(src, /role="dialog"/);
  assert.match(src, /저장/);
  assert.doesNotMatch(src, /취소/);
  assert.doesNotMatch(src, /<label[\s\S]*<button/);
  assert.doesNotMatch(src, /onClick=\{/);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("body caption is not a label around the editor", () => {
  const src = readFileSync(new URL("./form.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(src, /<label[\s\S]*본문[\s\S]*<Edit/);
  assert.match(src, /본문[\s\S]*<Edit/);
});

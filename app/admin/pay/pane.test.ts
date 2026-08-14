import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("pane title is a button not a label around body", () => {
  const src = readFileSync(new URL("./pane.tsx", import.meta.url), "utf8");
  assert.match(src, /<button[\s\S]*aria-expanded/);
  assert.doesNotMatch(src, /<label[\s\S]*{title}[\s\S]*{kids}/);
});

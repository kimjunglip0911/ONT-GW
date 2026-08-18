import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("tax list hides income tax percent", () => {
  const src = readFileSync(new URL("./taxs.tsx", import.meta.url), "utf8");
  assert.match(src, /TAXES\[0\]/);
  assert.match(src, /filter/);
});

test("bands have no cut column", () => {
  const src = readFileSync(new URL("./bands.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(src, /누진공제/);
});

test("band row has no delete", () => {
  const src = readFileSync(new URL("./bandrow.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(src, /삭제/);
});

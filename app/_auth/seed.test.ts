import assert from "node:assert/strict";
import { test } from "node:test";
import { isSeed, SEED } from "./seed.ts";

test("seed is 1234", () => {
  assert.equal(SEED, "1234");
  assert.equal(isSeed("1234"), true);
});

test("other pass is not seed", () => {
  assert.equal(isSeed("abcd"), false);
  assert.equal(isSeed(""), false);
});

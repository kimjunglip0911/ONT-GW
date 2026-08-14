import assert from "node:assert/strict";
import { test } from "node:test";
import { canSet, newOk } from "./rule.ts";

test("mismatch and empty new pass fail", () => {
  assert.equal(newOk("ab", "cd"), false);
  assert.equal(newOk("", ""), false);
});

test("seed as new pass fails", () => {
  assert.equal(newOk("1234", "1234"), false);
});

test("matching custom pass is ok", () => {
  assert.equal(newOk("secret", "secret"), true);
});

test("stored seed can change when new is ok", () => {
  assert.equal(canSet("1234", "secret", "secret"), true);
  assert.equal(canSet("old", "secret", "secret"), false);
});

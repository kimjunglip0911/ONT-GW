import assert from "node:assert/strict";
import { test } from "node:test";
import { foldUid } from "./fold.ts";

test("ont000001 becomes ONT000001", () => {
  assert.equal(foldUid("ont000001"), "ONT000001");
});

test("ONT000001 stays ONT000001", () => {
  assert.equal(foldUid("ONT000001"), "ONT000001");
});

test("pads trim then upper", () => {
  assert.equal(foldUid("  ont000002  "), "ONT000002");
});

test("empty and space become empty", () => {
  assert.equal(foldUid(""), "");
  assert.equal(foldUid("   "), "");
});

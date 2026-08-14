import assert from "node:assert/strict";
import { test } from "node:test";
import { okRate, TAXES } from "./rate.ts";

test("rate 0 and 100 are ok", () => {
  assert.equal(okRate(0), true);
  assert.equal(okRate(100), true);
});

test("rate outside 0-100 fails", () => {
  assert.equal(okRate(-1), false);
  assert.equal(okRate(101), false);
});

test("seed names are six tax items", () => {
  assert.deepEqual(TAXES, [
    "근로소득세", "지방소득세", "국민연금", "건강보험", "장기요양보험", "고용보험",
  ]);
});

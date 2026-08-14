import assert from "node:assert/strict";
import { test } from "node:test";
import { wageOf } from "./wage.ts";

test("3m over 209 hours is 14354", () => {
  assert.equal(wageOf(3_000_000, 209), 14354);
});

test("hours 0 is wage 0", () => {
  assert.equal(wageOf(1000, 0), 0);
});

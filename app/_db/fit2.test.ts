import assert from "node:assert/strict";
import { test } from "node:test";
import { bandOf, rateOf, taxOf } from "./fit.ts";
import { ROWS } from "./fit.test.ts";

test("year 14m stays in first band", () => {
  assert.equal(bandOf(14_000_000, ROWS)?.rate, 6);
});

test("year over 14m uses 15 percent", () => {
  assert.equal(bandOf(14_000_001, ROWS)?.rate, 15);
});

test("year over 1b uses 45 percent", () => {
  assert.equal(bandOf(1_000_000_001, ROWS)?.rate, 45);
});

test("bad pay is zero", () => {
  assert.equal(rateOf(0, ROWS), 0);
  assert.equal(rateOf(-1, ROWS), 0);
  assert.equal(rateOf(Number.NaN, ROWS), 0);
  assert.equal(taxOf(0, ROWS), 0);
  assert.equal(taxOf(-1, ROWS), 0);
  assert.equal(taxOf(Number.NaN, ROWS), 0);
});

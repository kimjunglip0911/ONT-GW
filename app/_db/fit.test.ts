import assert from "node:assert/strict";
import { test } from "node:test";
import { locOf, rateOf, taxOf } from "./fit.ts";
import type { Band } from "./rows.ts";

function b(lo: number, hi: number | null, rate: number): Band {
  return { id: `${rate}`, lo, hi, rate, cut: 0, ord: rate };
}

export const ROWS: Band[] = [
  b(0, 14_000_000, 6),
  b(14_000_000, 50_000_000, 15),
  b(50_000_000, 88_000_000, 24),
  b(88_000_000, 150_000_000, 35),
  b(150_000_000, 300_000_000, 38),
  b(300_000_000, 500_000_000, 40),
  b(500_000_000, 1_000_000_000, 42),
  b(1_000_000_000, null, 45),
];

test("pay 3m uses 15 percent", () => {
  assert.equal(rateOf(3_000_000, ROWS), 15);
  assert.equal(taxOf(3_000_000, ROWS), 450_000);
  assert.equal(locOf(450_000, 10), 45_000);
});

test("pay 1m uses 6 percent", () => {
  assert.equal(rateOf(1_000_000, ROWS), 6);
  assert.equal(taxOf(1_000_000, ROWS), 60_000);
});

test("empty bands are zero", () => {
  assert.equal(rateOf(3_000_000, []), 0);
});

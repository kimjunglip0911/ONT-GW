import assert from "node:assert/strict";
import { test } from "node:test";
import { fillOf } from "./fill.ts";

test("no pack fills zeros", () => {
  assert.deepEqual(fillOf(null), { pay: "0", wage: "0", meal: "0", fuel: "0" });
});

test("pack 3m over 209 fills wage 14354", () => {
  const row = {
    id: "1", name: "기본", pay: 3_000_000, hours: 209,
    meal: 100, fuel: 200, is_def: true,
  };
  assert.deepEqual(fillOf(row), {
    pay: "3000000", wage: "14354", meal: "100", fuel: "200",
  });
});

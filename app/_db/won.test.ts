import assert from "node:assert/strict";
import { test } from "node:test";
import { cutOf, spanOf, wonOf } from "./won.ts";

test("won labels use man and eok", () => {
  assert.equal(wonOf(14_000_000), "1,400만 원");
  assert.equal(wonOf(1_000_000_000), "10억 원");
});

test("span covers first mid and open bands", () => {
  assert.equal(spanOf(0, 14_000_000), "1,400만 원 이하");
  assert.equal(spanOf(14_000_000, 50_000_000), "1,400만 원 초과 5,000만 원 이하");
  assert.equal(spanOf(1_000_000_000, null), "10억 원 초과");
});

test("cut zero is none", () => {
  assert.equal(cutOf(0), "없음");
  assert.equal(cutOf(1_260_000), "126만 원");
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { fromSheet } from "./parse.ts";

const HEAD = ["이름", "생년월일", "기본급", "권한", "입사일"];
const OK = ["김", "1990-01-01", 1000, "직원", "2020-01-01"];

test("sheet without PW parses", () => {
  const { ok, err } = fromSheet([HEAD, OK]);
  assert.equal(err, "");
  assert.equal(ok.length, 1);
  assert.equal(ok[0].name, "김");
});

test("meal and fuel headers map to meal and fuel", () => {
  const { ok, err } = fromSheet([
    ["이름", "생년월일", "기본급", "권한", "입사일", "식대", "유류비"],
    ["김", "1990-01-01", 1000, "직원", "2020-01-01", 5000, 3000],
  ]);
  assert.equal(err, "");
  assert.equal(ok[0].meal, 5000);
  assert.equal(ok[0].fuel, 3000);
});

test("etc pay headers map to etc1 and etc2", () => {
  const { ok, err } = fromSheet([
    ["이름", "생년월일", "기본급", "권한", "입사일", "기타급여1", "기타급여2"],
    ["김", "1990-01-01", 1000, "직원", "2020-01-01", 100, 200],
  ]);
  assert.equal(err, "");
  assert.equal(ok[0].etc1, 100);
  assert.equal(ok[0].etc2, 200);
});

test("row without name is skipped", () => {
  const { ok, skip, err } = fromSheet([
    HEAD,
    ["", "1990-01-01", 1000, "직원", "2020-01-01"],
  ]);
  assert.equal(err, "");
  assert.equal(ok.length, 0);
  assert.equal(skip, 1);
});

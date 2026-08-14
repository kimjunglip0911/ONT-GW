import assert from "node:assert/strict";
import { test } from "node:test";
import { toDraft } from "./map.ts";

const row = {
  name: "김",
  birth: "1990-01-01",
  hired: "2020-01-01",
  pay: 1000,
  role: "직원",
};

test("draft needs name dates pay role not pass", () => {
  const ok = toDraft(row);
  assert.ok(ok);
  assert.equal(ok.name, "김");
  assert.equal("pass" in ok, false);
  assert.equal(ok.wage, 0);
});

test("draft without name is null", () => {
  assert.equal(toDraft({ ...row, name: "" }), null);
});

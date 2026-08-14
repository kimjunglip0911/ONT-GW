import assert from "node:assert/strict";
import { test } from "node:test";
import { toPatch } from "./patch.ts";

const row = {
  name: "김",
  birth: "1990-01-01",
  hired: "2020-01-01",
  pay: 1000,
  role: "직원",
  pass: "secret",
};

test("row edit does not keep a password", () => {
  const ok = toPatch("ONT000001", row);
  assert.ok(ok);
  assert.equal("pass" in ok, false);
});

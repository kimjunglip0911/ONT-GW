import assert from "node:assert/strict";
import { test } from "node:test";
import { ROLE_OK, ROLE_STAFF } from "./names.ts";
import { sessTok } from "./sess.ts";

const row = { pass: "secret", role: "직원" };

test("missing uid is not a live session", () => {
  assert.equal(sessTok(ROLE_STAFF, "", row), "");
});

test("deleted or seed account drops the session", () => {
  assert.equal(sessTok(ROLE_STAFF, "ONT000001", null), "");
  assert.equal(sessTok(ROLE_STAFF, "ONT000001", { pass: "1234", role: "직원" }), "");
});

test("role mismatch drops the session", () => {
  assert.equal(sessTok(ROLE_OK, "ONT000001", row), "");
});

test("matching custom pass keeps the session", () => {
  assert.equal(sessTok(ROLE_STAFF, "ONT000001", row), ROLE_STAFF);
});

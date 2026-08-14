import assert from "node:assert/strict";
import { test } from "node:test";
import { asTok, hasCred, isOk, isOn, loginOk, passOk } from "./check.ts";
import { foldUid } from "./fold.ts";
import { ROLE_OK, ROLE_STAFF } from "./names.ts";

test("maps 관리자 to admin", () => {
  assert.equal(asTok("관리자"), ROLE_OK);
});

test("maps 직원 to staff", () => {
  assert.equal(asTok("직원"), ROLE_STAFF);
});

test("unknown role is empty", () => {
  assert.equal(asTok("guest"), "");
});

test("empty pass is rejected before compare", () => {
  assert.equal(hasCred("ONT000001", ""), false);
  assert.equal(hasCred("", "x"), false);
  assert.equal(hasCred("ONT000001", "x"), true);
});

test("pass compare is exact", () => {
  assert.equal(passOk("ab", "ab"), true);
  assert.equal(passOk("ab", "AB"), false);
  assert.equal(passOk("ab", ""), false);
});

test("staff cookie is authed not admin", () => {
  assert.equal(isOk(ROLE_STAFF), false);
  assert.equal(isOn(ROLE_STAFF), true);
  assert.equal(isOk(ROLE_OK), true);
});

test("folded ont matches stored uid", () => {
  assert.equal(foldUid("ont000001"), "ONT000001");
});

test("seed login asks for change not role", () => {
  assert.deepEqual(loginOk("1234", "admin"), { ok: true, need: true });
});

test("custom login returns role", () => {
  assert.deepEqual(loginOk("secret", "staff"), { ok: true, role: "staff" });
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { homeOf, isApi, isLogin, isAdminPath, safeNext } from "./gate.ts";
import { ROLE_OK, ROLE_STAFF } from "./names.ts";

test("auth apis are open", () => {
  assert.equal(isApi("/api/login"), true);
  assert.equal(isApi("/api/logout"), true);
  assert.equal(isApi("/api/passwd"), true);
  assert.equal(isApi("/api/kick"), true);
  assert.equal(isApi("/notice"), false);
});

test("login path is exact", () => {
  assert.equal(isLogin("/login"), true);
  assert.equal(isLogin("/login/x"), false);
});

test("admin paths include hub and kids", () => {
  assert.equal(isAdminPath("/admin"), true);
  assert.equal(isAdminPath("/admin/users"), true);
  assert.equal(isAdminPath("/notice"), false);
});

test("homes follow role", () => {
  assert.equal(homeOf(ROLE_OK), "/admin");
  assert.equal(homeOf(ROLE_STAFF), "/notice");
});

test("staff next attend is kept", () => {
  assert.equal(safeNext("/attend", ROLE_STAFF), "/attend");
});

test("staff next admin is dropped", () => {
  assert.equal(safeNext("/admin", ROLE_STAFF), "");
  assert.equal(safeNext("/admin/users", ROLE_STAFF), "");
});

test("protocol-relative next is dropped", () => {
  assert.equal(safeNext("//evil", ROLE_OK), "");
});

test("dot-dot next is dropped", () => {
  assert.equal(safeNext("/attend/../../../admin", ROLE_STAFF), "");
});

test("backslash next is dropped", () => {
  assert.equal(safeNext("/\\evil.com", ROLE_OK), "");
});

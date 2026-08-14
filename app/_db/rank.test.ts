import assert from "node:assert/strict";
import { test } from "node:test";
import type { Notice } from "../notice/data.ts";
import { byPin } from "./rank.ts";

function row(
  id: string,
  created: string,
  pinUntil: string | null,
): Notice {
  return {
    id, title: id, kind: "일반", body: "x",
    pinUntil, created,
  };
}

const now = new Date("2026-08-14T12:00:00.000Z");

test("days 0 is not pinned", () => {
  const a = row("a", "2026-08-14T11:00:00.000Z", null);
  const b = row("b", "2026-08-14T10:00:00.000Z", null);
  assert.deepEqual(byPin([b, a], now).map((r) => r.id), ["a", "b"]);
});

test("active pin sits above expired and unpinned", () => {
  const pin = row("pin", "2026-08-10T00:00:00.000Z", "2026-08-20T00:00:00.000Z");
  const old = row("old", "2026-08-13T00:00:00.000Z", "2026-08-01T00:00:00.000Z");
  const fresh = row("new", "2026-08-14T11:00:00.000Z", null);
  assert.deepEqual(
    byPin([fresh, old, pin], now).map((r) => r.id),
    ["pin", "new", "old"],
  );
});

test("same pin state orders by newest created", () => {
  const a = row("a", "2026-08-14T10:00:00.000Z", "2026-08-20T00:00:00.000Z");
  const b = row("b", "2026-08-14T11:00:00.000Z", "2026-08-21T00:00:00.000Z");
  assert.deepEqual(byPin([a, b], now).map((r) => r.id), ["b", "a"]);
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { cleanHtml, textOf } from "./html.ts";

test("script tags drop and text remains", () => {
  const out = cleanHtml("<script>x</script>안녕");
  assert.equal(out.includes("script"), false);
  assert.equal(textOf(out), "안녕");
});

test("empty paragraph is empty text", () => {
  assert.equal(textOf("<p>   </p>"), "");
});

test("strong and ul stay", () => {
  const out = cleanHtml("<p><strong>a</strong></p><ul><li>b</li></ul>");
  assert.match(out, /<strong>a<\/strong>/);
  assert.match(out, /<ul>/);
  assert.match(out, /<li>b<\/li>/);
});

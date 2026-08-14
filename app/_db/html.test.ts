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

test("palette span color stays", () => {
  const out = cleanHtml('<p><span style="color: #b91c1c">a</span></p>');
  assert.match(out, /<span style="color:#b91c1c">a<\/span>/);
});

test("unsafe color and background drop", () => {
  const out = cleanHtml(
    '<span style="color:expression(x);background-color:#b91c1c">a</span>',
  );
  assert.equal(out.includes("expression"), false);
  assert.equal(out.includes("background"), false);
  assert.equal(textOf(out), "a");
});

test("palette font size stays", () => {
  const out = cleanHtml('<p><span style="font-size: 18px">a</span></p>');
  assert.match(out, /<span style="font-size:18px">a<\/span>/);
});

test("huge font size drops", () => {
  const out = cleanHtml('<span style="font-size:99px">a</span>');
  assert.equal(out.includes("99px"), false);
  assert.equal(textOf(out), "a");
});

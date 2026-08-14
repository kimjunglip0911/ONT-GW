import { hueOf } from "./hues.ts";
import { sizeOf } from "./sizes.ts";

export function hasMark(attrs: string) {
  return Boolean(hueOf(attrs) || sizeOf(attrs));
}

/** 허용된 정렬·색·크기만 style로 남긴다 */
export function cssOf(tag: string, attrs: string) {
  const bits: string[] = [];
  const a = /text-align\s*:\s*(left|center|right)/i.exec(attrs);
  if (a && (tag === "p" || tag === "li")) {
    bits.push(`text-align:${a[1].toLowerCase()}`);
  }
  if (tag === "ul" || tag === "ol") {
    return bits.length ? ` style="${bits.join(";")}"` : "";
  }
  const h = hueOf(attrs);
  if (h) bits.push(`color:${h}`);
  const s = sizeOf(attrs);
  if (s) bits.push(`font-size:${s}`);
  return bits.length ? ` style="${bits.join(";")}"` : "";
}

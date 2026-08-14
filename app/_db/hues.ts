export const HUES = [
  "#27272a",
  "#71717a",
  "#b91c1c",
  "#c2410c",
  "#a16207",
  "#15803d",
  "#1d4ed8",
  "#6d28d9",
] as const;

export function isHue(v: string) {
  return (HUES as readonly string[]).includes(v.toLowerCase());
}

/** style에서 팔레트 색만 꺼낸다 */
export function hueOf(attrs: string) {
  const m = /(?:^|[;\s"'()])color\s*:\s*(#[0-9a-f]{3,6})\b/i.exec(attrs);
  const hex = m?.[1].toLowerCase() ?? "";
  return isHue(hex) ? hex : "";
}

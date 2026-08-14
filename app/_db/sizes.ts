export const SIZES = ["12px", "14px", "16px", "18px", "24px"] as const;

export function isSize(v: string) {
  return (SIZES as readonly string[]).includes(v.toLowerCase());
}

/** style에서 허용 글자 크기만 꺼낸다 */
export function sizeOf(attrs: string) {
  const m = /font-size\s*:\s*(\d{1,2}px)\b/i.exec(attrs);
  const px = m?.[1].toLowerCase() ?? "";
  return isSize(px) ? px : "";
}

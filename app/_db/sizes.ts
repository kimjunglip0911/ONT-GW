/** Word 글자 크기 목록(pt) */
export const SIZES = [
  "8pt", "9pt", "10pt", "11pt", "12pt", "14pt", "16pt", "18pt",
  "20pt", "22pt", "24pt", "26pt", "28pt", "36pt", "48pt", "72pt",
] as const;

export function isSize(v: string) {
  return (SIZES as readonly string[]).includes(v.toLowerCase());
}

/** style에서 Word 크기만 꺼낸다 */
export function sizeOf(attrs: string) {
  const m = /font-size\s*:\s*(\d{1,2}pt)\b/i.exec(attrs);
  const pt = m?.[1].toLowerCase() ?? "";
  return isSize(pt) ? pt : "";
}

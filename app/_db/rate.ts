export const TAXES = [
  "국민연금",
  "건강보험",
  "장기요양",
  "고용보험",
  "소득세",
] as const;

/** 요율(%) 0–100 */
export function okRate(n: number) {
  return Number.isFinite(n) && n >= 0 && n <= 100;
}

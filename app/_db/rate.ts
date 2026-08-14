export const TAXES = [
  "근로소득세",
  "지방소득세",
  "국민연금",
  "건강보험",
  "장기요양보험",
  "고용보험",
] as const;

/** 요율(%) 0–100 */
export function okRate(n: number) {
  return Number.isFinite(n) && n >= 0 && n <= 100;
}

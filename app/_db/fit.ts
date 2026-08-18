import type { Band } from "./rows";

function okPay(n: number) {
  return Number.isFinite(n) && n > 0;
}

/** 월급을 연환산한다 */
export function yearOf(month: number) {
  return okPay(month) ? month * 12 : 0;
}

/** 연환산 금액이 들어가는 구간 */
export function bandOf(year: number, rows: Band[]) {
  return rows.find((row) => {
    if (row.hi == null) return year > row.lo;
    if (row.lo <= 0) return year <= row.hi;
    return row.lo < year && year <= row.hi;
  });
}

/** 월급에 맞는 구간 세율 */
export function rateOf(month: number, rows: Band[]) {
  if (!okPay(month) || rows.length === 0) return 0;
  return bandOf(yearOf(month), rows)?.rate ?? 0;
}

/** 월 근로소득세. 원 단위 버림 */
export function taxOf(month: number, rows: Band[]) {
  if (!okPay(month)) return 0;
  return Math.floor((month * rateOf(month, rows)) / 100);
}

/** 월 지방소득세. 세액에 요율을 곱한다 */
export function locOf(tax: number, rate: number) {
  if (!(tax > 0) || !Number.isFinite(rate)) return 0;
  return Math.floor((tax * rate) / 100);
}

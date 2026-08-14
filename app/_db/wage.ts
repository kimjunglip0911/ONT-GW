/** 기본급 ÷ 월 소정근로시간. 원 단위 버림 */
export function wageOf(pay: number, hours: number) {
  if (!(hours > 0) || !Number.isFinite(pay)) return 0;
  return Math.floor(pay / hours);
}

export function wonOf(n: number) {
  if (n >= 100_000_000) return `${(n / 100_000_000).toLocaleString("ko-KR")}억 원`;
  return `${Math.round(n / 10_000).toLocaleString("ko-KR")}만 원`;
}

export function spanOf(lo: number, hi: number | null) {
  if (hi == null) return `${wonOf(lo)} 초과`;
  if (lo <= 0) return `${wonOf(hi)} 이하`;
  return `${wonOf(lo)} 초과 ${wonOf(hi)} 이하`;
}

export function cutOf(n: number) {
  return n <= 0 ? "없음" : wonOf(n);
}

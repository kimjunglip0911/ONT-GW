export function asNum(v: unknown) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : NaN;
}

export function asInt(v: unknown) {
  const n = asNum(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : NaN;
}

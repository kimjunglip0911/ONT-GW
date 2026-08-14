const PRE = "ONT";
const PAD = 6;

export function nextUid(rows: { uid: string }[]) {
  let max = 0;
  for (const row of rows) {
    if (!row.uid.startsWith(PRE)) continue;
    const n = Number(row.uid.slice(PRE.length));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return PRE + String(max + 1).padStart(PAD, "0");
}

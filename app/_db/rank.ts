import type { Notice } from "../notice/data";

function pinned(row: Notice, now: Date) {
  if (!row.pinUntil) return false;
  return Date.parse(row.pinUntil) > now.getTime();
}

/** 고정 중인 글을 위로, 같으면 최신 등록순 */
export function byPin(rows: Notice[], now: Date) {
  return [...rows].sort((a, b) => {
    const ap = pinned(a, now);
    const bp = pinned(b, now);
    if (ap !== bp) return ap ? -1 : 1;
    return Date.parse(b.created) - Date.parse(a.created);
  });
}

import type { User } from "./data";

/** 이름 또는 ID에 검색어가 있으면 남긴다 */
export function byQuery(rows: User[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return rows;
  return rows.filter((row) => {
    return row.name.toLowerCase().includes(s) ||
      row.uid.toLowerCase().includes(s);
  });
}

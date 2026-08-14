import type { Notice } from "./data";
import { Item } from "./item";

export function List({ rows }: { rows: Notice[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-muted">
        등록된 공지가 없습니다.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
      {rows.map((row) => (
        <Item key={row.id} row={row} />
      ))}
    </ul>
  );
}

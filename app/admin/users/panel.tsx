import type { User } from "./data";
import type { Patch } from "./patch";
import { Trow } from "./trow";

const COLS = [
  "ID", "이름", "생년월일", "입사일", "기본급",
  "기타1", "기타2", "기타3", "기타4", "권한", "PW",
] as const;

type Props = {
  rows: User[];
  empty: string;
  onEdit: (row: Patch) => Promise<string>;
  onDrop: (uid: string) => Promise<string>;
};

export function Panel({ rows, empty, onEdit, onDrop }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-xl text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            {COLS.map((c) => (
              <th className="px-4 py-2 font-medium" key={c}>
                {c}
              </th>
            ))}
            <th className="w-px px-2 py-2" />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-3 text-muted" colSpan={COLS.length + 1}>
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <Trow key={row.uid} onDrop={onDrop} onEdit={onEdit} row={row} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

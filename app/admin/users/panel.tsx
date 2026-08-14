import type { User } from "./data";
import type { Patch } from "./patch";
import { Trow } from "./trow";

const COLS = [
  "ID", "이름", "생년월일", "입사일", "권한", "기본급",
  "시급", "식대", "유류비", "기타급여1", "기타급여2", "PW",
] as const;

type Props = {
  rows: User[];
  empty: string;
  onEdit: (row: Patch) => Promise<string>;
  onDrop: (uid: string) => Promise<string>;
  onRst: (uid: string) => Promise<string>;
};

export function Panel({ rows, empty, onEdit, onDrop, onRst }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-xl text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            {COLS.map((c) => (
              <th className={c === "PW" ? "w-px whitespace-nowrap px-2 py-2 font-medium" : "px-4 py-2 font-medium"} key={c}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-3 text-muted" colSpan={COLS.length}>
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <Trow key={row.uid} onDrop={onDrop} onEdit={onEdit} onRst={onRst} row={row} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

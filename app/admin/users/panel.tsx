import type { User } from "./data";

const COLS = ["ID", "이름", "생년월일", "기본급", "권한", "입사일"] as const;

function Row({ row }: { row: User }) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-4 py-2">{row.uid}</td>
      <td className="px-4 py-2">{row.name}</td>
      <td className="px-4 py-2">{row.birth}</td>
      <td className="px-4 py-2">{row.pay.toLocaleString()}</td>
      <td className="px-4 py-2">{row.role}</td>
      <td className="px-4 py-2">{row.hired}</td>
    </tr>
  );
}

export function Panel({ rows }: { rows: User[] }) {
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
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-3 text-muted" colSpan={6}>
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            rows.map((row) => <Row key={row.uid} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

import { ROWS } from "./data";

export function Board() {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-xl text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="px-4 py-2 font-medium">날짜</th>
            <th className="px-4 py-2 font-medium">출근</th>
            <th className="px-4 py-2 font-medium">퇴근</th>
            <th className="px-4 py-2 font-medium">비고</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.day} className="border-b border-line last:border-0">
              <td className="px-4 py-2">{row.day}</td>
              <td className="px-4 py-2">{row.inAt}</td>
              <td className="px-4 py-2">{row.outAt}</td>
              <td className="px-4 py-2">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

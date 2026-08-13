import { USERS } from "./data";

export function Panel() {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card">
      <table className="w-full min-w-xl text-left text-sm">
        <thead className="border-b border-line text-muted">
          <tr>
            <th className="px-4 py-2 font-medium">이름</th>
            <th className="px-4 py-2 font-medium">팀</th>
            <th className="px-4 py-2 font-medium">권한</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((row) => (
            <tr key={row.name} className="border-b border-line last:border-0">
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.team}</td>
              <td className="px-4 py-2">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

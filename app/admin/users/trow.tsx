import type { User } from "./data";

function won(n: number) {
  return n.toLocaleString();
}

export function Trow({ row }: { row: User }) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-4 py-2">{row.uid}</td>
      <td className="px-4 py-2">{row.name}</td>
      <td className="px-4 py-2">{row.birth}</td>
      <td className="px-4 py-2">{row.hired}</td>
      <td className="px-4 py-2">{won(row.pay)}</td>
      <td className="px-4 py-2">{won(row.etc1)}</td>
      <td className="px-4 py-2">{won(row.etc2)}</td>
      <td className="px-4 py-2">{won(row.etc3)}</td>
      <td className="px-4 py-2">{won(row.etc4)}</td>
      <td className="px-4 py-2">{row.role}</td>
    </tr>
  );
}

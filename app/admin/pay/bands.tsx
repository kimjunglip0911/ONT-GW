import type { Band } from "../../_db/rows";
import { cutOf, spanOf } from "../../_db/won";

/** 과세표준에 따라 세율이 달라지는 안내 */
export function Bands({ rows }: { rows: Band[] }) {
  return (
    <div className="mt-4 border-t border-line pt-3">
      <p className="mb-2 text-xs text-muted">
        근로소득세는 과세표준(각종 공제 후 금액) 구간에 따라 세율이 달라집니다.
        지방소득세는 그 세액의 10%입니다. 숫자는 2026년 기준입니다.
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-muted">
            <th className="py-1 font-normal">과세표준</th>
            <th className="py-1 font-normal">세율</th>
            <th className="py-1 font-normal">누진공제</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="py-1">{spanOf(row.lo, row.hi)}</td>
              <td className="py-1">{row.rate}%</td>
              <td className="py-1">{cutOf(row.cut)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

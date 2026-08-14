import { tiny } from "../box";

type Props = {
  type?: string;
  value: string;
  hint?: string;
  onVal: (v: string) => void;
};

export function Ecell({ type, value, hint, onVal }: Props) {
  return (
    <td className="px-2 py-1">
      <input
        autoComplete="off"
        className={tiny}
        min={type === "number" ? 0 : undefined}
        onChange={(e) => onVal(e.target.value)}
        placeholder={hint}
        type={type}
        value={value}
      />
    </td>
  );
}

export function Esel({ value, onVal }: { value: string; onVal: (v: string) => void }) {
  return (
    <td className="px-2 py-1">
      <select className={tiny} onChange={(e) => onVal(e.target.value)} value={value}>
        <option>관리자</option>
        <option>직원</option>
      </select>
    </td>
  );
}

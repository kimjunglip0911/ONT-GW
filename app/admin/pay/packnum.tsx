import { tiny } from "../box";

type Props = { text: string; value: string; onVal: (v: string) => void };

export function PackNum({ text, value, onVal }: Props) {
  return (
    <label className="flex items-center gap-1 text-xs">
      {text}
      <input
        className={tiny}
        min={0}
        type="number"
        value={value}
        onChange={(e) => onVal(e.target.value)}
      />
    </label>
  );
}

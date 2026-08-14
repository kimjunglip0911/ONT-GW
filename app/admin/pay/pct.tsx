const inp =
  "w-full [appearance:textfield] rounded-md border border-line bg-canvas py-1 pl-2 pr-6 text-sm outline-none focus:border-ink [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

type Props = { val: string; onVal: (v: string) => void };

/** 요율 칸. %는 입력창 안에 둔다 */
export function Pct({ val, onVal }: Props) {
  return (
    <span className="relative block w-24">
      <input
        className={inp}
        max={100}
        min={0}
        step="0.001"
        type="number"
        value={val}
        onChange={(e) => onVal(e.target.value)}
      />
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs text-muted">
        %
      </span>
    </span>
  );
}

import { box } from "../box";

type Props = { q: string; setQ: (v: string) => void };

export function Find({ q, setQ }: Props) {
  return (
    <div className="mb-4 rounded-xl border border-line bg-card p-4">
      <label className="block max-w-md text-sm">
        사용자 조회
        <input
          className={box}
          onChange={(e) => setQ(e.target.value)}
          placeholder="이름 또는 ID"
          value={q}
        />
      </label>
    </div>
  );
}

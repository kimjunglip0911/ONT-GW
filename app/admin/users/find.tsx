import { box } from "../box";

type Props = { q: string; setQ: (v: string) => void };

export function Find({ q, setQ }: Props) {
  return (
    <label className="mb-4 block max-w-md text-sm">
      이름 조회
      <input
        className={box}
        onChange={(e) => setQ(e.target.value)}
        placeholder="사용자 이름"
        value={q}
      />
    </label>
  );
}

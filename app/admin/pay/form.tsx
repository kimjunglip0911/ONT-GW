import { box } from "../box";

export function Form() {
  return (
    <form className="max-w-md rounded-xl border border-line bg-card p-4">
      <label className="block text-sm">
        기본 시급
        <input name="wage" defaultValue="12,000" className={box} />
      </label>
      <label className="mt-3 block text-sm">
        연장 수당 비율
        <input name="over" defaultValue="1.5" className={box} />
      </label>
      <label className="mt-3 block text-sm">
        야간 수당 비율
        <input name="night" defaultValue="1.5" className={box} />
      </label>
      <button
        type="button"
        className="mt-4 rounded-md bg-ink px-3 py-2 text-sm text-card"
      >
        저장
      </button>
      <p className="mt-2 text-xs text-muted">저장은 다음 작업입니다.</p>
    </form>
  );
}

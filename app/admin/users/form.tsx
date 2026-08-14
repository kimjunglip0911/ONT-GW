import { box } from "../box";

export function Form() {
  return (
    <form className="mb-6 max-w-md rounded-xl border border-line bg-card p-4">
      <label className="block text-sm">
        이름
        <input name="name" className={box} />
      </label>
      <label className="mt-3 block text-sm">
        팀
        <input name="team" className={box} />
      </label>
      <label className="mt-3 block text-sm">
        권한
        <input name="role" className={box} />
      </label>
      <button
        type="button"
        className="mt-4 rounded-md bg-ink px-3 py-2 text-sm text-card"
      >
        등록
      </button>
      <p className="mt-2 text-xs text-muted">저장은 다음 작업입니다.</p>
    </form>
  );
}

import { box } from "../box";

export function Form() {
  return (
    <form className="max-w-xl rounded-xl border border-line bg-card p-4">
      <label className="block text-sm">
        제목
        <input name="title" className={box} />
      </label>
      <label className="mt-3 block text-sm">
        구분
        <select name="kind" className={box}>
          <option>일반</option>
          <option>긴급</option>
        </select>
      </label>
      <label className="mt-3 block text-sm">
        본문
        <textarea name="body" rows={6} className={box} />
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

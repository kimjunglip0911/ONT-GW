import { box } from "../box";

export function Meta() {
  return (
    <>
      <label className="block text-sm">
        제목
        <input name="title" className={box} />
      </label>
      <label className="mt-3 block text-sm">
        구분
        <select className={box} defaultValue="일반" name="kind">
          <option>일반</option>
          <option>중요</option>
        </select>
      </label>
      <label className="mt-3 block text-sm">
        최상단 고정 기간(일)
        <input className={box} defaultValue={0} min={0} name="days" type="number" />
      </label>
    </>
  );
}

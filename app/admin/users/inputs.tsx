import { box } from "../box";

export function Inputs() {
  return (
    <>
      <label className="mt-3 block text-sm">
        PW
        <input name="pass" type="password" required className={box} />
      </label>
      <label className="mt-3 block text-sm">
        이름
        <input name="name" required className={box} />
      </label>
      <label className="mt-3 block text-sm">
        생년월일
        <input name="birth" type="date" required className={box} />
      </label>
      <label className="mt-3 block text-sm">
        기본급
        <input name="pay" type="number" min={0} required className={box} />
      </label>
      <label className="mt-3 block text-sm">
        권한
        <select name="role" required className={box}>
          <option value="">선택</option>
          <option>관리자</option>
          <option>직원</option>
        </select>
      </label>
      <label className="mt-3 block text-sm">
        입사일
        <input name="hired" type="date" required className={box} />
      </label>
    </>
  );
}

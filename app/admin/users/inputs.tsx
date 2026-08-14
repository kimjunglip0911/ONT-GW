import { cell, lab, row } from "../box";
import { Field } from "./field";

export function Inputs({ uid }: { uid: string }) {
  return (
    <>
      <label className={row}>
        <span className={lab}>ID</span>
        <input name="uid" value={uid} readOnly className={cell} />
      </label>
      <Field name="name" text="이름" />
      <Field name="birth" text="생년월일" type="date" />
      <Field name="hired" text="입사일" type="date" />
      <label className={row}>
        <span className={lab}>권한</span>
        <select name="role" required className={cell}>
          <option value="">선택</option>
          <option>관리자</option>
          <option>직원</option>
        </select>
      </label>
    </>
  );
}

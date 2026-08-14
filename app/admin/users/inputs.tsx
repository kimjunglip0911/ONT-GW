import { cell, lab, row } from "../box";
import { Field } from "./field";

export function Inputs() {
  return (
    <>
      <Field name="pass" text="PW" type="password" />
      <Field name="name" text="이름" />
      <Field name="birth" text="생년월일" type="date" />
      <Field name="hired" text="입사일" type="date" />
      <Field name="pay" text="기본급" type="number" />
      <Field name="etc1" need={false} text="기타급여1" type="number" />
      <Field name="etc2" need={false} text="기타급여2" type="number" />
      <Field name="etc3" need={false} text="기타급여3" type="number" />
      <Field name="etc4" need={false} text="기타급여4" type="number" />
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

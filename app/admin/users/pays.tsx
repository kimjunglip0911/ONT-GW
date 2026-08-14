import { Field } from "./field";

/** 기본급·시급·식대·유류비 */
export function Pays() {
  return (
    <>
      <Field name="pay" text="기본급" type="number" />
      <Field name="wage" need={false} text="기본 시급" type="number" />
      <Field name="meal" need={false} text="식대" type="number" />
      <Field name="fuel" need={false} text="유류비" type="number" />
    </>
  );
}

/** 기타급여 */
export function Etcs() {
  return (
    <>
      <Field cls="col-start-1" name="etc1" need={false} text="기타급여1" type="number" />
      <Field name="etc2" need={false} text="기타급여2" type="number" />
    </>
  );
}

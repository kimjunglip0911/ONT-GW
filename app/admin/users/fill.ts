import type { Pack } from "../../_db/rows.ts";
import { wageOf } from "../../_db/wage.ts";

export type Fill = {
  pay: string;
  wage: string;
  meal: string;
  fuel: string;
};

/** 기본 패키지를 등록 폼 칸 값으로 바꾼다 */
export function fillOf(pack: Pack | null): Fill {
  if (!pack) return { pay: "0", wage: "0", meal: "0", fuel: "0" };
  return {
    pay: String(pack.pay),
    wage: String(wageOf(pack.pay, pack.hours)),
    meal: String(pack.meal),
    fuel: String(pack.fuel),
  };
}

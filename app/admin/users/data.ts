export type Role = "관리자" | "직원";

/** 목록용. 비밀번호는 넣지 않는다 */
export type User = {
  uid: string;
  name: string;
  birth: string;
  hired: string;
  pay: number;
  wage: number;
  meal: number;
  fuel: number;
  etc1: number;
  etc2: number;
  role: Role;
};

export type Draft = {
  name: string;
  birth: string;
  hired: string;
  pay: number;
  wage: number;
  meal: number;
  fuel: number;
  etc1: number;
  etc2: number;
  role: Role;
};

export function isRole(v: string): v is Role {
  return v === "관리자" || v === "직원";
}

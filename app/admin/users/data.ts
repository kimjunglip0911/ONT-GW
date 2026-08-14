export type Role = "관리자" | "직원";

/** 목록용. 비밀번호는 넣지 않는다 */
export type User = {
  uid: string;
  name: string;
  birth: string;
  hired: string;
  pay: number;
  etc1: number;
  etc2: number;
  etc3: number;
  etc4: number;
  role: Role;
};

export type Draft = {
  pass: string;
  name: string;
  birth: string;
  hired: string;
  pay: number;
  etc1: number;
  etc2: number;
  etc3: number;
  etc4: number;
  role: Role;
};

export function isRole(v: string): v is Role {
  return v === "관리자" || v === "직원";
}

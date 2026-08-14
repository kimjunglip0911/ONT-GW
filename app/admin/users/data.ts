export type Role = "관리자" | "직원";

export type User = {
  uid: string;
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

export type Draft = Omit<User, "uid">;

export function isRole(v: string): v is Role {
  return v === "관리자" || v === "직원";
}

const Z = { etc1: 0, etc2: 0, etc3: 0, etc4: 0 };

export const SEED: User[] = [
  { uid: "ONT000001", pass: "demo", name: "ADMIN", birth: "1980-01-01", hired: "2020-01-01", pay: 0, ...Z, role: "관리자" },
  { uid: "ONT000002", pass: "demo", name: "김현장", birth: "1990-03-12", hired: "2022-04-01", pay: 2800000, ...Z, role: "직원" },
  { uid: "ONT000003", pass: "demo", name: "이사무", birth: "1988-07-08", hired: "2021-09-15", pay: 2600000, ...Z, role: "직원" },
  { uid: "ONT000004", pass: "demo", name: "박팀장", birth: "1985-11-20", hired: "2019-06-01", pay: 3200000, ...Z, role: "직원" },
];

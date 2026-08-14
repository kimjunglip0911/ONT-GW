export type Kind = "중요" | "일반";

export type Notice = {
  id: string;
  title: string;
  kind: Kind;
  body: string;
  pinUntil: string | null;
  created: string;
};

export function isKind(v: string): v is Kind {
  return v === "중요" || v === "일반";
}

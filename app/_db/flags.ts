export const PAGES = [
  "notice",
  "attend",
  "admin",
  "users",
  "post",
  "time",
  "setup",
] as const;

export const FEATS = [
  "add",
  "edit",
  "drop",
  "rst",
  "note",
  "conf",
] as const;

export type Page = (typeof PAGES)[number];
export type Feat = (typeof FEATS)[number];
export type Flags = Record<string, boolean>;

export function allOn(keys: readonly string[]): Flags {
  return Object.fromEntries(keys.map((k) => [k, true]));
}

export function allOff(keys: readonly string[]): Flags {
  return Object.fromEntries(keys.map((k) => [k, false]));
}

export function staffOn(): Flags {
  return Object.fromEntries(PAGES.map((k) => [k, k === "notice" || k === "attend"]));
}

import type { Flags } from "./flags";

export type Tax = {
  id: string;
  name: string;
  rate: number;
  ord: number;
  note: string;
};

export type Band = {
  id: string;
  lo: number;
  hi: number | null;
  rate: number;
  cut: number;
  ord: number;
};

export type Pack = {
  id: string;
  name: string;
  pay: number;
  hours: number;
  meal: number;
  fuel: number;
  is_def: boolean;
};

export type Perm = { id: string; name: string; pages: Flags; feats: Flags };

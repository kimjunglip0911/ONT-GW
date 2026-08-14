import {
  ClipboardList,
  Clock,
  FilePlus,
  Megaphone,
  Shield,
  UserPlus,
  Wallet,
} from "lucide-react";
import type { NavItem } from "./menu";

const MAP = {
  notice: Megaphone,
  attend: Clock,
  admin: Shield,
  user: UserPlus,
  pay: Wallet,
  post: FilePlus,
  time: ClipboardList,
};

export function Glyph({ name }: { name: NavItem["icon"] }) {
  const Icon = MAP[name];
  return <Icon className="size-5 shrink-0" aria-hidden />;
}

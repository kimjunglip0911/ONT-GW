import { Clock, Megaphone, Shield } from "lucide-react";
import type { NavItem } from "./menu";

const MAP = {
  notice: Megaphone,
  attend: Clock,
  admin: Shield,
};

export function Glyph({ name }: { name: NavItem["icon"] }) {
  const Icon = MAP[name];
  return <Icon className="size-5 shrink-0" aria-hidden />;
}

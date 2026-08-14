import Link from "next/link";
import { navCls } from "./chip";
import { Glyph } from "./glyph";
import { pathOn, type NavItem } from "./menu";

type Props = {
  items: NavItem[];
  path: string;
  onPick?: () => void;
};

export function Kids({ items, path, onPick }: Props) {
  return (
    <ul className="mt-1 flex flex-col gap-1 pl-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onPick}
            className={navCls(pathOn(path, item.href))}
          >
            <Glyph name={item.icon} />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

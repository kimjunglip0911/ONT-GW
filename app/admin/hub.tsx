import Link from "next/link";
import { ADMIN_KIDS } from "../_shell/menu";

export function Hub() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {ADMIN_KIDS.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="block rounded-xl border border-line bg-card px-4 py-3"
          >
            <p className="font-medium">{item.label}</p>
            <p className="mt-1 text-xs text-muted">
              {item.href === "/admin/pay" ? "저장됩니다" : "목업 화면으로 이동합니다"}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

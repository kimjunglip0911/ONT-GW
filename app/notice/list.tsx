import { ITEMS } from "./data";

export function List() {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
      {ITEMS.map((item) => (
        <li key={item.id} className="flex items-start gap-3 px-4 py-3">
          <span
            className={
              item.kind === "긴급"
                ? "shrink-0 rounded-md bg-ink px-2 py-0.5 text-xs text-card"
                : "shrink-0 rounded-md border border-line px-2 py-0.5 text-xs text-muted"
            }
          >
            {item.kind}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{item.title}</p>
            <p className="text-xs text-muted">{item.date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

import { TODAY, WEEK } from "./data";

export function Cards() {
  const items = [
    { label: "오늘", value: TODAY.status, sub: `${TODAY.inAt} 출근` },
    { label: "근무일", value: `${WEEK.work}일`, sub: "이번 주" },
    { label: "지각", value: `${WEEK.late}회`, sub: "이번 주" },
  ];
  return (
    <ul className="mb-6 grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-xl border border-line bg-card px-4 py-3"
        >
          <p className="text-xs text-muted">{item.label}</p>
          <p className="mt-1 text-lg font-semibold">{item.value}</p>
          <p className="text-xs text-muted">{item.sub}</p>
        </li>
      ))}
    </ul>
  );
}

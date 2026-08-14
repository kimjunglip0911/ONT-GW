import type { Flags } from "../../_db/flags";

type Props = {
  keys: readonly string[];
  labs: Record<string, string>;
  flags: Flags;
  onFlag: (k: string, on: boolean) => void;
};

export function Checks({ keys, labs, flags, onFlag }: Props) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
      {keys.map((k) => (
        <li key={k}>
          <label className="inline-flex items-center gap-1">
            <input
              checked={flags[k] === true}
              onChange={(e) => onFlag(k, e.target.checked)}
              type="checkbox"
            />
            {labs[k] ?? k}
          </label>
        </li>
      ))}
    </ul>
  );
}

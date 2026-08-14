export type Tab = "reg" | "find";

type Props = {
  tab: Tab;
  setTab: (t: Tab) => void;
};

function Btn({ on, label, go }: { on: boolean; label: string; go: () => void }) {
  return (
    <button
      type="button"
      onClick={go}
      className={
        on
          ? "border-b-2 border-ink px-3 py-2 text-sm"
          : "px-3 py-2 text-sm text-muted"
      }
    >
      {label}
    </button>
  );
}

export function Tabs({ tab, setTab }: Props) {
  return (
    <div className="mb-4 flex gap-1 border-b border-line">
      <Btn on={tab === "reg"} label="사용자 등록" go={() => setTab("reg")} />
      <Btn on={tab === "find"} label="사용자 조회" go={() => setTab("find")} />
    </div>
  );
}

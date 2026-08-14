"use client";

const btn = "rounded-md bg-ink px-2 py-1 text-xs text-card";

type Props = { onRst: () => Promise<string> };

export function Rbtn({ onRst }: Props) {
  async function onGo() {
    if (!confirm("비밀번호를 1234로 초기화할까요?")) return;
    const err = await onRst();
    if (err) alert(err);
  }

  return (
    <button className={btn} onClick={() => void onGo()} type="button">
      초기화
    </button>
  );
}

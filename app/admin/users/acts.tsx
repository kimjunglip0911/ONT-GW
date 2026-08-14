"use client";

const btn = "rounded-md bg-ink px-2 py-1 text-xs text-card";

type Props = {
  onEdit: () => void;
  onDrop: () => Promise<string>;
};

export function Acts({ onEdit, onDrop }: Props) {
  async function onDel() {
    if (!confirm("ID를 삭제하겠습니까?")) return;
    const err = await onDrop();
    if (err) alert(err);
  }

  return (
    <div className="flex w-max gap-1">
      <button className={btn} onClick={onEdit} type="button">
        수정
      </button>
      <button className={btn} onClick={() => void onDel()} type="button">
        삭제
      </button>
    </div>
  );
}

import { cx } from "./cx";

/** 메뉴 행 활성/비활성 클래스 */
export function navCls(on: boolean) {
  return cx(
    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm",
    on ? "bg-chip text-rail-on" : "text-rail-fg hover:bg-chip",
  );
}

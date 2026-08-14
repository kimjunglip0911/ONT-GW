import { Shell } from "./shell";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        목록은 이 화면에만 있습니다. 새로고침하면 초기화됩니다.
      </p>
      <Shell />
    </section>
  );
}

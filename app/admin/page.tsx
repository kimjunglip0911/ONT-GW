import { Panel } from "./panel";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        지정된 관리자만 이 화면을 봅니다. 목록은 목업입니다.
      </p>
      <Panel />
    </section>
  );
}

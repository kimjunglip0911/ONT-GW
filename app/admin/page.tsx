import { Hub } from "./hub";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        지정된 관리자만 이 화면을 봅니다. 항목을 고르면 목업으로 갑니다.
      </p>
      <Hub />
    </section>
  );
}

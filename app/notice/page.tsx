import { List } from "./list";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        사내 공지와 현장 안내를 확인합니다.
      </p>
      <List />
    </section>
  );
}

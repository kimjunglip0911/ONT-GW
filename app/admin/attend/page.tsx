import { Table } from "./table";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        직원 근태를 보는 목업입니다. 내 근태 확인과 다른 화면입니다.
      </p>
      <Table />
    </section>
  );
}

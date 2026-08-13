import { Board } from "./board";
import { Cards } from "./cards";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        오늘 상태와 이번 주 출퇴근을 확인합니다.
      </p>
      <Cards />
      <Board />
    </section>
  );
}

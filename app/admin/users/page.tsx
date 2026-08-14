import { Form } from "./form";
import { Panel } from "./panel";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        목록은 목업입니다. 등록해도 행이 늘지 않습니다.
      </p>
      <Form />
      <Panel />
    </section>
  );
}

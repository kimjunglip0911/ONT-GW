import { Form } from "./form";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        급여 항목은 목업입니다. 저장되지 않습니다.
      </p>
      <Form />
    </section>
  );
}

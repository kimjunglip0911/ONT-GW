import { Form } from "./form";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        공지 작성은 목업입니다. 직원 공지 목록은 바뀌지 않습니다.
      </p>
      <Form />
    </section>
  );
}

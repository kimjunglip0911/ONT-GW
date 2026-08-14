import { Form } from "./form";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <section>
      <p className="mb-6 text-sm text-muted">
        등록한 공지는 직원 공지 페이지에 바로 보입니다.
      </p>
      <Form />
    </section>
  );
}

import { Suspense } from "react";
import { Form } from "./form";

export default function Page() {
  return (
    <div className="flex justify-center py-8">
      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
}

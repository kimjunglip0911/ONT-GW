import { foldUid } from "../_auth/fold";
import { Fields } from "./fields";

const wrap =
  "w-full max-w-sm rounded-xl border border-line bg-card p-6 shadow-lg";
const btn = "rounded-md bg-ink px-3 py-2 text-sm text-card";

type Props = {
  id: string;
  pass: string;
  err: string;
  setId: (v: string) => void;
  setPass: (v: string) => void;
  onSend: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function Card({ id, pass, err, setId, setPass, onSend }: Props) {
  return (
    <form className={wrap} onSubmit={(e) => void onSend(e)}>
      <h2 className="mb-4 text-lg font-semibold">로그인</h2>
      <Fields
        err={err}
        id={id}
        pass={pass}
        setId={(v) => setId(foldUid(v))}
        setPass={setPass}
      />
      <div className="mt-5 flex justify-end">
        <button className={btn} type="submit">확인</button>
      </div>
    </form>
  );
}

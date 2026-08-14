const box =
  "mt-1 w-full rounded-md border border-line bg-canvas px-3 py-2 outline-none focus:border-ink";

type Props = {
  pass: string;
  pass2: string;
  err: string;
  setPass: (v: string) => void;
  setPass2: (v: string) => void;
};

export function Npw({ pass, pass2, err, setPass, setPass2 }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm">
        새 비밀번호
        <input
          autoComplete="new-password"
          className={box}
          name="pass"
          onChange={(e) => setPass(e.target.value)}
          type="password"
          value={pass}
        />
      </label>
      <label className="text-sm">
        비밀번호 확인
        <input
          autoComplete="new-password"
          className={box}
          name="pass2"
          onChange={(e) => setPass2(e.target.value)}
          type="password"
          value={pass2}
        />
      </label>
      {err ? <p className="text-sm">{err}</p> : null}
    </div>
  );
}

type Props = {
  id: string;
  pass: string;
  err: string;
  setId: (v: string) => void;
  setPass: (v: string) => void;
};

const box =
  "mt-1 w-full rounded-md border border-line bg-canvas px-3 py-2 outline-none focus:border-ink";

export function Fields({ id, pass, err, setId, setPass }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm">
        아이디
        <input
          name="id"
          className={box}
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label className="text-sm">
        비밀번호
        <input
          name="pass"
          className={box}
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
        />
      </label>
      {err ? <p className="text-sm">{err}</p> : null}
    </div>
  );
}

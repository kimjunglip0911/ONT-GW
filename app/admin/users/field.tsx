import { cell, lab, row } from "../box";

type Props = {
  name: string;
  text: string;
  type?: string;
  need?: boolean;
  cls?: string;
};

export function Field({ name, text, type, need = true, cls }: Props) {
  return (
    <label className={cls ? `${row} ${cls}` : row}>
      <span className={lab}>{text}</span>
      <input
        className={cell}
        min={type === "number" ? 0 : undefined}
        name={name}
        required={need}
        type={type}
      />
    </label>
  );
}

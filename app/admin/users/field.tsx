import { cell, lab, row } from "../box";

type Props = {
  name: string;
  text: string;
  type?: string;
  need?: boolean;
};

export function Field({ name, text, type, need = true }: Props) {
  return (
    <label className={row}>
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

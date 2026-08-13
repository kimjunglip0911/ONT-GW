export function cx(...a: Array<string | false | undefined>) {
  return a.filter(Boolean).join(" ");
}

const ALLOW = new Set(["p", "br", "strong", "em", "u", "ul", "ol", "li"]);

/** 태그를 뺀 본문 글자 */
export function textOf(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dropBad(raw: string) {
  return raw
    .replace(/<(script|style|iframe|object|embed)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?(script|style|iframe|object|embed|link|meta)\b[^>]*>/gi, "")
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function keepTag(slash: string, name: string, attrs: string) {
  const tag = name.toLowerCase();
  if (!ALLOW.has(tag)) return "";
  if (slash) return `</${tag}>`;
  if (tag === "br") return "<br>";
  const align = /text-align\s*:\s*(left|center|right)/i.exec(attrs);
  if (align && (tag === "p" || tag === "li")) {
    return `<${tag} style="text-align:${align[1].toLowerCase()}">`;
  }
  return `<${tag}>`;
}

/** 허용 태그만 남긴다 */
export function cleanHtml(raw: string) {
  return dropBad(raw).replace(
    /<(\/?)([a-z0-9]+)([^>]*)>/gi,
    (_, slash: string, name: string, attrs: string) => keepTag(slash, name, attrs),
  );
}

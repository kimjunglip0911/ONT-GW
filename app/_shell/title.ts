/** 경로에 맞는 페이지 제목 */
export function pageName(path: string) {
  if (path.startsWith("/attend")) return "근태 확인";
  if (path.startsWith("/admin")) return "관리자";
  return "공지";
}

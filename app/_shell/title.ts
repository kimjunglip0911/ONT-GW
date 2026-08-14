/** 경로에 맞는 페이지 제목 */
export function pageName(path: string) {
  if (path.startsWith("/admin/users")) return "사용자 등록 & 조회";
  if (path.startsWith("/admin/pay")) return "급여 세팅";
  if (path.startsWith("/admin/notice")) return "공지사항 등록";
  if (path.startsWith("/admin/attend")) return "근태 관리";
  if (path.startsWith("/admin")) return "관리자";
  if (path.startsWith("/attend")) return "근태 확인";
  return "공지";
}

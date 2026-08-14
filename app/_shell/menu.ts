export type NavItem = {
  href: string;
  label: string;
  icon: "notice" | "attend" | "admin" | "user" | "pay" | "post" | "time";
  kids?: NavItem[];
};

export const STAFF: NavItem[] = [
  { href: "/notice", label: "공지", icon: "notice" },
  { href: "/attend", label: "근태", icon: "attend" },
];

export const ADMIN_KIDS: NavItem[] = [
  { href: "/admin/users", label: "사용자 등록 & 조회", icon: "user" },
  { href: "/admin/notice", label: "공지사항 등록", icon: "post" },
  { href: "/admin/attend", label: "근태 관리", icon: "time" },
  { href: "/admin/pay", label: "환경 설정", icon: "pay" },
];

const ADMIN_ITEM: NavItem = {
  href: "/admin",
  label: "관리자",
  icon: "admin",
  kids: ADMIN_KIDS,
};

/** 권한에 맞는 메뉴 목록 */
export function navList(admin: boolean) {
  return admin ? [...STAFF, ADMIN_ITEM] : STAFF;
}

/** 허브는 완전 일치, 나머지는 접두 일치 */
export function pathOn(path: string, href: string, exact?: boolean) {
  if (exact) return path === href;
  return path === href || path.startsWith(`${href}/`);
}

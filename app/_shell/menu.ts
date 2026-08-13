export type NavItem = {
  href: string;
  label: string;
  icon: "notice" | "attend" | "admin";
};

export const STAFF: NavItem[] = [
  { href: "/notice", label: "공지", icon: "notice" },
  { href: "/attend", label: "근태", icon: "attend" },
];

const ADMIN_ITEM: NavItem = {
  href: "/admin",
  label: "관리자",
  icon: "admin",
};

/** 권한에 맞는 메뉴 목록 */
export function navList(admin: boolean) {
  return admin ? [...STAFF, ADMIN_ITEM] : STAFF;
}

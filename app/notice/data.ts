export type Notice = {
  id: string;
  date: string;
  kind: "긴급" | "일반";
  title: string;
};

export const ITEMS: Notice[] = [
  {
    id: "1",
    date: "2026-08-13",
    kind: "긴급",
    title: "내일 오전 설비 점검으로 입출고가 지연됩니다",
  },
  {
    id: "2",
    date: "2026-08-12",
    kind: "일반",
    title: "8월 안전교육 일정을 확인하세요",
  },
  {
    id: "3",
    date: "2026-08-11",
    kind: "일반",
    title: "구내식당 이번 주 메뉴가 게시되었습니다",
  },
  {
    id: "4",
    date: "2026-08-08",
    kind: "긴급",
    title: "폭염 대응 근무 수칙을 준수해 주세요",
  },
  {
    id: "5",
    date: "2026-08-05",
    kind: "일반",
    title: "주차장 공사로 임시 출입로를 이용합니다",
  },
];

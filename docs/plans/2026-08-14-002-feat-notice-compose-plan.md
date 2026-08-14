---
title: "feat: 공지 등록과 직원 목록 연결"
date: 2026-08-14
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-brainstorm
execution: code
---

# feat: 공지 등록과 직원 목록 연결

관리자가 `/admin/notice`에서 제목·구분·고정 일수·본문을 등록하면 `public.notices`에 저장되고, 직원 `/notice` 목록에 바로 나타난다. 목록은 제목만 보이다가 누르면 본문이 펼쳐진다.

**Product Contract preservation:** 브레인스토름에서 확정한 범위를 그대로 둔다.

## Goal Capsule

- **목표:** 관리자가 게시판형 작성 화면에서 공지를 올리면, 직원이 같은 글을 공지 페이지에서 보고 펼쳐 읽는다.
- **권한:** 쓰기는 관리자만. 읽기는 로그인한 직원·관리자.
- **중단 조건:** 공지 수정·삭제, 글자 색·사진·표, 상세 URL, 푸시/메일, 목업 5건 유지.

## Product Contract

### Summary

관리자 작성 화면은 내용 영역 전체 폭을 쓰고, 본문 위에 Word식 도구(굵게·기울임·밑줄·목록·정렬)가 있다. 등록은 DB에 남고 직원 목록에 즉시 반영된다.

### Key Decisions

- DB 저장. `(session-settled: user-directed — chosen over 세션 목업: 고정 기간이 새로고침·다른 사람에도 남아야 함)` Governs R5, R8
- 이번 범위에 꾸미기·구분·고정 포함. `(session-settled: user-directed — chosen over 제목·본문만)` Governs R1–R4
- 고정 단위는 일. `(session-settled: user-directed — chosen over 시간)` Governs R3, R8
- 목록에서 펼쳐 본문 보기. `(session-settled: user-directed — chosen over 상세 페이지·전체 본문 노출)` Governs R6
- 목업 5건 삭제. `(session-settled: user-directed — chosen over 씨드 유지)` Governs R7

### Requirements

- R1. 작성 영역은 메인 좌우 패딩만 남기고 가로를 가득 쓴다.
- R2. 필드 순서는 제목, 구분(중요/일반), 최상단 고정 기간(0 이상 정수), 본문, 등록이다.
- R3. 고정 기간은 일 수다. 비움 또는 0이면 고정하지 않는다.
- R4. 본문 바로 위에 굵게·기울임·밑줄·글머리/번호 목록·좌/중/우 정렬 도구가 있다.
- R5. 관리자만 등록할 수 있다. 제목과 본문(태그 제거 후)이 비면 저장하지 않는다.
- R6. 직원 공지는 제목·구분·날짜를 보여주고, 행을 누르면 해당 본문이 펼쳐진다.
- R7. 목업 5건은 보이지 않는다. 글이 없으면 빈 안내만 보여 준다.
- R8. 고정 만료 전인 글이 목록 맨 위이고, 그다음이 최신 등록순이다.
- R9. 구분은 `중요`와 `일반`만 쓴다.

### Scope Boundaries

하지 않음: 등록 후 수정·삭제, 글자 색·사진·표·글꼴, 공지 상세 URL, 알림, 임시저장, 허브 카드의 목업 문구 정리.

## Planning Contract

- KTD1. 테이블 `public.notices`: `id`, `title`, `kind`, `body`, `pin_until`, `created_at`. 고정 일수는 저장 시 `now + days`로만 계산한다.
- KTD2. RLS를 켜고 anon/authenticated 정책은 두지 않는다. 앱은 secret 키만 쓴다.
- KTD4. `isAdmin()` 후 `revalidatePath("/notice")`와 `"/admin/notice"`.
- KTD5. Tiptap 편집. 저장 전 허용 태그만 남긴다.
- KTD6. 도구 모음은 제목·구분·고정 아래, 본문 바로 위.
- KTD7. `rank.ts`에서 고정 중인 글을 위로, 같으면 최신순.
- KTD10. 파일당 50행, 이름 10자/함수 15자, 주석·커밋 한글.

## Implementation Units

### U1. notices 테이블과 DB 접근
`app/_db/note.ts`, `notes.ts`, `rank.ts`, `rank.test.ts`, `asnote.ts`, `app/notice/data.ts`

### U2. 전체 폭 작성 폼
`app/admin/notice/page.tsx`, `form.tsx`, `meta.tsx`

### U3. 본문 도구 모음
`app/admin/notice/edit.tsx`, `tools.tsx`, `package.json`

### U4. 등록 액션과 HTML 정제
`app/admin/notice/save.ts`, `app/_db/html.ts`, `html.test.ts`

### U5. 직원 공지 목록
`app/notice/page.tsx`, `list.tsx`, `item.tsx`

### U6. README와 트리
`README.md`, `.cursor/rules/project-structure.mdc`, 이 파일

## Verification Contract

- `npm test`
- 관리자로 등록하면 `/notice`에 제목·펼친 본문이 보인다.

## Definition of Done

R1–R9가 코드와 README에 있고, 목업 5건과 `긴급` 라벨이 없다.

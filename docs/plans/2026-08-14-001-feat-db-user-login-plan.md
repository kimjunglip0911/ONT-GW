---
title: "feat: 등록 사용자 로그인"
date: 2026-08-14
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# feat: 등록 사용자 로그인

`public.users`의 아이디·비밀번호로 로그인하고, 임시 `ADMIN` 계정은 제거한다. 아이디의 `ONT`는 대소문자와 관계없이 대문자로 정규화한다. `role`이 관리자면 관리자 메뉴와 `/admin`을 열고, 직원이면 공지·근태만 쓴다. 로그인하지 않으면 업무 화면에 들어가지 못한다.

**Product Contract preservation:** Product Contract unchanged (ce-plan-bootstrap).

## Goal Capsule

- **목표:** 등록된 사용자만 로그인할 수 있고, 권한에 맞는 화면만 보이며, 아이디 입력의 `ONT`가 항상 대문자가 된다.
- **중단 조건:** Supabase Auth, 비밀번호 해시, 시도 제한, 재설정은 하지 않는다.

## Product Contract

### Requirements

- **R1.** `public.users`의 `uid`와 `pass`가 맞으면 로그인된다.
- **R2.** 로그인 아이디의 `ONT`는 대문자로 맞춘 뒤 조회한다.
- **R3.** `role`이 `관리자`이면 관리자 메뉴와 `/admin`에 들어간다.
- **R4.** `role`이 `직원`이면 공지·근태만 쓰고 `/admin`에는 들어가지 못한다.
- **R5.** 공지·근태를 포함한 업무 화면은 로그인 후에만 볼 수 있다.
- **R6.** `ADMIN` / `ADMIN_PASS` 임시 로그인은 제거한다.
- **R7.** 로그인 실패 메시지는 계정 존재 여부를 구분하지 않는다.

### Scope Boundaries

하지 않음: 비밀번호 해시, Supabase Auth, 세션 중 DB role 재조회, 셸에 이름 표시, 쿠키에 uid 저장.

## Planning Contract

- **KTD1.** 공개 경로는 `/login`.
- **KTD2.** 쿠키 `gw_role` 값은 `admin` | `staff`.
- **KTD3.** 임시 ADMIN 로그인 제거.
- **KTD4.** 아이디는 trim 후 `toUpperCase`.
- **KTD5.** 로그인 조회는 `app/_db/find.ts`. 목록 `COLS`에 `pass` 없음.
- **KTD6.** `proxy.ts`가 업무 경로를 막는다. API 로그인·로그아웃은 통과.
- **KTD7.** 안전한 `next`가 있으면 그곳, 없으면 직원 `/notice`, 관리자 `/admin`.
- **KTD8.** 비밀번호는 저장된 값과 비교.
- **KTD9.** 쿠키 httpOnly, sameSite=lax, 7일, 프로덕션만 secure.
- **KTD10.** 셸 모달 제거. 로그아웃 문구는 `로그아웃`.

## Implementation Units

### U1. 아이디 정규화
`app/_auth/fold.ts`, `fold.test.ts`

### U2. DB 로그인과 세션 쿠키
`app/_db/find.ts`, `app/_auth/check.ts`, `cookie.ts`, `role.ts`, `names.ts`, `app/api/login/route.ts`

### U3. proxy와 `/login`
`proxy.ts`, `app/_auth/gate.ts`, `app/login/`

### U4. 셸 세션 UX
`app/layout.tsx`, `app/_shell/*` 모달 제거

### U5. README와 트리
`README.md`, `.cursor/rules/project-structure.mdc`, `.cursor/rules/rules.mdc`

## Verification Contract

- `npm test`
- 비로그인 `/notice` → `/login`
- `ADMIN` 계정은 실패
- `npm run lint`

## Definition of Done

R1–R7이 코드와 README에 반영되고, 임시 ADMIN 경로가 없다.

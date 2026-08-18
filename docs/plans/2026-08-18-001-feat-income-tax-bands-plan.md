---
title: "feat: 근로소득세 구간 세율"
date: 2026-08-18
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# 근로소득세 구간 세율

**Product Contract preservation:** 이번 플랜에서 Product Contract를 새로 작성함 (`ce-plan-bootstrap`).

## Goal Capsule

- **목표:** 환경 설정에서 근로소득세 단일 %를 과세구간 세율 8칸으로 바꾸고, 월급×12로 구간을 고른 뒤 그 세율만 쓰는 조회를 둔다. 지방소득세 % 칸은 유지하고 기본 10%이며, 근로소득세 세액에 곱한다.
- **권한:** 화면·쓰기는 지금처럼 관리자만.
- **중단 조건:** 근태 화면에 공제 연결, 간이세액표, 누진·누진공제 계산, 구간 금액(lo/hi) 편집, 구간 추가·삭제, 4대보험 요율 변경.

## Product Contract

### Summary

환경 설정에서 근로소득세 단일 %를 과세구간 세율 8칸으로 바꾸고, 월급×12로 구간을 고른 뒤 그 세율만 쓴다. 지방소득세 % 칸은 유지·기본 10%이며 근로소득세 세액에 곱한다. 근태 화면 연결은 다음이다.

### Key Decisions

- 월급 × 12로 연환산한 뒤 구간 매칭. `(session-settled: user-directed — chosen over 월급 숫자 그대로: 구간 표가 연간 기준이라 월급을 그대로 넣으면 거의 모두 6%가 됨)` Governs R4, R5
- 해당 구간 세율만 연환산 금액 전체에 적용. `(session-settled: user-directed — chosen over 누진+누진공제: 구현을 단순히 함)` Governs R4
- 지방소득세 % 칸 유지·기본 10%, 근로소득세 세액에 곱함. `(session-settled: user-directed — chosen over 입력칸 제거: 요율은 고칠 수 있게 두고 계산 베이스만 세액으로 고정)` Governs R6
- 이번엔 환경 설정 8칸 + 월급→세율 조회까지. 근태 연결은 다음. `(session-settled: user-approved — chosen over 환경 설정 8칸만)` Governs R5

### Requirements

- R1. 관리자만 구간 세율을 읽고 저장한다. 실패 시 안내하고 목록을 비운다.
- R2. 근로소득세 단일 % 입력칸은 없다. 과세구간 세율 8칸이 그 자리다.
- R3. 구간 금액(lo/hi)은 고정이다. 세율만 고친다. 구간 추가·삭제는 없다.
- R4. 월급×12로 구간을 고르고, 그 구간 세율만 쓴다. 누진공제는 계산에 쓰지 않는다.
- R5. 조회는 월급 숫자를 받는다. 근태 화면에는 연결하지 않는다.
- R6. 지방소득세 % 칸은 유지한다. 씨드·기본은 10%다. 월급이 아니라 근로소득세 세액에 곱한다.
- R7. 4대보험 이름·요율 칸은 그대로 둔다.
- R8. 구간 세율은 전 직원 공통이다. 사람마다 달라 보이는 이유는 월급이 달라 구간이 달라지기 때문이다.

### Actors / Flows / Acceptance

- A1. 관리자 — 환경 설정 세금 영역.
- F1. 구간 세율 저장 → 새로고침 후에도 같다.
- F2. 조회에 월급을 넣으면 구간 세율과 월 세액을 돌려준다. UI 없음.
- AE1. 월급 3,000,000 → 연환산 36,000,000 → 15% 구간. 월 근로소득세 450,000. 지방소득세 10%면 45,000.
- AE2. 월급 1,000,000 → 연환산 12,000,000 → 6%. 월 근로소득세 60,000.
- AE3. 연환산 14,000,000 → 6% (1,400만 원 이하).
- AE4. 연환산 14,000,001 → 15% (1,400만 원 초과).
- AE5. 연환산 1,000,000,001 → 45% (10억 원 초과).
- AE6. 월급 0·음수·숫자가 아니면 세율 0, 세액 0.

### Scope Boundaries

하지 않음: 근태·급여 명세서에 실제 공제, 간이세액표, 누진·누진공제 산출, 구간 lo/hi 편집, 구간 행 추가·삭제, 4대보험 변경, 사람별 세율 수동 입력.

#### Deferred to Follow-Up Work

근태 관리에서 월급 숫자를 조회에 넣고 공제한다. 그때 기본급인지 실지급인지는 근태 플랜에서 정한다.

## Planning Contract

- KTD1. `public.bands` 8행을 재사용한다. 새 테이블 없음. 세율(`rate`)만 고친다. `lo`/`hi`/`cut`/`ord`는 그대로. Governs R2, R3
- KTD2. 구간 매칭은 [app/_db/won.ts](app/_db/won.ts) `spanOf`와 같게: 첫 구간은 `year <= hi`, 가운데는 `lo < year <= hi`, 마지막(`hi` 없음)은 `year > lo`. Governs R4. Covers AE3, AE4, AE5
- KTD3. 월 근로소득세 = `floor(월급 × 세율 / 100)`. 연환산은 구간을 고를 때만 쓴다. 지방소득세 = `floor(월 근로소득세 × 지방소득세율 / 100)`. Governs R4, R6. Covers AE1
- KTD4. 근로소득세 `taxes` 행은 DB에 남긴다. 목록 UI에서는 이름 `근로소득세`를 숨겨 % 칸이 안 나오게 한다. 계산은 `bands.rate`만 쓴다. Governs R2
- KTD5. 누진공제(`cut`)는 DB에 남기고 화면·계산에서는 뺀다. 단순 구간 세율은 실세법(누진·간이세액표)과 다르다 — 사용자 선택이며 법 정합이 아니다. Governs R4
- KTD6. 밴드 쓰기는 [app/_db/taxed.ts](app/_db/taxed.ts) / [app/admin/pay/taxact.ts](app/admin/pay/taxact.ts)와 같다: `isAdmin` → 저장 → `revalidatePath("/admin/pay")`. 행마다 저장. 삭제·추가는 없다. Governs R1, R3
- KTD7. 조회는 순수 함수로 [app/_db/fit.ts](app/_db/fit.ts)에 둔다. 인자는 월급 숫자와 구간 목록. `users.pay`에 아직 묶지 않는다. Governs R5
- KTD8. 지방소득세 씨드가 이미 10%면 마이그레이션하지 않는다. 안내 문구는 하드코드 10%를 쓰지 않고 세금 목록의 지방소득세 요율을 따른다. Governs R6
- KTD9. 파일당 50행, 식별자 10자/함수 15자, 주석·플랜·커밋 한글.

### High-Level Technical Design

```mermaid
flowchart LR
  month[월급]
  year[연환산]
  band[구간매칭]
  rate[구간세율]
  inc[월근로소득세]
  loc[월지방소득세]
  month --> year --> band --> rate
  month --> inc
  rate --> inc
  inc --> loc
```

구간을 고를 때만 월급×12를 쓴다. 월 세액은 월급×세율이다.

## Implementation Units

### U1. 월급→구간 세율 조회

**Goal:** 월급과 구간 목록으로 세율·월 세액을 구한다.

**Requirements:** R4, R5, R6, F2, AE1–AE6

**Dependencies:** 없음

**Files:**
- 신규 [app/_db/fit.ts](app/_db/fit.ts)
- 신규 [app/_db/fit.test.ts](app/_db/fit.test.ts)

**Approach:**
1. 연환산·구간 찾기·세율·월 근로소득세·월 지방소득세를 순수 함수로 나눈다. 이름은 15자 안.
2. 매칭은 KTD2. 목록이 비었거나 월급이 유효하지 않으면 세율 0.
3. 원 단위는 기존 시급처럼 버린다 (KTD3).
4. `cut`은 읽지 않는다.

**Execution note:** 조회는 테스트 먼저 작성한다. 화면보다 경계값이 핵심이다.

**Patterns to follow:** [app/_db/won.ts](app/_db/won.ts), [app/_db/wage.ts](app/_db/wage.ts) 버림.

**Test scenarios:**
- Covers AE1. 월급 3,000,000과 씨드 구간 → 세율 15, 월 근로소득세 450,000. 지방 10% → 45,000
- Covers AE2. 월급 1,000,000 → 세율 6, 월 60,000
- Covers AE3. 연환산 14,000,000 → 6%
- Covers AE4. 연환산 14,000,001 → 15%
- Covers AE5. 연환산 1,000,000,001 → 45%
- Covers AE6. 월급 0·-1·NaN → 세율 0, 세액 0
- 구간 목록 빈 배열 → 세율 0

**Verification:** `npm test`에서 `fit.test.ts`가 통과한다.

### U2. 구간 세율 저장

**Goal:** 관리자가 밴드 세율만 고치고 DB에 남긴다.

**Requirements:** R1, R3, F1

**Dependencies:** 없음

**Files:**
- 신규 [app/_db/banded.ts](app/_db/banded.ts)
- 신규 [app/admin/pay/bandact.ts](app/admin/pay/bandact.ts)
- 신규 [app/admin/pay/bandact.test.ts](app/admin/pay/bandact.test.ts)

**Approach:**
1. `rate`만 업데이트한다. `okRate`로 0–100.
2. 서버 액션은 `onSetBand`. `isAdmin` 뒤에 쓴다.
3. `lo`/`hi`/`cut`를 받는 입력은 만들지 않는다.

**Patterns to follow:** [app/_db/taxed.ts](app/_db/taxed.ts), [app/admin/pay/taxact.ts](app/admin/pay/taxact.ts), [app/admin/pay/taxact.test.ts](app/admin/pay/taxact.test.ts)

**Test scenarios:**
- `bandact.ts` 소스에서 `isAdmin`이 쓰기보다 앞에 있다
- `okRate` 밖 요율은 거절한다 (기존 `okRate` 테스트 재사용 가능)

**Verification:** 관리자가 아니면 저장이 거절된다. `npm test` 통과.

### U3. 세금 화면 8칸

**Goal:** 근로소득세 % 칸을 없애고 구간 세율 8칸을 고치게 한다.

**Requirements:** R1, R2, R3, R6, R7, F1

**Dependencies:** U2

**Files:**
- [app/admin/pay/bands.tsx](app/admin/pay/bands.tsx)
- 신규 [app/admin/pay/bandrow.tsx](app/admin/pay/bandrow.tsx)
- [app/admin/pay/taxs.tsx](app/admin/pay/taxs.tsx)
- 신규 [app/admin/pay/taxs.test.ts](app/admin/pay/taxs.test.ts) 또는 소스 가드 테스트
- [app/_shell](app/_shell) 불필요. 트리만 U4

**Approach:**
1. `Bands`를 읽기 표에서 행마다 `Pct` + 저장으로 바꾼다. 구간 라벨은 `spanOf`. 삭제 버튼 없음. 누진공제 열 없음.
2. `taxs.tsx`는 이름이 `근로소득세`인 행을 목록에서 뺀다 (KTD4). `TAXES[0]`과 같은 문자열.
3. 안내 문구는 연환산·해당 구간 세율만·지방소득세는 세액×요율. 하드코드 10% 삭제 (KTD8).
4. 4대보험·지방소득세 `TaxRow`는 그대로.

**Patterns to follow:** [app/admin/pay/taxrow.tsx](app/admin/pay/taxrow.tsx), [app/admin/pay/pct.tsx](app/admin/pay/pct.tsx), [app/admin/notice/form.test.ts](app/admin/notice/form.test.ts) 소스 가드

**Test scenarios:**
- `taxs.tsx`가 `근로소득세` 행을 목록에서 걸러 낸다
- `bands.tsx`에 누진공제 열이 없다
- `bandrow`에 삭제 버튼이 없다

**Verification:** `/admin/pay` 세금 영역에 % 8칸이 있고 근로소득세 단일 %가 없다. 새로고침 후 세율이 유지된다.

### U4. README와 트리

**Goal:** 근로소득세가 구간 세율임을 문서와 트리에 맞춘다.

**Requirements:** R2, R4, R5, R6

**Dependencies:** U3

**Files:**
- [README.md](README.md)
- [.cursor/rules/project-structure.mdc](.cursor/rules/project-structure.mdc)

**Approach:**
1. README 목적 문단에 근로소득세는 `bands` 세율, 월급×12 매칭, 지방소득세는 세액×요율, 근태 미연결을 반영한다.
2. 트리에 `fit.ts`, `banded.ts`, `bandact.ts`, `bandrow.tsx`를 넣고 `bands.tsx` 주석을 세율 편집으로 바꾼다.

**Test expectation:** none — 문서만.

**Verification:** 트리 파일이 실제 경로와 같다.

## Verification Contract

- `npm test`
- 관리자로 `/admin/pay`에서 구간 세율 저장 후 새로고침
- 근로소득세 단일 % 칸이 없고 지방소득세·4대보험 % 칸은 있다
- 직원 계정으로 `/admin/pay` 불가 (기존 proxy)

## Definition of Done

- 과세구간 세율 8칸이 저장된다.
- 월급→세율·세액 조회가 테스트로 고정되어 있고 근태 UI에는 안 붙는다.
- 근로소득세 단일 %가 계산·화면에 없다.
- 지방소득세 % 칸은 있고 세액에 곱하는 식이 조회에 있다.
- README·트리가 화면과 같다.

## Appendix

- 기존 밴드 씨드(원격): 1,400만 6% … 10억 초과 45%. `cut` 컬럼은 남아 있으나 이번 계산에 안 쓴다.
- `docs/solutions/` 없음. 구현 후 학습 기록이 있으면 그때 남긴다.
- 외부 세법 조사는 하지 않음. 단순 구간 세율이 이미 확정됨.

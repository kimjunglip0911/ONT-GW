# ONT-GW

## 목적

Kuehne+Nagel 그룹웨어 웹앱. Next.js 풀스택만 사용한다. 별도 백엔드 프레임워크는 없다.

디자인 초안 셸이 있다. 직원 페이지는 공지(`/notice`), 근태 확인(`/attend`)이다. 관리자는 `/admin` 허브에서 사용자 등록 & 조회, 공지사항 등록, 근태 관리, 환경 설정 화면으로 들어간다. 사용자 등록 & 조회는 Supabase `public.users`에 저장한다. 한 화면에 등록 폼, 이름·ID 조회, 목록이 있고, 엑셀 양식 다운로드와 업로드가 있다. 자동 ID(`ONT000001`부터)와 기본급·기본 시급·식대·유류비·기타급여 1–2를 받는다. 단건 등록 폼은 환경 설정의 기본 급여 패키지(기본급·시급·식대·유류비)로 칸을 채운다. 시급은 기본급÷월 소정근로시간을 원 단위로 버린 값이고, 관리자가 고치면 그 숫자가 저장된다. 엑셀 업로드는 패키지를 쓰지 않는다. 등록·엑셀은 비밀번호를 받지 않고 `1234`를 넣는다. 목록에서 행을 수정·삭제할 수 있다. ID는 고칠 수 없고, 비밀번호는 행 수정으로 바꾸지 않는다. 목록 `PW` 칸의 초기화만 `1234`로 되돌린다. 초기화하거나 계정을 지우면 그 아이디로 이미 들어와 있던 세션도 끊긴다. 공지 등록은 `public.notices`에 저장한다. 환경 설정(`/admin/pay`)은 세금 공제·급여 패키지·권한 역할을 `public.taxes`·`public.packs`·`public.perms`에 저장한다. 권한 역할은 저장만 하고, 메뉴·`proxy`는 기존 `role`(관리자·직원)을 따른다. 작성 화면은 내용 영역 전체 폭을 쓰고, 제목·중요/일반·고정 일수·본문(굵게·기울임·밑줄·목록·정렬·색·크기)을 받는다. 직원 공지는 제목을 누르면 본문이 펼쳐진다. 고정 기간이 남은 글이 맨 위다. 로그인은 등록된 아이디·비밀번호로 한다. 저장된 값이 `1234`이면 역할 쿠키 없이 닫을 수 없는 창에서 새 비밀번호를 저장해야 들어간다. 새 값으로 `1234`는 받지 않는다. 아이디·비밀번호 찾기는 없고, 잊어버리면 관리자에게 문의한다. `ONT`는 대소문자와 관계없이 대문자로 맞춘다. `role`이 관리자면 관리자 메뉴가 열리고, 직원이면 공지·근태만 쓴다. 로그인하지 않으면 `/login`으로 보낸다.

## 실행 방법

Node.js 24와 npm이 필요하다.

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 연다. 비로그인이면 `/login`으로 보낸다. 로그인한 뒤에는 루트가 `/notice`로 간다.

| 명령 | 용도 |
|:---|:---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint |
| `npm test` | 로그인·사용자·공지·환경 설정 단위 테스트 |

노트북에서는 왼쪽 아이콘 레일에 마우스를 올리면 메뉴가 펼쳐진다. 휴대폰 폭에서는 상단 메뉴 버튼을 쓴다.

로그인 아이디는 사용자 등록에서 만든 `ONT000001` 형식이다. 처음 비밀번호는 `1234`이고, 확인한 뒤 바꾼 값으로만 다시 들어간다. 펼친 메뉴에서 관리자를 누르면 하위 네 항목이 나온다. 아이콘 레일의 관리자는 `/admin` 허브로 간다. 직원 계정이 `/admin`으로 오면 공지로 보낸다.

## 환경 변수

값은 프로젝트 루트 `.env.local`에 적는다. Git에 올리지 않는다.

| 변수 | 넣을 값 | 대시보드 위치 |
|:---|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | Connect 또는 Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_...`). 없으면 레거시 `anon` | Settings → API Keys |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_...`). 없으면 레거시 `service_role` | Settings → API Keys |

`SUPABASE_SECRET_KEY`는 서버 전용이다. `NEXT_PUBLIC_`을 붙이지 않는다.

## 주의사항

- `typescript`는 7이다. `next build`가 `tsc`를 찾는다. ESLint는 JS Compiler API가 필요해서 `@typescript/typescript6`와 `ts6hook.cjs`로 6 API를 쓴다.
- `next.config.ts`에서 `experimental.useTypeScriptCli`를 `false`로 두면 TypeScript 7과 함께 `next build`가 실패할 수 있다.
- 패키지 매니저는 npm만 사용한다. pnpm/yarn은 쓰지 않는다.
- DB는 Supabase다. 키는 `.env.local`에만 둔다. `SUPABASE_SECRET_KEY`는 브라우저·채팅·커밋에 넣지 않는다. 사용자·공지·환경 설정은 이 키로 서버에서만 `public.users`·`public.notices`·`public.taxes`·`public.packs`·`public.perms`를 읽고 쓴다.
- 회사망(Zscaler)에서는 Node가 DB HTTPS를 거부할 수 있다. `.ca/zs.pem`이 있으면 `npm run dev`가 그 인증서를 쓴다.
- 관리자 화면을 쓰려면 DB에 `role`이 관리자인 사용자가 한 명 이상 있어야 한다. 예전 `ADMIN` / `ADMIN_PASS` 임시 계정은 쓰지 않는다.
- 로그인 쿠키는 `gw_role`과 `gw_uid`다. 비밀번호를 초기화하거나 계정을 지우면 다음 페이지에서 그 세션은 끊긴다.

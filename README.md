# ONT-GW

## 목적

Kuehne+Nagel 그룹웨어 웹앱. Next.js 풀스택만 사용한다. 별도 백엔드 프레임워크는 없다.

디자인 초안 셸이 있다. 직원 페이지는 공지(`/notice`), 근태 확인(`/attend`)이다. 관리자는 `/admin` 허브에서 사용자 등록, 급여 세팅, 공지사항 등록, 근태 관리 목업으로 들어간다. CRUD와 Supabase 인증은 아직 없다.

## 실행 방법

Node.js 24와 npm이 필요하다.

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 연다. 루트는 `/notice`로 보낸다.

| 명령 | 용도 |
|:---|:---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint |

노트북에서는 왼쪽 아이콘 레일에 마우스를 올리면 메뉴가 펼쳐진다. 휴대폰 폭에서는 상단 메뉴 버튼을 쓴다.

임시 관리자 아이디는 `ADMIN`이다. 비밀번호는 `.env.local`의 `ADMIN_PASS`다. 이 계정으로만 관리자 메뉴가 보인다. 펼친 메뉴에서 관리자를 누르면 하위 네 항목이 나온다. 아이콘 레일의 관리자는 `/admin` 허브로 간다. 비관리자가 `/admin`으로 오면 공지로 보낸다.

## 환경 변수

값은 프로젝트 루트 `.env.local`에 적는다. Git에 올리지 않는다.

| 변수 | 넣을 값 | 대시보드 위치 |
|:---|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | Connect 또는 Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_...`). 없으면 레거시 `anon` | Settings → API Keys |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_...`). 없으면 레거시 `service_role` | Settings → API Keys |
| `ADMIN_PASS` | 임시 관리자 비밀번호 | 로컬만. 디자인 초안용 |

`SUPABASE_SECRET_KEY`는 서버 전용이다. `NEXT_PUBLIC_`을 붙이지 않는다.

## 주의사항

- `typescript`는 7이다. `next build`가 `tsc`를 찾는다. ESLint는 JS Compiler API가 필요해서 `@typescript/typescript6`와 `ts6hook.cjs`로 6 API를 쓴다.
- `next.config.ts`에서 `experimental.useTypeScriptCli`를 `false`로 두면 TypeScript 7과 함께 `next build`가 실패할 수 있다.
- 패키지 매니저는 npm만 사용한다. pnpm/yarn은 쓰지 않는다.
- DB는 Supabase다. 키는 `.env.local`에만 둔다. `SUPABASE_SECRET_KEY`는 브라우저·채팅·커밋에 넣지 않는다.
- `ADMIN_PASS`도 `.env.local`에만 둔다. 이후 계정별 권한은 DB로 옮긴다.

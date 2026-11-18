# AGENTS.md — AI 에이전트 작업 지침 (Rules)

이 문서는 StudyFlow 프로젝트에 참여하는 모든 AI 에이전트(Coordinator, Agent A, Agent B, Agent C, Agent D)가 반드시 준수해야 하는 규칙을 정의합니다.

## 1. 단일 진실 공급원 (Single Source of Truth)
- 모든 화면 구성, 레이아웃 수치, 색상 토큰, 컴포넌트 명칭은 루트의 `DESIGN.md`를 절대 기준으로 삼습니다.
- 폴더 구조와 실행 방법은 `README.md`를 따릅니다.

## 2. 역할 및 워크트리 격리 규칙
- **Agent A (`../studyflow-ui`, `feature/ui`)**: `components/` 내 공통 UI(`Header`, `Sidebar`, `Card`, `CourseCard`, `ProgressBar`, `TaskItem`)만 구현합니다.
- **Agent B (`../studyflow-dashboard`, `feature/dashboard`)**: 대시보드 화면(`app/page.tsx`, `app/dashboard/page.tsx`)만 구현하며 공통 UI를 재사용합니다.
- **Agent C (`../studyflow-courses`, `feature/courses`)**: 강의 목록(`app/courses/page.tsx`), 과목 상세(`app/courses/[id]/page.tsx`), 할 일(`app/tasks/page.tsx`), 질문(`app/questions/page.tsx`) 화면을 구현하며 공통 UI를 재사용합니다.
- **Agent D (`../studyflow-qa`, `feature/qa`)**: 빌드 오류, 깨진 링크, 반응형 레이아웃, `DESIGN.md` 불일치, 콘솔 오류를 점검하고 `Critical` · `Major` · `Minor` 3단계로 등급화하여 보고합니다.

## 3. 금지 사항 (Prohibitions)
- **절대 금지**: 자신의 담당 워크트리 및 허용된 디렉터리 범위 밖의 파일을 임의로 수정하거나 삭제하지 마십시오.
- **절대 금지**: `DESIGN.md`에 정의되지 않은 임의의 색상 팔레트나 컴포넌트 이름을 마음대로 생성하지 마십시오.
- **절대 금지**: `.env`, 개인 토큰(PAT), `node_modules/`, `.next/` 빌드 산출물을 Git에 커밋하지 마십시오.
- **절대 금지**: QA 에이전트(Agent D)는 최초 점검 시 승인 없이 코드를 바로 수정하지 말고, 먼저 등급화된 문제 목록(QA 리포트)을 출력한 뒤 수정 루프(보고 → 승인 → 수정 → 재검증)를 따르십시오.

## 4. 코딩 컨벤션 (Coding Conventions)
- Next.js App Router 및 TypeScript(`strict` 모드)를 사용합니다.
- 스타일링은 Tailwind CSS 유틸리티 클래스를 사용하며, 반응형(모바일/데스크톱) 레이아웃 깨짐이 없어야 합니다.
- 모든 네비게이션 링크(`next/link`)는 실제로 존재하는 라우트(`/`, `/dashboard`, `/courses`, `/courses/[id]`, `/tasks`, `/questions`)와 정확히 연결되어야 합니다.

## 5. 커밋 메시지 규약 (Commit Conventions)
의미 있는 작은 단위로 커밋하며 아래 접두사를 사용합니다:
- `feat: ...` — 새로운 기능 및 화면/컴포넌트 추가 (예: `feat: add dashboard layout`, `feat: implement course cards`)
- `fix: ...` — 버그 수정 및 QA 이슈 해결 (예: `fix: improve mobile navigation`)
- `docs: ...` — 문서(`README.md`, `DESIGN.md`, `AGENTS.md`, `QA_REPORT.md`) 추가 및 수정
- `chore: ...` — 프로젝트 초기 설정, 패키지 및 환경 구성

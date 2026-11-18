# QA_REPORT.md — StudyFlow 통합 QA 점검 리포트 (1차 점검)

- **점검 브랜치**: `feature/qa` (`studyflow-qa` 워크트리)
- **통합 대상 커밋**:
  - `31898df` (`feat: implement common UI components and layout shell` — Agent A)
  - `7015090` (`feat: add dashboard layout and progress summary` — Agent B)
  - `ba517a2` (`feat: implement course cards and course detail page` — Agent C)
  - `ecb5c89` (`feat: add tasks and questions pages` — Agent C)
- **점검 기준 문서**: `DESIGN.md`, `AGENTS.md`, `README.md`

---

## 1. 5대 핵심 항목 점검 요약 (5 Inspection Categories)

### ① `build error` (빌드 및 타입 체크)
- **점검 결과**: `npm run build` (`next build`) 실행 결과 **컴파일 및 TypeScript strict 타입 에러 0건**으로 정상 빌드 통과.
- **세부 확인**: `/`, `/dashboard`, `/courses`, `/courses/[id]`, `/tasks`, `/questions` 전 라우트 번들 생성 확인.

### ② `broken link` (네비게이션 및 라우트 연결성)
- **점검 결과**: `Sidebar`, `CourseCard`, `TaskItem`, `HomePage`, `DashboardPage`, `CoursesPage`, `CourseDetailPage`, `QuestionsPage` 내 모든 `next/link`의 `href`가 실제 존재하는 라우트(`/`, `/dashboard`, `/courses`, `/courses/[id]`, `/tasks`, `/questions`)와 정확히 매핑됨을 확인.
- **세부 확인**: `mockData.json`의 과목 ID(`course-1` ~ `course-4`)와 각 할 일·질문 데이터의 `courseId`가 모두 유효하게 연결됨.

### ③ `responsive layout` (모바일/데스크톱 반응형 레이아웃)
- **점검 결과**: 데스크톱 `Sidebar`(`md:w-[240px]`), 상단 `Header`(`h-[64px]`), 모바일 상단 가로 스크롤 네비게이션 바(`md:hidden`)가 정상 동작함.
- **발견 사항**:
  - `app/dashboard/page.tsx` 하단 "수강 중인 과목 현황" 섹션이 `grid-cols-1 gap-6 md:grid-cols-2`로만 선언되어 있어, `DESIGN.md` `02. 레이아웃`의 데스크톱 3열 그리드(`lg:grid-cols-3`) 규격과 불일치함.
  - 모바일(375px 이하) 환경에서 `AppShell`의 `main` 패딩이 고정 `p-6`으로만 설정되어 좁은 화면에서 가용 폭이 줄어드는 현상이 있음(`p-4 sm:p-6` 권장).

### ④ `DESIGN.md 불일치` (디자인 시스템·컴포넌트·컬러·빈 상태 문구 준수 여부)
- **점검 결과**:
  - **공통 컴포넌트 6종**: `Header`, `Sidebar`, `Card`, `CourseCard`, `ProgressBar`, `TaskItem` 명칭 및 파일 경로 일치.
  - **핵심 3색 팔레트**: Slate(`slate-900`/`slate-50`), Coral Orange(`orange-600`), Emerald Green(`emerald-600`) 및 상태 3단계(`시작 전`, `진행 중`, `완료`) 배지 컬러 준수.
  - **빈 화면 문구**: `"등록된 강의가 없습니다."`, `"오늘 예정된 할 일이 없습니다."`, `"등록된 질문이 없습니다."` 3종 모두 정확히 일치.
- **발견 사항**:
  - `DESIGN.md` `02. 레이아웃`은 `Header` 좌측에 **현재 페이지 타이틀/학사 일정 안내**를 표시하도록 규정했으나, `components/Header.tsx`는 현재 라우트(`pathname`)와 무관하게 고정 문자열(`"2026학년도 2학기 · 12주차 학습 현황"`)만 렌더링함.
  - `app/dashboard/page.tsx` 필터 탭 배지에 비표준 Tailwind 클래스 `py-0.2` 오타가 존재함.

### ⑤ `console error` (클라이언트 상태 동기화·하이드레이션·접근성 이슈)
- **점검 결과**:
  - **치명적 상태 불일치 (`Critical`)**: `Dashboard`(`/` 및 `/dashboard`), `Tasks`(`/tasks`), `CourseDetail`(`/courses/[id]`)에서 할 일(`TaskItem`) 체크박스를 토글해도 각 컴포넌트 내부 `useState`에서만 변경되어, 페이지 이동 시 상태가 초기화될 뿐만 아니라 같은 화면에 렌더링되는 `Header`("오늘 할 일 완료율 `%`")와 `Sidebar`("남은 할 일 `N`건" 배지)의 숫자가 전혀 갱신되지 않는 상태 불일치 버그가 발생함.
  - `app/courses/[id]/page.tsx`에서 `useState(() => data.tasks.filter(...))`로만 초기값을 설정하여 라우트 파라미터 `params.id`가 변경될 때 상태가 재동기화되지 않을 위험이 있음.
  - `app/dashboard/page.tsx`의 할 일 상태 필터 탭에 `role="tablist"`, `role="tab"`, `aria-selected` 접근성 속성이 누락됨.

---

## 2. 등급별 QA 이슈 목록 (`Critical` · `Major` · `Minor`)

| 등급 | 화면 | 증상 | 권장 수정 |
| :--- | :--- | :--- | :--- |
| **Critical** | `Dashboard` (`/`, `/dashboard`), `Tasks` (`/tasks`), `CourseDetail` (`/courses/[id]`), `Header`, `Sidebar` | 할 일(`TaskItem`) 체크박스를 클릭해 완료/진행 중 상태를 토글해도 각 페이지의 독립된 로컬 `useState`에서만 변경되어, 상단 `Header`의 오늘 할 일 완료율(`%`) 및 좌측 `Sidebar`의 남은 할 일 배지 숫자와 실시간 동기화되지 않으며 다른 페이지로 이동 시 변경 내역이 유실됨 (`CourseDetail`의 `params.id` 변경 시에도 `courseTasks` 미갱신) | 공통 할 일 상태 관리 스토어/훅(예: `localStorage` 및 커스텀 이벤트 기반 공유 훅)을 도입하여 `Dashboard`, `Tasks`, `CourseDetail`, `Header`, `Sidebar` 전체에서 할 일 토글 상태와 완료율·남은 건수가 즉시 동기화되도록 수정 |
| **Major** | `Dashboard` (`app/dashboard/page.tsx`) | 하단 "수강 중인 과목 현황" 카드 그리드가 `grid-cols-1 gap-6 md:grid-cols-2`로만 지정되어 `DESIGN.md` `02. 레이아웃`의 반응형 3열 그리드(`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) 기준과 불일치함 | `app/dashboard/page.tsx`의 과목 카드 그리드 컨테이너에 `lg:grid-cols-3` 클래스를 추가하여 데스크톱 3열 레이아웃 기준을 충족하도록 수정 |
| **Major** | `Header` (`components/Header.tsx`), `Home` (`app/page.tsx`) | `Header`가 현재 접속한 라우트(`pathname`)를 반영하지 않고 고정된 제목만 표시하여 `DESIGN.md`의 "좌측 현재 페이지 타이틀/학사 일정 안내" 명세와 차이가 있으며, `app/page.tsx`에서 `<h2>` 배너 아래에 `<DashboardPage />`(`<h1>`)가 중첩되어 헤딩 계층이 역전됨 | `Header.tsx`에서 `usePathname()`으로 현재 화면 타이틀(대시보드 · 내 강의 · 과목 상세 · 할 일 · 질문방)을 동적으로 표시하고, `app/page.tsx`의 시맨틱 헤딩 계층을 정리 |
| **Minor** | `Dashboard` (`app/dashboard/page.tsx`) | 오늘 할 일 상태 필터 탭 카운트 배지에 존재하지 않는 Tailwind CSS 클래스 `py-0.2`(245행)가 사용되어 수직 패딩 스타일이 누락됨 | 비표준 클래스 `py-0.2`를 유효한 Tailwind 유틸리티 클래스인 `py-0.5`로 수정 |
| **Minor** | `Dashboard` (`app/dashboard/page.tsx`), `AppShell` (`components/AppShell.tsx`) | `Dashboard`의 할 일 필터 탭에 `role="tablist"` / `role="tab"` / `aria-selected` 웹 접근성 속성이 누락되어 있으며(`Courses`·`Tasks`·`Questions`에는 적용됨), 모바일 좁은 화면에서 `AppShell`의 `main` 패딩이 `p-6`으로 고정되어 카드 내부 여백이 좁아짐 | `Dashboard` 필터 탭에 `role="tablist"`, `role="tab"`, `aria-selected` 속성을 추가하고 `AppShell`의 `main` 영역을 `p-4 sm:p-6` 반응형 패딩으로 개선 |

---

## 3. 수정 루프 (Fix Loop) 진행 상태
- [x] **Step 1 (최초 점검 및 리포트 작성)**: 코드 임의 수정 없이 5대 점검 항목 검증 및 등급화 리포트(`QA_REPORT.md`) 작성 완료 (`675cc26`)
- [x] **Step 2 (승인 완료)**: Coordinator로부터 Critical 1건 · Major 2건 · Minor 2건 수정 승인 완료
- [x] **Step 3 (수정 완료)**: 승인된 5건의 QA 이슈 코드 수정 및 커밋 완료 (`fix: resolve QA critical state sync and layout issues`)
- [x] **Step 4 (재검증 완료)**: `npm run build` 재실행 성공 (에러 0건) 및 남은 `Critical` 이슈 **0건** 최종 확인

---

## 수정 루프 및 재검증 결과 (Fix Loop & Re-verification)

### 1. 이슈별 조치 및 해결 결과

| 등급 | 화면 | 조치 내역 | 최종 상태 |
| :--- | :--- | :--- | :--- |
| **Critical** | `Dashboard`, `Tasks`, `CourseDetail`, `Header`, `Sidebar` | `components/TaskItem.tsx`에 공유 상태 훅 `useTasksState`(`localStorage` + `studyflow-tasks-sync` 커스텀 이벤트 기반)를 구현하고 `Header`, `Sidebar`, `DashboardPage`, `TasksPage`, `CourseDetailPage` 전체에 연동하여 할 일 체크박스 토글 시 완료율(`%`), 사이드바 남은 건수 배지, 페이지 간 목록이 실시간 동기화되도록 수정 (`params.id` 변경 시 반응형 필터링 적용) | **Resolved (해결 완료)** |
| **Major** | `Dashboard` (`app/dashboard/page.tsx`) | 하단 "수강 중인 과목 현황" 그리드를 `grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`으로 수정하여 `DESIGN.md` 3열 반응형 그리드 기준 충족 | **Resolved (해결 완료)** |
| **Major** | `Header` (`components/Header.tsx`), `Home` (`app/page.tsx`) | `Header.tsx`에서 `usePathname()`을 사용해 현재 라우트별 페이지 타이틀(대시보드 · 내 강의 · 과목 상세 · 할 일 관리 · 질문방)과 학사 일정을 동적으로 표시하도록 개선하고, `app/page.tsx` 상단 배너의 헤딩 계층 역전(`<h2>` → `<p>`)을 정리 | **Resolved (해결 완료)** |
| **Minor** | `Dashboard` (`app/dashboard/page.tsx`) | 필터 탭 카운트 배지의 비표준 클래스 `py-0.2`를 표준 Tailwind 유틸리티 클래스 `py-0.5`로 교체 | **Resolved (해결 완료)** |
| **Minor** | `Dashboard` (`app/dashboard/page.tsx`), `AppShell` (`components/AppShell.tsx`) | `Dashboard` 할 일 필터 탭에 `role="tablist"`, `role="tab"`, `aria-selected` 웹 접근성 속성을 추가하고 `AppShell`의 `main` 패딩을 `p-4 sm:p-6`으로 개선 | **Resolved (해결 완료)** |

### 2. 5대 항목 최종 재검증 요약
1. **`build error`**: `npm run build` (`next build`) 재실행 통과 — 컴파일 에러 **0건**, TypeScript strict 타입 에러 **0건**.
2. **`broken link`**: `/`, `/dashboard`, `/courses`, `/courses/[id]`, `/tasks`, `/questions` 전 라우트 정상 연결 확인.
3. **`responsive layout`**: 데스크톱 `240px` 고정 사이드바, `64px` 고정 헤더, 모바일 상단 네비게이션 및 `lg:grid-cols-3` 과목 카드 그리드 정상 동작 확인.
4. **`DESIGN.md 불일치`**: 6대 공통 컴포넌트, 3색 컬러 토큰(Slate / Coral Orange / Emerald Green), 굵은 숫자(`font-bold`), 빈 화면 문구 3종 모두 100% 일치.
5. **`console error`**: 하이드레이션 불일치 없음, 전 화면 할 일 상태 동기화 완료, **남은 Critical 이슈 0건**.


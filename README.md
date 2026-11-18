# StudyFlow

대학생이 강의 진행률 · 할 일 · 질문을 한 화면에서 관리하는 학습관리 웹앱.

## 1. 개요 (Overview)
StudyFlow는 대학생이 수강 중인 강의의 진행률(Progress), 과제 및 오늘 할 일(Tasks), 강의별 질문(Questions)을 한 화면에서 직관적으로 확인하고 관리할 수 있는 학습관리 웹 애플리케이션입니다.

## 2. 기술 스택 (Stack)
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Data**: JSON Mock Data (`data/mockData.json`)
- **Deployment**: Vercel (13주차 연동 예정)

## 3. 디렉터리 구조 (Structure)
```text
studyflow/
├─ README.md         # 프로젝트 개요 · 실행 가이드
├─ DESIGN.md         # 화면 · 컴포넌트 · 디자인 토큰 기준 (Single Source of Truth)
├─ AGENTS.md         # AI 에이전트 전용 규칙 및 금지 사항
├─ app/              # Next.js App Router 페이지 (Home, Dashboard, Courses, Course Detail, Tasks, Questions)
├─ components/       # 공통 UI 컴포넌트 (Header, Sidebar, Card, CourseCard, ProgressBar, TaskItem)
└─ data/             # Mock JSON 데이터 (courses[], tasks[], questions[])
```

## 4. 설치 (Install)
```bash
npm install
```

## 5. 실행 (Run)
```bash
npm run dev
```
실행 후 브라우저에서 `http://localhost:3000`으로 접속합니다. 프로덕션 빌드 검증은 `npm run build`를 사용합니다.

## 6. 환경 변수 (Environment Variables)
- 없음 (로컬 JSON Mock Data를 사용하므로 별도의 `.env` 설정 없이 즉시 실행됩니다.)

## 7. 아키텍처 메모 (Architecture Notes)
- **페이지 ↔ 컴포넌트 관계**:
  - 모든 페이지(`app/`)는 공통 레이아웃 컴포넌트(`Sidebar` 240px, `Header` 64px)를 공유합니다.
  - `Dashboard`(`app/dashboard/page.tsx`, `app/page.tsx`)와 `Courses`(`app/courses/page.tsx`, `app/courses/[id]/page.tsx`, `app/tasks/page.tsx`, `app/questions/page.tsx`)는 `components/` 폴더의 `Card`, `CourseCard`, `ProgressBar`, `TaskItem`을 재사용하여 일관된 UI를 유지합니다.
  - 모든 화면 데이터는 `data/mockData.json`의 `courses[]`, `tasks[]`, `questions[]`를 참조합니다.
- **멀티 에이전트 의존성 순서**:
  `Agent A (feature/ui, ../studyflow-ui)` 완료 → `Agent B (feature/dashboard, ../studyflow-dashboard)` & `Agent C (feature/courses, ../studyflow-courses)` 병렬 구현 → `Agent D (feature/qa, ../studyflow-qa)` 통합 QA 검증 및 등급화 리포트 작성.

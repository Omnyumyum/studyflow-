# DESIGN.md — StudyFlow Design System & Single Source of Truth

이 문서는 Stitch 프로토타입에서 인수인계된 StudyFlow의 **Single Source of Truth**입니다. 모든 에이전트(Agent A, B, C, D)는 본 문서에 정의된 화면 목록, 레이아웃 치수, 컴포넌트 이름, 상태값, 데이터 구조, 톤앤매너를 엄격히 준수합니다.

---

## 01. 화면 목록 (Screens)
1. **Home / Dashboard (`/` 및 `/dashboard`)**: 전체 학습 진행률 요약, 오늘 할 일(Tasks) 요약, 수강 중인 과목 현황, 최근 질문 요약
2. **Courses (`/courses`)**: 전체 수강 과목 목록 조회, 상태별 필터링(전체 / 시작 전 / 진행 중 / 완료) 및 과목 카드 그리드
3. **Course Detail (`/courses/[id]`)**: 선택한 과목의 상세 정보, 주차별/강의별 진행률(`ProgressBar`), 해당 과목의 할 일(`TaskItem`) 및 질문 목록
4. **Tasks (`/tasks`)**: 전체 과제 및 할 일 목록, 상태별(시작 전 / 진행 중 / 완료) 필터 및 체크 인터랙션
5. **Questions (`/questions`)**: 강의별 질문 목록 및 답변 상태(답변 완료 / 대기 중) 확인 화면

---

## 02. 레이아웃 (Layout)
- **Sidebar (`components/Sidebar.tsx`)**:
  - 고정 너비: **`240px`** (`w-[240px]`, 데스크톱 기준 고정, 모바일에서는 상단/드로어 반응형 지원)
  - 네비게이션 메뉴: 대시보드(`/`), 내 강의(`/courses`), 할 일(`/tasks`), 질문방(`/questions`)
- **Header (`components/Header.tsx`)**:
  - 고정 높이: **`64px`** (`h-[64px]`)
  - 좌측 현재 페이지 타이틀/학사 일정 안내, 우측 학습자 프로필 및 오늘의 완료율 뱃지 표시
- **Main Content Area**:
  - 최대 너비 컨테이너 및 반응형 그리드 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, 기본 간격 `gap-6`, 패딩 `p-6`)

---

## 03. 공통 컴포넌트 (Components)
에이전트가 생성하는 파일 이름과 컴포넌트 이름은 아래와 정확히 일치해야 합니다:
1. **`Header` (`components/Header.tsx`)**: 높이 `64px` 상단 헤더 바
2. **`Sidebar` (`components/Sidebar.tsx`)**: 너비 `240px` 좌측 사이드바 네비게이션
3. **`Card` (`components/Card.tsx`)**: 공통 카드 래퍼 (둥근 모서리 `rounded-xl`, 테두리 `border-slate-200`, 배경 `bg-white`, 패딩 `p-5`, 그림자 `shadow-sm`)
4. **`CourseCard` (`components/CourseCard.tsx`)**: 과목명, 담당 교수, 상태 뱃지, `ProgressBar`, 완료 강의 수/전체 강의 수 표시 및 `/courses/[id]` 상세 이동 링크 포함
5. **`ProgressBar` (`components/ProgressBar.tsx`)**: `0~100%` 진행률을 시각적 막대와 **굵은 숫자(`font-bold`)**로 표시
6. **`TaskItem` (`components/TaskItem.tsx`)**: 할 일 제목, 과목명 태그, 마감일(`dueDate`), 상태(`시작 전` / `진행 중` / `완료`) 뱃지 표시

---

## 04. 상태 및 빈 화면 문구 (States & Empty States)
- **공통 상태 3단계**:
  - `시작 전` (Before Start): 슬레이트/회색 톤 뱃지 (`bg-slate-100 text-slate-700`)
  - `진행 중` (In Progress): 메인 포인트 오렌지/블루 톤 뱃지 (`bg-orange-50 text-orange-600`)
  - `완료` (Completed): 에메랄드/그린 톤 뱃지 (`bg-emerald-50 text-emerald-700`)
- **빈 화면 문구 (Empty State Text)**:
  - 강의가 없을 때: `"등록된 강의가 없습니다."`
  - 할 일이 없을 때: `"오늘 예정된 할 일이 없습니다."`
  - 질문이 없을 때: `"등록된 질문이 없습니다."`

---

## 05. 데이터 구조 (Data Schema — `data/mockData.json`)
- **`courses[]`**:
  - `id` (string), `title` (string), `instructor` (string), `category` (string), `progress` (number, 0~100), `completedLessons` (number), `totalLessons` (number), `status` (`"시작 전"` | `"진행 중"` | `"완료"`), `nextDeadline` (string), `description` (string)
- **`tasks[]`**:
  - `id` (string), `courseId` (string), `courseTitle` (string), `title` (string), `dueDate` (string), `status` (`"시작 전"` | `"진행 중"` | `"완료"`), `priority` (`"높음"` | `"보통"` | `"낮음"`)
- **`questions[]`**:
  - `id` (string), `courseId` (string), `courseTitle` (string), `title` (string), `author` (string), `createdAt` (string), `status` (`"시작 전"` | `"진행 중"` | `"완료"`), `answerSummary` (string)

---

## 06. 톤앤매너 및 컬러 토큰 (Tone & Color Tokens)
- **문장 톤**: **짧은 문장** (군더더기 없는 명료한 한국어 UI 레이블)
- **타이포그래피**: **숫자는 굵게** (`font-bold` / `font-extrabold`, 진행률 `%`, 남은 할 일 개수, 수강 과목 수 등 핵심 지표 강조)
- **핵심 3색 (3-Color Palette)**:
  1. **Base / Dark Ink (주 텍스트 및 네비게이션 강조)**: Slate (`#0F172A` / `slate-900`, 배경 `#F8FAFC` / `slate-50`)
  2. **Primary Accent (진행 중 · 주요 액션 포인트)**: Coral Orange (`#EA580C` / `orange-600`)
  3. **Success / Complete (완료 · 달성 지표)**: Emerald Green (`#059669` / `emerald-600`)

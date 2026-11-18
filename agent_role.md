# Agent C — 코스 목록 및 Task 상세 화면 담당

- **워크트리 폴더**: `../studyflow-courses`
- **브랜치**: `feature/courses`
- **역할 요약**: 코스 목록 및 Task 상세 화면 담당

## 1. 내가 소유한 파일 (Owned Files)
- `app/courses/page.tsx` (전체 강의 목록 및 상태별 필터 화면)
- `app/courses/[id]/page.tsx` (과목 상세 화면 — 강의 진행률, 과목별 할 일, 과목별 질문)
- `app/tasks/page.tsx` (전체 할 일 목록 및 상태 필터 화면)
- `app/questions/page.tsx` (강의별 질문 목록 및 답변 상태 화면)

## 2. 건드리지 말 것 (Do Not Touch)
- `../studyflow-ui`, `../studyflow-dashboard`, `../studyflow-qa` 등 다른 워크트리 폴더와 `app/dashboard/`는 건드리지 않습니다.
- `components/` 내 공통 UI 컴포넌트와 `data/mockData.json`은 수정하지 않고 import하여 읽기/재사용만 합니다.

## 3. 완료의 정의 (Definition of Done)
- `../studyflow-courses` 폴더 밖의 파일이 바뀌지 않았을 것
- Agent A가 만든 공통 UI(`CourseCard`, `ProgressBar`, `TaskItem`, `Card` 등)를 재사용했을 것
- 코스 목록(`/courses`), 과목 상세(`/courses/[id]`), 할 일(`/tasks`), 질문(`/questions`) 화면이 Mock Data로 정상 동작하고 `npm run build`가 통과할 것

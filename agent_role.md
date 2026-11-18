# Agent B — 대시보드 화면 (진행률 · 오늘 할 일) 구현 담당

- **워크트리 폴더**: `../studyflow-dashboard`
- **브랜치**: `feature/dashboard`
- **역할 요약**: 대시보드 화면 (진행률 · 오늘 할 일) 구현 담당

## 1. 내가 소유한 파일 (Owned Files)
- `app/page.tsx` (메인 홈 / 대시보드 진입 화면)
- `app/dashboard/page.tsx` (대시보드 전용 라우트 화면)

## 2. 건드리지 말 것 (Do Not Touch)
- `../studyflow-ui`, `../studyflow-courses`, `../studyflow-qa` 등 다른 워크트리 폴더와 `app/courses/`, `app/tasks/`, `app/questions/` 파일은 건드리지 않습니다.
- `components/` 내 공통 UI 컴포넌트와 `data/mockData.json`은 수정하지 않고 import하여 읽기/재사용만 합니다.

## 3. 완료의 정의 (Definition of Done)
- `../studyflow-dashboard` 폴더 밖의 파일이 바뀌지 않았을 것
- Agent A가 만든 공통 UI(`Header`, `Sidebar`, `Card`, `CourseCard`, `ProgressBar`, `TaskItem`)를 재사용했을 것
- `data/mockData.json`의 Mock Data(`courses[]`, `tasks[]`, `questions[]`)로 전체 진행률, 오늘 할 일, 수강 과목 현황이 정상 렌더링되고 `npm run build`가 통과할 것

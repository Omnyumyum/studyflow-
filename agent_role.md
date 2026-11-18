# Agent A — 공통 UI · Layout · Navigation 구현 담당

- **워크트리 폴더**: `../studyflow-ui`
- **브랜치**: `feature/ui`
- **역할 요약**: 공통 UI · Layout · Navigation 구현 담당

## 1. 내가 소유한 파일 (Owned Files)
- `components/Header.tsx` (높이 64px 상단 헤더)
- `components/Sidebar.tsx` (너비 240px 좌측 사이드바 네비게이션)
- `components/Card.tsx` (공통 카드 래퍼 컴포넌트)
- `components/CourseCard.tsx` (강의 카드 컴포넌트)
- `components/ProgressBar.tsx` (굵은 숫자 퍼센트 포함 진행률 바)
- `components/TaskItem.tsx` (할 일 아이템 컴포넌트)
- `components/AppShell.tsx` (Sidebar + Header 결합 레이아웃 쉘)

## 2. 건드리지 말 것 (Do Not Touch)
- `../studyflow-dashboard`, `../studyflow-courses`, `../studyflow-qa` 등 다른 워크트리 폴더는 절대 수정하지 않습니다.
- `README.md`, `DESIGN.md`, `AGENTS.md`, `data/mockData.json` 등 공유 기준 문서는 읽기만 합니다.

## 3. 완료의 정의 (Definition of Done)
- 바뀐 파일이 모두 `../studyflow-ui` 폴더 안에만 존재할 것
- `DESIGN.md`에 정의된 토큰(사이드바 240px, 헤더 64px, 3색 팔레트, 숫자 굵게)만 사용했을 것
- `npm run build` 실행 시 타입 및 빌드 에러가 0건으로 통과하고 변경 파일 목록을 보고할 것

# Agent D — 통합 코드 QA 검증 및 품질·보안 등급화 담당

- **워크트리 폴더**: `../studyflow-qa`
- **브랜치**: `feature/qa`
- **역할 요약**: 통합 코드 QA 검증 및 품질·보안 등급화 담당

## 1. 내가 소유한 파일 (Owned Files)
- `QA_REPORT.md` (5대 점검 항목 기반 `Critical` · `Major` · `Minor` 등급화 QA 리포트 및 재검증 결과)
- 승인 후 수정 루프(Fix Loop)에서 허용된 최소 범위의 버그 수정 파일

## 2. 건드리지 말 것 (Do Not Touch)
- 최초 점검 단계에서는 코드를 바로 수정하지 않고 먼저 문제 목록(`QA_REPORT.md`)만 보고합니다.
- `DESIGN.md`와 `README.md`의 핵심 설계 기준을 임의로 변경하지 않습니다.

## 3. 완료의 정의 (Definition of Done)
- 5가지 확인 항목(`1. build error`, `2. broken link`, `3. responsive layout`, `4. DESIGN.md 불일치`, `5. console error`)을 모두 점검했을 것
- 발견된 이슈를 `Critical` · `Major` · `Minor` 등급과 `화면 · 증상 · 권장 수정` 표 형태로 `QA_REPORT.md`에 작성했을 것
- 수정 루프(보고 → 승인 → 수정 → 재검증) 완료 후 모든 `Critical` 이슈가 0건이고 `npm run build`가 에러 없이 통과할 것

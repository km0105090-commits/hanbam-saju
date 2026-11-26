@AGENTS.md

# 한밤사주 — Claude 작업 안내

사주(四柱) 풀이를 파는 웹사이트입니다. 운영자는 개발자가 아니에요. 설명은 쉬운 한국어로, 바꾼 내용은 결과 위주로 짧게 알려 주세요.

## 구조
- `src/lib/saju/` — 만세력 엔진. **가장 중요한 코드**입니다. 정확도가 상품의 생명이에요.
  - 년주·월주: 절입 "순간"(분 단위) 기준. 일주·시주: 지방 평균 태양시(서울 약 -32분) 기준.
  - 한국 표준시 이력(1954~61 UTC+8:30)·서머타임(1948~51, 1955~60, 1987~88)은 IANA `Asia/Seoul` 데이터로 처리.
  - 음력 변환은 `korean-lunar-calendar`(한국천문연구원 기준). 중국 음력과 날짜가 다를 수 있으니 바꾸지 마세요.
  - 엔진을 고치면 반드시 `npm test` 를 돌리고, 새 규칙에는 테스트를 추가하세요.
- `src/app/page.tsx` + `src/legacy/markup.ts` + `public/legacy/app.js` — claude.ai 에서 만든 샘플 화면을 그대로 옮긴 것. 화면 문구·흐름은 여기 있어요. 점차 React 컴포넌트로 옮길 예정.
- `src/lib/saju/insights.ts`, `oneQuestion.ts` — 오늘의 카드·오행 보완·대운 흐름·궁합·인연 달·990원 질문 결과지 규칙 (테스트: `tests/insights.test.ts`)
- `src/features/` — 새 화면(스크롤 장면, 오늘의 카드, 내 오행·대운, 궁합, 홍연 인연, 한 가지 질문, 공유 카드). 스타일은 `src/app/features.css`, 전체 디자인 톤(신세대: Pretendard, 남색·체리 레드, 둥근 카드)은 `src/app/fresh.css`
- `src/app/api/saju` — 만세력 계산 API (AI 풀이 생성 때 사용)
- `src/app/api/payments/confirm` — 토스페이먼츠 결제 승인 뼈대 (아직 화면과 미연결)
- `src/config/products.ts` — 상품·가격표. 결제 금액은 서버에서 이 표로 검증.
- `public/media/` — 그림(jpg), 홍연 목소리(mp3, 1.17배속)
- `docs/` — 기획서, 상품별 AI 프롬프트, 오픈 안내서

## 원칙
- 결제 전 "정곡 풀이"는 실제 사주 근거로 첫 문장을 날카롭게, 고른 고민에 답하다가 가장 궁금한 지점에서 끊고 블러 → "이어서 읽기"로 결제.
- 겁주거나 단정하지 않기("반드시", "100%" 금지). 건강·투자·법률은 전문가 상담 권유.
- 비밀 키는 `.env.local` 에만. 절대 커밋하지 않기.

## 명령
- `npm run dev` — 개발 서버 (http://localhost:3000)
- `npm test` — 만세력 정확도 테스트
- `npm run build` — 배포 전 점검

/**
 * 화면 기능용 해석 규칙 테스트 (오행 밸런스 · 대운 흐름 · 궁합 · 인연 달 · 오늘의 카드)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateSaju } from "../src/lib/saju/engine.ts";
import { compatibility, dailyCard, daewoonFlow, elementBalance, inyeonMonths, PEACH_BLOSSOM, SIX_HARMONY } from "../src/lib/saju/insights.ts";

const A = calculateSaju({ year: 1997, month: 5, day: 21, hour: 14, minute: 30, gender: "female" });
const B = calculateSaju({ year: 1995, month: 11, day: 3, hour: 8, minute: 10, gender: "male" });

test("오행 밸런스: 개수 합은 여덟 글자, 퍼센트 합은 100", () => {
  const e = elementBalance(A);
  assert.equal(e.total, 8);
  assert.equal(e.counts.reduce((a, b) => a + b, 0), 8);
  assert.equal(e.percents.reduce((a, b) => a + b, 0), 100);
  assert.ok(e.helpful.includes(e.remedy.element), "보완 기운은 도움이 되는 기운 중에서 골라요");
});

test("오행 밸런스: 시간을 모르면 여섯 글자로 계산", () => {
  const r = calculateSaju({ year: 1997, month: 5, day: 21 });
  assert.equal(elementBalance(r).total, 6);
});

test("오행 밸런스: 비어 있는 기운을 찾아냄", () => {
  const e = elementBalance(A);
  e.missing.forEach((i) => assert.equal(e.counts[i], 0));
  e.weakest.forEach((i) => assert.equal(e.counts[i], Math.min(...e.counts)));
});

test("대운 흐름: 10년 단위로 이어지고 지금 대운은 하나", () => {
  const f = daewoonFlow(A, new Date(2026, 10, 26));
  assert.ok(f.length >= 8);
  for (let i = 1; i < f.length; i++) assert.equal(f[i].startYear - f[i - 1].startYear, 10);
  assert.equal(f.filter((x) => x.current).length, 1);
  f.forEach((x) => assert.ok(x.score >= 46 && x.score <= 96));
});

test("대운 흐름: 성별이 없으면 빈 목록", () => {
  assert.deepEqual(daewoonFlow(calculateSaju({ year: 1997, month: 5, day: 21 })), []);
});

test("궁합: 점수는 46~96, 네 갈래 해설", () => {
  const c = compatibility(A, B);
  assert.ok(c.score >= 46 && c.score <= 96);
  assert.equal(c.parts.length, 4);
  assert.equal(compatibility(A, B).score, compatibility(B, A).score, "순서를 바꿔도 점수는 같아요");
});

test("궁합: 육합 표는 서로 짝을 이룸", () => {
  SIX_HARMONY.forEach((b, a) => assert.equal(SIX_HARMONY[b], a));
});

test("궁합: 문구에 단정 표현을 쓰지 않음", () => {
  const c = compatibility(A, B);
  const all = c.headline + c.parts.map((p) => p.text).join("");
  assert.ok(!/반드시|100%|무조건/.test(all));
});

test("홍연 인연 찾기: 앞으로 12달, 도화 달이 높게 나옴", () => {
  const r = inyeonMonths(A, "female", new Date(2026, 10, 26));
  assert.equal(r.months.length, 12);
  assert.deepEqual([r.months[0].year, r.months[0].month], [2026, 11]);
  assert.deepEqual([r.months[11].year, r.months[11].month], [2027, 10]);
  assert.equal(r.top.length, 3);
  const peach = new Set([PEACH_BLOSSOM[A.pillars.year.branch], PEACH_BLOSSOM[A.pillars.day.branch]]);
  r.months.filter((m) => m.reasons.includes("도화(桃花)가 드는 달")).forEach((m) => assert.ok(peach.size > 0 && m.score >= 60));
});

test("오늘의 카드: 2000-01-01 일진은 戊午", () => {
  const c = dailyCard(new Date(2000, 0, 1));
  assert.equal(c.dayPillar.hanja, "戊午");
  assert.equal(c.personal, false);
  const p = dailyCard(new Date(2000, 0, 1), A);
  assert.equal(p.personal, true);
  assert.match(p.title, /·/);
});

import { QUESTIONS, answerQuestion } from "../src/lib/saju/oneQuestion.ts";

test("한 가지 질문 풀이: 모든 질문에 결과지가 나오고 같은 입력엔 같은 답", () => {
  for (const q of QUESTIONS) {
    const a = answerQuestion(A, "female", q.id, new Date(2026, 10, 26));
    assert.ok(a.headline.length > 10);
    assert.equal(a.months.length, 2);
    assert.equal(a.advice.length, 3);
    assert.ok(!/반드시|100%|무조건/.test(a.headline + a.basis + a.caution));
    assert.deepEqual(a, answerQuestion(A, "female", q.id, new Date(2026, 10, 26)));
  }
});

test("한 가지 질문 풀이: 금전 질문은 전문가 상담을 권함", () => {
  assert.match(answerQuestion(B, "male", "money-side").caution, /전문가/);
});

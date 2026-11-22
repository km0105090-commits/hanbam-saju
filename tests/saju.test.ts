/**
 * 만세력 정확도 테스트 — `npm test` 로 실행합니다.
 * 기준값: 한국천문연구원(KASI) 천문력에 발표된 절입 시각, 널리 알려진 일진.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateSaju, tenGodOfStem } from "../src/lib/saju/engine.ts";

const hanja = (r: ReturnType<typeof calculateSaju>) =>
  [r.pillars.year.hanja, r.pillars.month.hanja, r.pillars.day.hanja, r.pillars.hour?.hanja ?? "-"].join(" ");

test("2000-01-01 은 무오(戊午)일", () => {
  const r = calculateSaju({ year: 2000, month: 1, day: 1 });
  assert.equal(r.pillars.day.hanja, "戊午");
});

test("입춘 절입 시각(2024-02-04 17:27 KST) 전후로 년주가 바뀜", () => {
  const before = calculateSaju({ year: 2024, month: 2, day: 4, hour: 17, minute: 26 });
  const after = calculateSaju({ year: 2024, month: 2, day: 4, hour: 17, minute: 28 });
  assert.equal(before.pillars.year.hanja, "癸卯");
  assert.equal(before.pillars.month.hanja, "乙丑");
  assert.equal(after.pillars.year.hanja, "甲辰");
  assert.equal(after.pillars.month.hanja, "丙寅");
  assert.equal(after.solarTerm.previous.name, "입춘");
  assert.equal(after.solarTerm.previous.kst, "2024-02-04 17:27");
});

test("2025 입춘은 2월 3일 23:10 KST", () => {
  const r = calculateSaju({ year: 2025, month: 2, day: 4, hour: 9, minute: 0 });
  assert.equal(r.solarTerm.previous.name, "입춘");
  assert.equal(r.solarTerm.previous.kst, "2025-02-03 23:10");
  assert.equal(r.pillars.year.hanja, "乙巳");
});

test("서울 태양시 보정: 13:20 KST 는 태양시 12:48 이라 오시(午)", () => {
  const r = calculateSaju({ year: 1997, month: 5, day: 21, hour: 13, minute: 20 });
  assert.equal(r.correction.solarShiftMinutes, -32);
  assert.equal(r.pillars.hour?.branch, 6); // 午
  const noFix = calculateSaju({ year: 1997, month: 5, day: 21, hour: 13, minute: 20, solarTimeCorrection: false });
  assert.equal(noFix.pillars.hour?.branch, 7); // 未
});

test("밤 11시 40분 출생: 자시 처리 방식에 따라 일주가 달라짐", () => {
  const nextDay = calculateSaju({ year: 1990, month: 3, day: 15, hour: 23, minute: 40 });
  const split = calculateSaju({ year: 1990, month: 3, day: 15, hour: 23, minute: 40, ziHour: "split" });
  const sameDay = calculateSaju({ year: 1990, month: 3, day: 15, hour: 12 });
  const following = calculateSaju({ year: 1990, month: 3, day: 16, hour: 12 });
  assert.equal(nextDay.pillars.day.hanja, following.pillars.day.hanja);
  assert.equal(split.pillars.day.hanja, sameDay.pillars.day.hanja);
  assert.equal(nextDay.pillars.hour?.branch, 0);
  assert.equal(split.pillars.hour?.hanja, nextDay.pillars.hour?.hanja);
});

test("1987년 서머타임: 7월 출생은 UTC+10 으로 보정", () => {
  const r = calculateSaju({ year: 1987, month: 7, day: 10, hour: 10, minute: 0 });
  assert.equal(r.correction.utcOffsetMinutes, 600);
  assert.equal(r.correction.daylightSaving, true);
  assert.equal(r.correction.solarShiftMinutes, -92);
  assert.equal(r.correction.localSolarTime, "1987-07-10 08:28");
});

test("1955년 표준시 UTC+8:30 시기", () => {
  const r = calculateSaju({ year: 1955, month: 1, day: 10, hour: 10, minute: 0 });
  assert.equal(r.correction.utcOffsetMinutes, 510);
  assert.equal(r.correction.daylightSaving, false);
});

test("음력 → 양력 (KASI 기준) : 음력 1956-01-21 = 양력 1956-03-03", () => {
  const r = calculateSaju({ year: 1956, month: 1, day: 21, calendar: "lunar" });
  assert.deepEqual(r.solarDate, { year: 1956, month: 3, day: 3 });
  assert.equal(r.pillars.day.hanja, "己巳");
});

test("음력 윤달: 2023년 윤2월 1일 = 양력 2023-03-22", () => {
  const r = calculateSaju({ year: 2023, month: 2, day: 1, calendar: "lunar", isLeapMonth: true });
  assert.deepEqual(r.solarDate, { year: 2023, month: 3, day: 22 });
});

test("시간을 모르는데 절입일이면 경고", () => {
  const r = calculateSaju({ year: 2024, month: 2, day: 4 });
  assert.equal(r.boundaryWarning, true);
  assert.equal(calculateSaju({ year: 2024, month: 2, day: 10 }).boundaryWarning, false);
});

test("대운: 1990-03-15 12:00 남자 (경오년, 양남 순행)", () => {
  const r = calculateSaju({ year: 1990, month: 3, day: 15, hour: 12, gender: "male" });
  assert.equal(r.pillars.year.hanja, "庚午");
  assert.ok(r.daewoon);
  assert.equal(r.daewoon!.forward, true);
  // 월주 다음 간지부터 순서대로
  assert.equal(r.daewoon!.list[0].pillar.stem, (r.pillars.month.stem + 1) % 10);
});

test("시진 버튼으로 고른 경우 시주", () => {
  const r = calculateSaju({ year: 1997, month: 5, day: 21, sijin: 7 });
  assert.equal(r.pillars.hour?.branch, 7);
  assert.equal(r.timeKnown, true);
});

test("십성", () => {
  assert.equal(tenGodOfStem(0, 0), "비견");
  assert.equal(tenGodOfStem(0, 3), "상관");
  assert.equal(tenGodOfStem(0, 7), "정관");
  assert.equal(tenGodOfStem(0, 9), "정인");
});

test("샘플 하늘님 1997-05-21 14:30", () => {
  const r = calculateSaju({ year: 1997, month: 5, day: 21, hour: 14, minute: 30, gender: "female" });
  console.log("  ", hanja(r), r.correction, r.daewoon?.startAge);
  assert.equal(r.pillars.year.hanja, "丁丑");
  assert.equal(r.pillars.month.hanja, "乙巳");
});

/**
 * 만세력 결과(SajuResult)를 화면 기능용 해석 재료로 바꾸는 순수 함수 모음.
 * 오늘의 카드 · 오행 밸런스 · 대운 흐름 · 궁합 점수 · 홍연 인연 달을 여기서 계산합니다.
 * 화면 코드(src/features)는 이 결과를 보여 주기만 해요. 규칙을 바꾸면 tests/insights.test.ts 도 고쳐 주세요.
 *
 * 원칙: 겁주거나 단정하지 않기. 점수는 46~96 사이로만 내고, "반드시"·"100%" 같은 말은 쓰지 않아요.
 */
import {
  BRANCH_ELEMENT,
  BRANCHES,
  BRANCHES_KO,
  STEM_ELEMENT,
  STEMS,
  STEMS_KO,
  calculateSaju,
  tenGodOfStem,
  type Pillar,
  type SajuResult,
} from "./engine.ts";

export const ELEMENT_HANJA = "木火土金水";
export const ELEMENT_NAME = ["나무", "불", "흙", "쇠", "물"];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}
function pillarsOf(r: SajuResult): Pillar[] {
  const p = r.pillars;
  return [p.year, p.month, p.day, p.hour].filter((x): x is Pillar => !!x);
}

/* ------------------------------------------------------------------ */
/* 오행 밸런스 + 보완법                                                 */
/* ------------------------------------------------------------------ */

export type Remedy = {
  element: number;
  color: string;
  direction: string;
  season: string;
  taste: string;
  habit: string;
  numbers: string;
};

/** 부족한 기운을 생활 속에서 보태는 전통적인 방법(색·방향·맛·습관·숫자). 건강 처방이 아니에요. */
export const REMEDIES: Remedy[] = [
  { element: 0, color: "초록 · 청록", direction: "동쪽", season: "봄", taste: "신맛, 푸른 잎채소", habit: "아침 산책, 화분 하나 키우기", numbers: "3, 8" },
  { element: 1, color: "붉은색 · 자주", direction: "남쪽", season: "여름", taste: "쌉쌀한 맛, 붉은 과일", habit: "햇볕 아래 걷기, 마음을 말로 꺼내기", numbers: "2, 7" },
  { element: 2, color: "황토 · 베이지", direction: "가운데", season: "환절기", taste: "단맛, 곡물과 뿌리채소", habit: "같은 시간에 먹고 자기, 책상 정리", numbers: "5, 10" },
  { element: 3, color: "흰색 · 금빛", direction: "서쪽", season: "가을", taste: "매운맛, 배와 무", habit: "깊게 숨 쉬기, 안 쓰는 물건 비우기", numbers: "4, 9" },
  { element: 4, color: "남색 · 검정", direction: "북쪽", season: "겨울", taste: "짠맛, 해조류와 검은콩", habit: "충분히 자기, 물 자주 마시기, 짧은 일기", numbers: "1, 6" },
];

const ELEMENT_TRAIT = [
  "뻗어 나가려는 힘. 시작하고 자라는 기운이에요.",
  "밝히고 드러내는 힘. 표현하고 데우는 기운이에요.",
  "받치고 품는 힘. 버티고 이어 주는 기운이에요.",
  "가르고 다듬는 힘. 결단하고 정리하는 기운이에요.",
  "스미고 흐르는 힘. 생각하고 쉬게 하는 기운이에요.",
];

export type ElementBalance = {
  counts: number[];
  total: number;
  /** 0~100, 다섯 값의 합은 100 */
  percents: number[];
  dayElement: number;
  strongest: number;
  weakest: number[];
  missing: number[];
  /** 일간을 돕는 기운(같은 오행 + 나를 생하는 오행)이 절반 이상이면 true */
  strongSelf: boolean;
  /** 보태면 좋은 기운 (일간 강약 기준) */
  helpful: number[];
  remedy: Remedy;
  summary: string;
};

export function elementBalance(r: SajuResult): ElementBalance {
  const counts = [0, 0, 0, 0, 0];
  for (const p of pillarsOf(r)) {
    counts[STEM_ELEMENT[p.stem]]++;
    counts[BRANCH_ELEMENT[p.branch]]++;
  }
  const total = counts.reduce((a, b) => a + b, 0);
  const raw = counts.map((c) => (c / total) * 100);
  const percents = raw.map(Math.floor);
  // 합이 100 이 되도록 소수점이 큰 순서대로 1씩 보탭니다.
  let left = 100 - percents.reduce((a, b) => a + b, 0);
  raw.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { percents[i]++; left--; } });

  const dayElement = STEM_ELEMENT[r.pillars.day.stem];
  const max = Math.max(...counts), min = Math.min(...counts);
  const strongest = counts.indexOf(max);
  const weakest = counts.map((c, i) => (c === min ? i : -1)).filter((i) => i >= 0);
  const missing = counts.map((c, i) => (c === 0 ? i : -1)).filter((i) => i >= 0);
  const support = counts[dayElement] + counts[mod(dayElement - 1, 5)];
  const strongSelf = support * 2 >= total;
  // 신강하면 내 힘을 빼 주는 식상·재성·관성, 신약하면 나를 돕는 비겁·인성이 도움이 돼요.
  const helpful = strongSelf
    ? [mod(dayElement + 1, 5), mod(dayElement + 2, 5), mod(dayElement + 3, 5)]
    : [dayElement, mod(dayElement - 1, 5)];
  // 보완 기운: 도움이 되는 기운 중 가장 적은 것
  const target = helpful.slice().sort((a, b) => counts[a] - counts[b] || a - b)[0];
  const remedy = REMEDIES[target];

  const meName = STEMS_KO[r.pillars.day.stem] + ["목", "화", "토", "금", "수"][dayElement];
  const lack = missing.length
    ? `${missing.map((i) => ELEMENT_NAME[i] + "(" + ELEMENT_HANJA[i] + ")").join("과 ")} 기운이 비어 있어요`
    : `${ELEMENT_NAME[weakest[0]]}(${ELEMENT_HANJA[weakest[0]]}) 기운이 가장 옅어요`;
  const summary =
    `${meName} 일간이고, ${ELEMENT_NAME[strongest]}(${ELEMENT_HANJA[strongest]})의 기운이 가장 짙고 ${lack}. ` +
    (strongSelf ? "스스로 서는 힘이 넉넉한 편이라, 힘을 밖으로 쓰는 기운이 들어올 때 흐름이 풀려요." : "혼자 버티기보다 받쳐 주는 기운이 들어올 때 힘이 붙는 편이에요.");

  return { counts, total, percents, dayElement, strongest, weakest, missing, strongSelf, helpful, remedy, summary };
}

export function elementTrait(e: number) {
  return ELEMENT_TRAIT[e];
}

/* ------------------------------------------------------------------ */
/* 대운 흐름                                                            */
/* ------------------------------------------------------------------ */

const GOD_GROUP_THEME: Record<string, [string, string]> = {
  비겁: ["나를 세우는 10년", "내 이름으로 서고, 나와 닮은 사람들과 힘을 겨루거나 모으는 시기예요."],
  식상: ["꺼내고 펼치는 10년", "재능과 말, 만든 것을 밖으로 보여 줄수록 길이 넓어지는 시기예요."],
  재성: ["거두고 쌓는 10년", "현실 감각이 살아나고, 일한 만큼 손에 쥐는 것이 생기기 쉬운 시기예요."],
  관성: ["자리와 책임의 10년", "역할과 이름이 커지는 대신 지켜야 할 것도 함께 늘어나는 시기예요."],
  인성: ["배우고 채우는 10년", "배움과 자격, 도와주는 사람이 곁에 붙기 쉬운 시기예요."],
};
function godGroup(god: string) {
  if (god === "비견" || god === "겁재") return "비겁";
  if (god === "식신" || god === "상관") return "식상";
  if (god === "편재" || god === "정재") return "재성";
  if (god === "편관" || god === "정관") return "관성";
  return "인성";
}

export type DaewoonStep = {
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  hanja: string;
  hangul: string;
  stemElement: number;
  branchElement: number;
  tenGod: string;
  theme: string;
  detail: string;
  /** 46~96. 도움이 되는 기운이 많이 들수록 높아요 */
  score: number;
  current: boolean;
};

export function daewoonFlow(r: SajuResult, now = new Date()): DaewoonStep[] {
  if (!r.daewoon) return [];
  const bal = elementBalance(r);
  const dayStem = r.pillars.day.stem, dayBranch = r.pillars.day.branch;
  const year = now.getFullYear();
  return r.daewoon.list.map((d) => {
    const se = STEM_ELEMENT[d.pillar.stem], be = BRANCH_ELEMENT[d.pillar.branch];
    const god = tenGodOfStem(dayStem, d.pillar.stem);
    const [theme, detail] = GOD_GROUP_THEME[godGroup(god)];
    let score = 64;
    score += bal.helpful.includes(se) ? 10 : -4;
    score += bal.helpful.includes(be) ? 12 : -5;
    if (bal.missing.includes(se) || bal.missing.includes(be)) score += 4;
    if (mod(d.pillar.branch - dayBranch, 12) === 6) score -= 9; // 일지와 충
    if (SIX_HARMONY[dayBranch] === d.pillar.branch) score += 6;
    score += ((d.pillar.stem * 7 + d.pillar.branch * 3) % 5) - 2; // 같은 점수만 이어지지 않게 아주 작은 결
    return {
      startAge: d.startAge,
      endAge: d.startAge + 9,
      startYear: d.startYear,
      endYear: d.startYear + 9,
      hanja: d.pillar.hanja,
      hangul: d.pillar.hangul,
      stemElement: se,
      branchElement: be,
      tenGod: god,
      theme,
      detail,
      score: clamp(score, 46, 96),
      current: year >= d.startYear && year <= d.startYear + 9,
    };
  });
}

/* ------------------------------------------------------------------ */
/* 궁합                                                                 */
/* ------------------------------------------------------------------ */

/** 지지 육합: 子丑 寅亥 卯戌 辰酉 巳申 午未 */
export const SIX_HARMONY = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
/** 천간합: 甲己 乙庚 丙辛 丁壬 戊癸 */
function stemsCombine(a: number, b: number) {
  return Math.abs(a - b) === 5;
}
/** 삼합 그룹: 申子辰(水) 寅午戌(火) 巳酉丑(金) 亥卯未(木) */
function triadGroup(b: number) {
  return b % 4;
}

export type CompatPart = { key: string; label: string; score: number; text: string };
export type Compatibility = {
  score: number;
  grade: string;
  headline: string;
  parts: CompatPart[];
};

export function compatibility(a: SajuResult, b: SajuResult): Compatibility {
  const as = a.pillars.day.stem, bs = b.pillars.day.stem;
  const ab = a.pillars.day.branch, bb = b.pillars.day.branch;
  const ae = STEM_ELEMENT[as], be = STEM_ELEMENT[bs];
  const parts: CompatPart[] = [];

  // 1) 일간: 두 사람의 바탕 기질
  let s1: number, t1: string;
  if (stemsCombine(as, bs)) { s1 = 24; t1 = `${STEMS[as]}·${STEMS[bs]}은 서로 끌어당겨 하나로 묶이는 천간합이에요. 처음부터 낯설지 않은 사이가 되기 쉬워요.`; }
  else if (mod(be - ae, 5) === 1 || mod(ae - be, 5) === 1) { s1 = 20; t1 = `한쪽이 다른 쪽을 키워 주는 상생 관계예요. ${mod(be - ae, 5) === 1 ? "내가" : "상대가"} 먼저 마음을 내주는 쪽이 되기 쉬워요.`; }
  else if (ae === be) { s1 = 16; t1 = "같은 오행이라 말이 잘 통하는 친구 같은 결이에요. 다만 고집이 부딪히는 지점도 같아요."; }
  else { s1 = 10; t1 = "서로를 다듬는 상극 관계예요. 긴장감이 끌림이 되기도 하고, 말투 하나에 서운해지기도 해요."; }
  parts.push({ key: "stem", label: "일간 · 바탕 기질", score: s1, text: t1 });

  // 2) 일지: 함께 사는 자리
  let s2: number, t2: string;
  if (SIX_HARMONY[ab] === bb) { s2 = 22; t2 = `일지 ${BRANCHES[ab]}·${BRANCHES[bb]}이 육합을 이뤄요. 생활의 리듬이 자연스럽게 맞물리는 편이에요.`; }
  else if (triadGroup(ab) === triadGroup(bb) && ab !== bb) { s2 = 19; t2 = "일지가 같은 삼합 무리에 있어요. 같은 방향을 보며 함께 일을 벌이기 좋은 사이예요."; }
  else if (mod(ab - bb, 12) === 6) { s2 = 8; t2 = `일지 ${BRANCHES[ab]}·${BRANCHES[bb]}이 마주 보는 충이에요. 서로 다른 생활 습관을 미리 이야기해 두면 부딪힘이 줄어요.`; }
  else if (ab === bb) { s2 = 15; t2 = "일지가 같아 생활 감각이 닮았어요. 편안하지만, 둘 다 물러서지 않는 순간이 생길 수 있어요."; }
  else { s2 = 14; t2 = "일지 사이에 큰 당김도 부딪힘도 없는 무난한 결이에요. 쌓아 가는 시간이 관계를 만들어요."; }
  parts.push({ key: "branch", label: "일지 · 생활의 결", score: s2, text: t2 });

  // 3) 오행 보완: 서로의 빈칸을 채워 주는가
  const ea = elementBalance(a), eb = elementBalance(b);
  const aFills = ea.weakest.filter((e) => eb.counts[e] >= 2).length;
  const bFills = eb.weakest.filter((e) => ea.counts[e] >= 2).length;
  let s3 = 10 + Math.min(aFills, 2) * 5 + Math.min(bFills, 2) * 5;
  let t3: string;
  if (aFills && bFills) t3 = "서로에게 부족한 기운을 상대가 넉넉히 갖고 있어요. 함께 있을 때 균형이 잡히는 사이예요.";
  else if (aFills) t3 = `내게 옅은 ${ELEMENT_NAME[ea.weakest[0]]}의 기운을 상대가 채워 줘요. 곁에 있으면 든든함을 느끼기 쉬워요.`;
  else if (bFills) t3 = `상대에게 옅은 ${ELEMENT_NAME[eb.weakest[0]]}의 기운을 내가 채워 줘요. 상대가 나에게 기대는 장면이 많을 수 있어요.`;
  else { s3 = 12; t3 = "두 사람의 오행이 닮은 편이에요. 서로의 빈칸은 함께 하는 활동으로 채우면 좋아요."; }
  parts.push({ key: "element", label: "오행 · 서로 채움", score: clamp(s3, 0, 30), text: t3 });

  // 4) 띠(년지)
  const ay = a.pillars.year.branch, by = b.pillars.year.branch;
  let s4: number, t4: string;
  if (SIX_HARMONY[ay] === by || (triadGroup(ay) === triadGroup(by) && ay !== by)) { s4 = 14; t4 = "띠끼리 합이 들어 집안과 주변 사람들 사이에서도 잘 어울리는 편이에요."; }
  else if (mod(ay - by, 12) === 6) { s4 = 6; t4 = "띠끼리 충이에요. 서로의 가족이나 친구 문화가 달라 처음엔 어색할 수 있어요."; }
  else { s4 = 10; t4 = "띠 사이에 특별한 당김도 부딪힘도 없어요."; }
  parts.push({ key: "zodiac", label: "띠 · 주변과의 조화", score: s4, text: t4 });

  const rawTotal = s1 + s2 + clamp(s3, 0, 30) + s4; // 최대 24+22+30+14=90, 최소 ≈ 30
  const score = clamp(46 + ((rawTotal - 30) / 60) * 50, 46, 96);
  const grade = score >= 86 ? "서로를 비추는 인연" : score >= 76 ? "결이 잘 맞는 인연" : score >= 64 ? "맞춰 갈수록 깊어지는 인연" : "배우며 자라는 인연";
  const best = parts.slice().sort((x, y) => y.score / maxOf(y.key) - x.score / maxOf(x.key))[0];
  const BOND: Record<string, string> = { stem: "타고난 기질이 서로를 알아보는 힘이에요", branch: "함께 지낼 때 맞물리는 생활의 리듬이에요", element: "서로의 빈칸을 채워 주는 오행이에요", zodiac: "주변 사람들과도 잘 어울리는 띠의 조화예요" };
  const headline = `두 사람을 가장 단단히 묶어 주는 건 ${BOND[best.key]}.`;
  return { score, grade, headline, parts };
}
function maxOf(key: string) {
  return key === "stem" ? 24 : key === "branch" ? 22 : key === "element" ? 30 : 14;
}

/* ------------------------------------------------------------------ */
/* 홍연 인연 찾기: 앞으로 12달 중 인연 기운이 가까워지는 달                */
/* ------------------------------------------------------------------ */

/** 도화: 申子辰→酉, 寅午戌→卯, 巳酉丑→午, 亥卯未→子 */
export const PEACH_BLOSSOM = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0];

export type InyeonMonth = {
  year: number;
  month: number;
  pillar: string;
  score: number;
  reasons: string[];
  crossed: boolean;
};
export type Inyeon = {
  months: InyeonMonth[];
  top: InyeonMonth[];
  partnerElement: number;
  partnerType: string;
  peach: string;
};

const PARTNER_TYPE = [
  "곧게 자라는 나무 같은 사람. 계획을 말로 꺼내고, 함께 자라자고 손을 내미는 쪽이에요.",
  "불빛처럼 따뜻한 사람. 표정이 먼저 말하고, 분위기를 데우는 데 능숙해요.",
  "흙처럼 묵직한 사람. 말보다 행동이 먼저이고, 한번 곁에 서면 오래 머물러요.",
  "단정하고 선이 분명한 사람. 약속을 지키는 방식으로 마음을 보여 줘요.",
  "물처럼 깊은 사람. 듣는 데 익숙하고, 천천히 스며들 듯 가까워져요.",
];

export function inyeonMonths(r: SajuResult, gender: "male" | "female", from = new Date()): Inyeon {
  const dayStem = r.pillars.day.stem, dayBranch = r.pillars.day.branch;
  const me = STEM_ELEMENT[dayStem];
  // 배우자의 자리: 남성은 재성(내가 극하는 기운), 여성은 관성(나를 극하는 기운)
  const partnerElement = gender === "male" ? mod(me + 2, 5) : mod(me + 3, 5);
  const peachSet = new Set([PEACH_BLOSSOM[r.pillars.year.branch], PEACH_BLOSSOM[dayBranch]]);
  const months: InyeonMonth[] = [];
  let y = from.getFullYear(), m = from.getMonth() + 1;
  for (let i = 0; i < 12; i++) {
    // 매달 15일 정오: 그 달의 절(節)이 이미 지난 뒤라 월주가 확실해요.
    const mp = calculateSaju({ year: y, month: m, day: 15, hour: 12, minute: 0 }).pillars.month;
    const reasons: string[] = [];
    let score = 56;
    if (peachSet.has(mp.branch)) { score += 18; reasons.push("도화(桃花)가 드는 달"); }
    if (SIX_HARMONY[dayBranch] === mp.branch) { score += 14; reasons.push("일지와 합이 드는 달"); }
    if (STEM_ELEMENT[mp.stem] === partnerElement) { score += 9; reasons.push("인연의 별이 하늘에 뜨는 달"); }
    if (BRANCH_ELEMENT[mp.branch] === partnerElement) { score += 7; if (!reasons.includes("인연의 별이 하늘에 뜨는 달")) reasons.push("인연의 별이 땅에 내리는 달"); }
    if (stemsCombine(dayStem, mp.stem)) { score += 8; reasons.push("일간과 천간합이 드는 달"); }
    const crossed = mod(mp.branch - dayBranch, 12) === 6;
    if (crossed) score -= 10;
    months.push({ year: y, month: m, pillar: mp.hanja, score: clamp(score, 46, 96), reasons, crossed });
    m++; if (m > 12) { m = 1; y++; }
  }
  const top = months.slice().sort((a, b) => b.score - a.score || (a.year * 12 + a.month) - (b.year * 12 + b.month)).slice(0, 3)
    .sort((a, b) => (a.year * 12 + a.month) - (b.year * 12 + b.month));
  const peach = [...peachSet].map((b) => BRANCHES[b] + "(" + BRANCHES_KO[b] + ")").join(" · ");
  return { months, top, partnerElement, partnerType: PARTNER_TYPE[partnerElement], peach };
}

/* ------------------------------------------------------------------ */
/* 오늘의 운세 카드                                                      */
/* ------------------------------------------------------------------ */

export type DailyCard = {
  date: { year: number; month: number; day: number };
  dayPillar: Pillar;
  /** 카드 이름(예: "정인 · 등불을 건네는 손") */
  title: string;
  glyph: string;
  keywords: string[];
  message: string;
  advice: string;
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
  /** 내 사주로 본 카드인지 */
  personal: boolean;
  score: number;
};

const GOD_CARDS: Record<string, { name: string; glyph: string; kw: string[]; msg: string; adv: string }> = {
  비견: { name: "나란히 선 별", glyph: "比", kw: ["동료", "자립", "제 속도"], msg: "나와 닮은 사람이 곁에 서는 날이에요. 혼자 하던 일을 함께 나누면 생각보다 가벼워져요.", adv: "비교 대신 내 속도를 지켜 보세요." },
  겁재: { name: "겨루는 바람", glyph: "競", kw: ["승부", "추진", "지출 주의"], msg: "힘이 넘치는 만큼 욕심도 커지는 날이에요. 밀어붙일 일과 양보할 일을 한 번만 나눠 보세요.", adv: "큰 결제는 하루만 미뤄 두세요." },
  식신: { name: "차려진 밥상", glyph: "食", kw: ["여유", "맛", "손재주"], msg: "마음이 느긋해지고 손끝이 살아나는 날이에요. 좋아하는 것을 하나 만들거나 맛있는 걸 나눠 보세요.", adv: "오늘의 즐거움을 미루지 마세요." },
  상관: { name: "날 선 붓끝", glyph: "筆", kw: ["표현", "재치", "말조심"], msg: "말과 생각이 빠르게 번뜩이는 날이에요. 아이디어는 적어 두고, 날 선 말은 한 박자 쉬었다 꺼내세요.", adv: "보내기 전에 한 번 더 읽어 보세요." },
  편재: { name: "열린 장터", glyph: "財", kw: ["기회", "사람", "움직임"], msg: "발이 넓어질수록 기회가 붙는 날이에요. 미뤄 둔 약속이나 새로운 자리에 얼굴을 내밀어 보세요.", adv: "기회는 크게, 지출은 작게." },
  정재: { name: "가지런한 곳간", glyph: "積", kw: ["성실", "정리", "작은 보상"], msg: "차곡차곡 쌓은 것이 보이는 날이에요. 가계부나 할 일 목록을 정리하면 마음까지 정돈돼요.", adv: "작은 약속부터 지켜 보세요." },
  편관: { name: "몰아치는 파도", glyph: "波", kw: ["압박", "돌파", "체력"], msg: "해야 할 일이 한꺼번에 밀려오기 쉬운 날이에요. 순서만 정하면 생각보다 잘 넘길 수 있어요.", adv: "가장 무거운 일 하나만 먼저." },
  정관: { name: "바로 선 기둥", glyph: "官", kw: ["신뢰", "인정", "원칙"], msg: "단정하게 처신할수록 빛나는 날이에요. 누군가 당신을 믿고 일을 맡길 수 있어요.", adv: "약속 시간 5분 전에 도착해 보세요." },
  편인: { name: "달빛 아래 서책", glyph: "月", kw: ["직감", "공부", "혼자 시간"], msg: "평소와 다른 생각이 떠오르는 날이에요. 혼자만의 시간을 조금 만들어 두면 좋은 실마리가 보여요.", adv: "떠오른 생각을 메모해 두세요." },
  정인: { name: "건네받은 등불", glyph: "印", kw: ["도움", "배움", "따뜻함"], msg: "누군가의 도움이나 좋은 말이 들어오는 날이에요. 고마운 마음은 오늘 안에 전해 보세요.", adv: "모르는 건 편하게 물어보세요." },
};
const ELEMENT_CARDS = [
  { name: "새순의 날", glyph: "木", kw: ["시작", "연락", "성장"], msg: "새로 시작하는 일에 힘이 실리는 날이에요. 미뤄 둔 연락 하나를 먼저 해 보세요.", adv: "작게라도 첫발을 떼 보세요." },
  { name: "등불의 날", glyph: "火", kw: ["표현", "활기", "만남"], msg: "표현할수록 좋아지는 날이에요. 마음에 있는 말을 조금 더 꺼내 보세요.", adv: "고마운 사람에게 한마디." },
  { name: "대지의 날", glyph: "土", kw: ["안정", "정리", "신뢰"], msg: "서두르기보다 다지는 날이에요. 익숙한 사람과의 시간이 힘이 돼요.", adv: "책상 한 칸을 비워 보세요." },
  { name: "칼끝의 날", glyph: "金", kw: ["결단", "정리", "집중"], msg: "끊을 것과 남길 것을 가리기 좋은 날이에요. 오래 고민한 일을 정리해 보세요.", adv: "하나를 내려놓아 보세요." },
  { name: "깊은 물의 날", glyph: "水", kw: ["휴식", "생각", "직감"], msg: "생각이 깊어지는 날이에요. 무리하기보다 흐름을 지켜보면 좋은 답이 떠올라요.", adv: "일찍 잠자리에 들어 보세요." },
];

export function dailyCard(date: Date, me?: SajuResult | null): DailyCard {
  const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
  // 정오 기준으로 계산해 자정 무렵의 경계 문제를 피해요.
  const today = calculateSaju({ year: y, month: m, day: d, hour: 12, minute: 0 });
  const dp = today.pillars.day;
  const dayEl = STEM_ELEMENT[dp.stem];
  let title: string, glyph: string, kw: string[], msg: string, adv: string, score: number, luckEl: number;
  if (me) {
    const god = tenGodOfStem(me.pillars.day.stem, dp.stem);
    const c = GOD_CARDS[god];
    title = `${god} · ${c.name}`; glyph = c.glyph; kw = c.kw; msg = c.msg; adv = c.adv;
    const bal = elementBalance(me);
    score = 62 + (bal.helpful.includes(dayEl) ? 14 : 0) + (bal.helpful.includes(BRANCH_ELEMENT[dp.branch]) ? 10 : 0)
      + (SIX_HARMONY[me.pillars.day.branch] === dp.branch ? 8 : 0) - (mod(me.pillars.day.branch - dp.branch, 12) === 6 ? 10 : 0);
    luckEl = bal.remedy.element;
  } else {
    const c = ELEMENT_CARDS[dayEl];
    title = c.name; glyph = c.glyph; kw = c.kw; msg = c.msg; adv = c.adv;
    score = 70 + ((dp.stem + dp.branch) % 5) * 4;
    luckEl = mod(dayEl + 1, 5);
  }
  const R = REMEDIES[luckEl];
  return {
    date: { year: y, month: m, day: d },
    dayPillar: dp,
    title, glyph, keywords: kw, message: msg, advice: adv,
    luckyColor: R.color.split(" · ")[0], luckyNumber: R.numbers.split(", ")[0], luckyDirection: R.direction,
    personal: !!me,
    score: clamp(score, 46, 96),
  };
}


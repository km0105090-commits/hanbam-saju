/**
 * 990원 "한 가지 질문 풀이": 정해진 질문 목록에서 하나를 고르면, 사주 근거로 정해진 형식의 결과지를 만듭니다.
 * AI 상담처럼 자유 대화를 하지 않아서 결과가 늘 같은 형식이고, 같은 생일 + 같은 질문이면 같은 답이 나와요.
 *
 * 결과지 구성: 한 줄 답 → 근거(내 사주에서 그 질문을 맡은 기운) → 시기(앞으로 12달 중 두 달) → 해 볼 것 3가지 → 조심할 것 1가지
 * 결제 전에는 "한 줄 답 + 근거"까지만 보여 주고 나머지는 흐리게 둡니다.
 */
import { BRANCH_ELEMENT, STEM_ELEMENT, calculateSaju, type SajuResult } from "./engine.ts";
import { PEACH_BLOSSOM, SIX_HARMONY, elementBalance, ELEMENT_NAME, ELEMENT_HANJA } from "./insights.ts";

export type QCategory = "love" | "reunion" | "work" | "money";
export type Question = { id: string; cat: QCategory; text: string };

export const CATEGORIES: { id: QCategory; label: string; glyph: string }[] = [
  { id: "love", label: "연애", glyph: "戀" },
  { id: "reunion", label: "재회", glyph: "緣" },
  { id: "work", label: "일·직장", glyph: "業" },
  { id: "money", label: "금전", glyph: "財" },
];

export const QUESTIONS: Question[] = [
  { id: "love-when", cat: "love", text: "앞으로 1년 안에 인연이 들어올까요?" },
  { id: "love-some", cat: "love", text: "지금 마음 가는 사람과 이어질 수 있을까요?" },
  { id: "love-type", cat: "love", text: "나와 오래 맞는 사람은 어떤 사람일까요?" },
  { id: "re-again", cat: "reunion", text: "헤어진 사람과 다시 이어질 흐름이 있을까요?" },
  { id: "re-contact", cat: "reunion", text: "먼저 연락해 봐도 괜찮을까요?" },
  { id: "re-move", cat: "reunion", text: "이 마음, 언제쯤 정리될까요?" },
  { id: "work-move", cat: "work", text: "이직이나 퇴사, 지금 움직여도 될까요?" },
  { id: "work-fit", cat: "work", text: "지금 하는 일이 나와 맞는 걸까요?" },
  { id: "work-rise", cat: "work", text: "인정받고 올라가는 때는 언제일까요?" },
  { id: "money-save", cat: "money", text: "앞으로 1년, 돈이 모이는 흐름일까요?" },
  { id: "money-leak", cat: "money", text: "자꾸 돈이 새는 이유가 뭘까요?" },
  { id: "money-side", cat: "money", text: "부업이나 새 수입원을 시작해도 될까요?" },
];

/** 질문 갈래마다 살펴볼 십성 자리 (일간 오행 기준 상대 거리: 0 비겁 1 식상 2 재성 3 관성 4 인성) */
function targetRel(cat: QCategory, gender: "male" | "female") {
  if (cat === "love" || cat === "reunion") return gender === "male" ? 2 : 3;
  if (cat === "work") return 3;
  return 2;
}
const REL_NAME = ["비겁", "식상", "재성", "관성", "인성"];

type Level = 0 | 1 | 2; // 옅음 · 알맞음 · 짙음
const ANSWERS: Record<string, [string, string, string]> = {
  "love-when": [
    "인연의 별이 옅게 깔린 사주라, 기다리기보다 자리를 바꿀 때 인연이 들어오는 편이에요.",
    "인연의 기운이 알맞게 자리 잡고 있어요. 1년 안에 마음이 움직이는 만남이 생길 흐름이 보여요.",
    "인연의 기운이 짙은 사주예요. 사람은 들어오는데, 누구를 곁에 둘지 고르는 눈이 더 중요한 해예요.",
  ],
  "love-some": [
    "상대보다 내 마음이 먼저 앞서기 쉬운 결이에요. 속도를 조금 늦출수록 이어질 여지가 커져요.",
    "서로 당기는 힘이 있는 흐름이에요. 다만 확인하는 말 한마디가 늦어지면 엇갈리기 쉬워요.",
    "끌림은 충분해요. 관건은 마음이 아니라 타이밍이고, 그 타이밍이 다가오는 달이 보여요.",
  ],
  "love-type": [
    "나를 재촉하지 않고 기다려 주는 사람이 오래 맞아요. 처음 설렘보다 편안함을 보세요.",
    "생활의 리듬이 비슷하고, 말보다 행동으로 마음을 보이는 사람과 결이 맞아요.",
    "끌리는 사람과 맞는 사람이 다를 수 있는 사주예요. 다툰 뒤 먼저 손 내미는 사람을 보세요.",
  ],
  "re-again": [
    "끊어진 실을 다시 묶으려면 지금보다 시간이 더 필요한 흐름이에요. 서두를수록 매듭이 단단해져요.",
    "다시 닿을 여지가 남아 있는 흐름이에요. 다만 예전과 같은 방식이면 같은 곳에서 끊어지기 쉬워요.",
    "인연의 실이 아직 팽팽해요. 다시 마주칠 계기가 생기기 쉬운 달이 앞으로 두 번 있어요.",
  ],
  "re-contact": [
    "지금 먼저 닿으면 내 마음만 더 지칠 수 있는 흐름이에요. 한 계절만 나를 먼저 돌봐 주세요.",
    "가벼운 안부 정도는 괜찮은 흐름이에요. 답을 재촉하지 않는 말투가 열쇠예요.",
    "먼저 건네는 말이 닿기 쉬운 흐름이에요. 다만 지난 이야기보다 지금 이야기로 시작하세요.",
  ],
  "re-move": [
    "마음을 오래 품는 사주라 정리가 천천히 와요. 대신 한번 정리되면 다시 흔들리지 않아요.",
    "마음이 한결 가벼워지는 달이 앞으로 1년 안에 보여요. 그 전까지는 일상을 단단히 붙드세요.",
    "새 기운이 빨리 드는 사주예요. 생각보다 이르게, 다른 쪽으로 마음이 옮겨 갈 수 있어요.",
  ],
  "work-move": [
    "지금은 옮기기보다 준비가 남는 흐름이에요. 갈 곳을 먼저 정해 두고 움직이면 손해가 적어요.",
    "움직일 수 있는 흐름이에요. 다만 떠나는 이유보다 가는 이유가 분명할 때 결과가 좋아요.",
    "자리가 바뀌는 기운이 강해요. 머무르면 답답함이 커지고, 준비된 이동은 힘을 받는 흐름이에요.",
  ],
  "work-fit": [
    "정해진 틀보다 내 방식대로 할 수 있는 일에서 힘이 나는 사주예요. 지금 일의 답답함은 틀 때문일 수 있어요.",
    "지금 일과의 궁합은 무난해요. 맡는 범위를 조금 바꾸면 훨씬 잘 맞는 자리가 돼요.",
    "책임과 역할이 분명한 일에서 빛나는 사주예요. 지금 일에서 인정받을 여지가 커요.",
  ],
  "work-rise": [
    "인정은 늦게 오지만 오래 가는 사주예요. 눈에 띄는 성과 하나를 만드는 데 집중하세요.",
    "올라갈 기회가 앞으로 1년 안에 한 번 크게 보여요. 그 달에는 손을 먼저 드는 쪽이 유리해요.",
    "자리와 이름이 커지는 기운이 짙어요. 기회보다 그 무게를 감당할 체력과 사람이 관건이에요.",
  ],
  "money-save": [
    "들어오는 힘보다 지키는 힘을 길러야 하는 사주예요. 모으는 구조를 먼저 만들면 흐름이 바뀌어요.",
    "꾸준히 쌓이는 흐름이에요. 큰 한 방보다 정해진 날 정해진 만큼이 잘 맞아요.",
    "돈의 기운이 짙게 드나드는 사주예요. 많이 들어오는 만큼 크게 나가지 않도록 길목을 지키세요.",
  ],
  "money-leak": [
    "남에게 맞춰 주는 지출이 새는 구멍이 되기 쉬운 사주예요. 거절 한 번이 한 달을 지켜요.",
    "기분이 지칠 때의 작은 보상 지출이 쌓이는 흐름이에요. 지친 날의 결제만 하루 미뤄 보세요.",
    "기회처럼 보이는 지출에 크게 쓰는 결이에요. 큰돈은 하루 이틀 묵혀 두고 결정하세요.",
  ],
  "money-side": [
    "지금은 새 일을 벌이기보다 하던 일에서 단가를 올리는 쪽이 유리한 흐름이에요.",
    "작게 시험해 보기 좋은 흐름이에요. 처음 석 달은 버는 것보다 배우는 데 의미를 두세요.",
    "손재주와 표현이 돈이 되기 쉬운 사주예요. 내가 이미 잘하는 것에서 시작하면 붙어요.",
  ],
};
const ADVICE: Record<QCategory, string[]> = {
  love: ["좋아하는 것을 함께 할 수 있는 모임에 한 번 나가 보세요.", "연락의 속도를 상대에게 맞추기보다 내 리듬을 지켜 보세요.", "끌림이 생긴 날에는 짧더라도 마음을 말로 남겨 두세요."],
  reunion: ["예전 대화를 다시 읽는 시간을 하루 10분으로 정해 두세요.", "연락하기 전에 '무엇을 바라는지'를 한 줄로 적어 보세요.", "공통 지인을 통한 소식은 확인하지 않는 편이 마음에 좋아요."],
  work: ["지금 일에서 내가 맡은 것을 세 줄로 정리해 두세요.", "움직이고 싶은 곳의 사람 한 명에게 먼저 이야기를 들어 보세요.", "성과는 숫자 하나로 기록해 두면 기회가 왔을 때 힘이 돼요."],
  money: ["월급날 바로 옮겨 두는 자동 저축을 하나 만들어 보세요.", "구독·자동결제 목록을 한 번 훑어보세요.", "큰 지출은 '하루 묵히기' 규칙을 정해 두세요."],
};
const CAUTION: Record<QCategory, string> = {
  love: "외로운 날 내린 결정은 다음 날 한 번 더 살펴보세요.",
  reunion: "상대의 마음을 확인하려는 시험은 관계를 더 멀게 만들 수 있어요.",
  work: "감정이 가장 높을 때 사직 의사를 밝히는 일은 피하세요.",
  money: "투자·대출 같은 큰 결정은 사주가 아니라 전문가와 상의해 주세요.",
};

export type OneAnswer = {
  question: Question;
  relName: string;
  element: number;
  count: number;
  level: Level;
  headline: string;
  basis: string;
  months: { year: number; month: number; pillar: string }[];
  advice: string[];
  caution: string;
};

export function questionById(id: string) {
  return QUESTIONS.find((q) => q.id === id) || null;
}

export function answerQuestion(r: SajuResult, gender: "male" | "female", qid: string, from = new Date()): OneAnswer {
  const q = questionById(qid);
  if (!q) throw new Error("없는 질문이에요.");
  const me = STEM_ELEMENT[r.pillars.day.stem];
  const rel = targetRel(q.cat, gender);
  const el = (me + rel) % 5;
  const bal = elementBalance(r);
  const count = bal.counts[el];
  const level: Level = count === 0 ? 0 : count <= 2 ? 1 : 2;
  const per = bal.total === 6 ? "여섯 글자" : "여덟 글자";
  const basis =
    `이 질문은 사주에서 ${REL_NAME[rel]}(${ELEMENT_NAME[el]}·${ELEMENT_HANJA[el]})의 자리가 맡아요. ` +
    `${per} 가운데 이 기운이 ${count === 0 ? "비어 있어서" : count + "개 있어서"} ` +
    (level === 0 ? "하늘의 흐름(해와 달의 기운)이 이 빈칸을 채워 줄 때 일이 움직여요." : level === 1 ? "제 몫을 하는 알맞은 세기예요." : "이 기운이 삶의 큰 줄기를 이루고 있어요.");

  // 앞으로 12달 중 그 기운이 들어오는 달 두 개
  const dayBranch = r.pillars.day.branch;
  const peach = PEACH_BLOSSOM[dayBranch];
  const scored: { year: number; month: number; pillar: string; s: number }[] = [];
  let y = from.getFullYear(), m = from.getMonth() + 1;
  for (let i = 0; i < 12; i++) {
    const mp = calculateSaju({ year: y, month: m, day: 15, hour: 12, minute: 0 }).pillars.month;
    let s = 0;
    if (STEM_ELEMENT[mp.stem] === el) s += 3;
    if (BRANCH_ELEMENT[mp.branch] === el) s += 2;
    if (SIX_HARMONY[dayBranch] === mp.branch) s += 2;
    if ((q.cat === "love" || q.cat === "reunion") && mp.branch === peach) s += 3;
    if ((mp.branch - dayBranch + 12) % 12 === 6) s -= 2;
    scored.push({ year: y, month: m, pillar: mp.hanja, s: s * 100 - i }); // 같은 점수면 가까운 달
    m++; if (m > 12) { m = 1; y++; }
  }
  const months = scored.sort((a, b) => b.s - a.s).slice(0, 2)
    .sort((a, b) => a.year * 12 + a.month - (b.year * 12 + b.month))
    .map(({ year, month, pillar }) => ({ year, month, pillar }));

  return {
    question: q,
    relName: REL_NAME[rel],
    element: el,
    count,
    level,
    headline: ANSWERS[q.id][level],
    basis,
    months,
    advice: ADVICE[q.cat],
    caution: CAUTION[q.cat],
  };
}

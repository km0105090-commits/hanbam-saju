/**
 * 한밤사주 만세력 엔진
 *
 * 계산 순서
 *  1. 음력이면 한국천문연구원(KASI) 기준 음력표로 양력 날짜를 구합니다. (윤달 포함)
 *  2. 한국 표준시 이력·서머타임을 반영해 태어난 순간의 실제 세계 시각(UTC)을 구합니다.
 *  3. 년주·월주: 절기(입춘, 경칩 …)가 바뀌는 "정확한 순간"과 비교해서 정합니다. 날짜가 아니라 분 단위입니다.
 *  4. 일주·시주: 태어난 곳 경도의 지방 평균 태양시(서울은 표준시보다 약 32분 늦음)로 정합니다.
 *  5. 대운: 성별과 년간의 음양으로 순행/역행을 정하고, 가까운 절기까지의 시간으로 대운수를 구합니다.
 *
 * 절기 시각은 lunar-javascript(천문 계산, 분 단위 정확도)로 구하고, 한국천문연구원 발표 시각과
 * 맞는지 tests/saju.test.ts 에서 확인합니다.
 */
import { Solar } from "lunar-javascript";
import KoreanLunarCalendar from "korean-lunar-calendar";
import { koreaWallClockToUtc, meanSolarOffsetMinutes, utcToWallClock, type WallClock } from "./time.ts";

export const STEMS = "甲乙丙丁戊己庚辛壬癸";
export const STEMS_KO = "갑을병정무기경신임계";
export const BRANCHES = "子丑寅卯辰巳午未申酉戌亥";
export const BRANCHES_KO = "자축인묘진사오미신유술해";
/** 천간·지지의 오행 (0 목, 1 화, 2 토, 3 금, 4 수) */
export const STEM_ELEMENT = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
export const BRANCH_ELEMENT = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
export const ELEMENT_KO = ["목", "화", "토", "금", "수"];

/** 시진 버튼(0=자시 … 11=해시)을 고를 때 화면에 보여 줄 한국 표준시 범위 (서울 기준 태양시 보정 반영) */
export const SIJIN_KST = [
  ["자", "23:30~01:30"], ["축", "01:30~03:30"], ["인", "03:30~05:30"], ["묘", "05:30~07:30"],
  ["진", "07:30~09:30"], ["사", "09:30~11:30"], ["오", "11:30~13:30"], ["미", "13:30~15:30"],
  ["신", "15:30~17:30"], ["유", "17:30~19:30"], ["술", "19:30~21:30"], ["해", "21:30~23:30"],
] as const;

const JIEQI_KO: Record<string, string> = {
  冬至: "동지", 小寒: "소한", 大寒: "대한", 立春: "입춘", 雨水: "우수", 惊蛰: "경칩", 春分: "춘분", 清明: "청명",
  谷雨: "곡우", 立夏: "입하", 小满: "소만", 芒种: "망종", 夏至: "하지", 小暑: "소서", 大暑: "대서", 立秋: "입추",
  处暑: "처서", 白露: "백로", 秋分: "추분", 寒露: "한로", 霜降: "상강", 立冬: "입동", 小雪: "소설", 大雪: "대설",
  DONG_ZHI: "동지", XIAO_HAN: "소한", DA_HAN: "대한", LI_CHUN: "입춘", YU_SHUI: "우수", JING_ZHE: "경칩",
};

/** 서울 경도. 출생지를 모르면 이 값을 씁니다. */
export const SEOUL_LONGITUDE = 126.978;

export type Gender = "male" | "female";

export type SajuInput = {
  year: number;
  month: number;
  day: number;
  /** 기본 양력 */
  calendar?: "solar" | "lunar";
  /** 음력 윤달 여부 */
  isLeapMonth?: boolean;
  /** 태어난 시각(한국 벽시계 기준, 0~23). 모르면 null */
  hour?: number | null;
  minute?: number | null;
  /** 정확한 시각 대신 시진 버튼(0=자시 … 11=해시)을 고른 경우 */
  sijin?: number | null;
  /** 출생지 경도. 기본 서울 */
  longitude?: number;
  gender?: Gender;
  /**
   * 밤 11시대(야자시) 처리
   *  - "next-day": 자시가 시작되면 다음 날로 봅니다. (국내 만세력 기본값)
   *  - "split": 밤 11시~자정은 일주를 그날로 두고 시주만 다음 날 자시로 봅니다. (야자시/조자시 구분)
   */
  ziHour?: "next-day" | "split";
  /** 지방 평균 태양시 보정 여부. 기본 true */
  solarTimeCorrection?: boolean;
};

export type Pillar = { stem: number; branch: number; hanja: string; hangul: string };

export type SajuResult = {
  solarDate: { year: number; month: number; day: number };
  lunarDate: { year: number; month: number; day: number; isLeapMonth: boolean } | null;
  timeKnown: boolean;
  pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null };
  /** 기존 화면 코드가 쓰는 형식: [천간 번호, 지지 번호] */
  legacy: { year: [number, number]; month: [number, number]; day: [number, number]; hour: [number, number] | null };
  fiveElements: { wood: number; fire: number; earth: number; metal: number; water: number };
  correction: {
    /** 그 당시 한국 표준시의 UTC 시차(분). 보통 540, 1954~61년은 510 */
    utcOffsetMinutes: number;
    /** 서머타임이 적용된 시각이었는지 */
    daylightSaving: boolean;
    /** 표준시 대비 태양시 차이(분). 서울은 약 -32 */
    solarShiftMinutes: number;
    /** 일주·시주 계산에 쓴 지방 평균 태양시 "YYYY-MM-DD HH:mm" */
    localSolarTime: string | null;
  };
  solarTerm: {
    /** 태어난 순간 직전의 절(節). 월주를 정한 기준 */
    previous: { name: string; kst: string };
    next: { name: string; kst: string };
  };
  /** 시간을 모를 때 그날 절기가 바뀌어 년주/월주가 시간에 따라 달라질 수 있으면 true */
  boundaryWarning: boolean;
  daewoon: {
    forward: boolean;
    startAge: number;
    startDetail: { years: number; months: number; days: number };
    list: { index: number; startAge: number; startYear: number; pillar: Pillar }[];
  } | null;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function pillarFromGanZhi(gz: string): Pillar {
  const stem = STEMS.indexOf(gz[0]);
  const branch = BRANCHES.indexOf(gz[1]);
  if (stem < 0 || branch < 0) throw new Error("간지를 읽지 못했어요: " + gz);
  return { stem, branch, hanja: STEMS[stem] + BRANCHES[branch], hangul: STEMS_KO[stem] + BRANCHES_KO[branch] };
}

function pillarFromIndex(stem: number, branch: number): Pillar {
  return { stem, branch, hanja: STEMS[stem] + BRANCHES[branch], hangul: STEMS_KO[stem] + BRANCHES_KO[branch] };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmtWall(w: WallClock) {
  return `${w.year}-${pad(w.month)}-${pad(w.day)} ${pad(w.hour)}:${pad(w.minute)}`;
}

/** lunar-javascript 의 Solar 객체(베이징 시각, UTC+8) → 한국 표준시 문자열 */
function beijingSolarToKst(s: { getYear(): number; getMonth(): number; getDay(): number; getHour(): number; getMinute(): number; getSecond(): number }) {
  const utc = Date.UTC(s.getYear(), s.getMonth() - 1, s.getDay(), s.getHour(), s.getMinute(), s.getSecond()) - 8 * 3600_000;
  return { utc, kst: fmtWall(utcToWallClock(utc, 540)) };
}

function solarFromWall(w: WallClock) {
  return Solar.fromYmdHms(w.year, w.month, w.day, w.hour, w.minute, w.second);
}

export function lunarToSolar(year: number, month: number, day: number, isLeapMonth = false) {
  const cal = new KoreanLunarCalendar();
  if (!cal.setLunarDate(year, month, day, isLeapMonth)) {
    throw new Error(isLeapMonth ? "그해 그 달에는 윤달이 없어요." : "음력 날짜를 확인해 주세요.");
  }
  return cal.getSolarCalendar() as { year: number; month: number; day: number };
}

export function solarToLunar(year: number, month: number, day: number) {
  const cal = new KoreanLunarCalendar();
  if (!cal.setSolarDate(year, month, day)) return null;
  const l = cal.getLunarCalendar() as { year: number; month: number; day: number; intercalation?: boolean };
  return { year: l.year, month: l.month, day: l.day, isLeapMonth: !!l.intercalation };
}

function validDate(y: number, m: number, d: number) {
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function calculateSaju(input: SajuInput): SajuResult {
  const calendar = input.calendar ?? "solar";
  const longitude = input.longitude ?? SEOUL_LONGITUDE;
  const ziHour = input.ziHour ?? "next-day";
  const useSolarTime = input.solarTimeCorrection ?? true;

  // 1. 양력 날짜
  let solar = { year: input.year, month: input.month, day: input.day };
  if (calendar === "lunar") solar = lunarToSolar(input.year, input.month, input.day, !!input.isLeapMonth);
  if (!validDate(solar.year, solar.month, solar.day)) throw new Error("날짜를 확인해 주세요.");
  const lunarDate = solarToLunar(solar.year, solar.month, solar.day);

  // 2. 태어난 순간
  const hasExact = input.hour != null && input.hour >= 0 && input.hour <= 23;
  const hasSijin = !hasExact && input.sijin != null && input.sijin >= 0 && input.sijin <= 11;
  const timeKnown = hasExact || hasSijin;
  // 시진만 고른 경우: 시진 한가운데 시각(자시는 그날 0시 30분)으로 순간을 잡습니다.
  let hh = 12, mm = 0;
  if (hasExact) { hh = input.hour as number; mm = input.minute ?? 0; }
  else if (hasSijin) {
    const s = input.sijin as number;
    const center = s === 0 ? 30 : s * 120 + 30; // KST 분 단위 (태양시 보정 30분 반영)
    hh = Math.floor(center / 60); mm = center % 60;
  }
  const { utcMs, offsetMinutes } = koreaWallClockToUtc(solar.year, solar.month, solar.day, hh, mm);
  // 한국 표준시는 UTC+9(540분) 또는 UTC+8:30(510분). 그보다 1시간 앞서 있으면 서머타임입니다.
  const daylightSaving = offsetMinutes >= 570;

  // 3. 년주·월주: 절입 순간 기준 (베이징 시각으로 바꿔 계산)
  const beijing = utcToWallClock(utcMs, 480);
  const lunarAtInstant = solarFromWall(beijing).getLunar();
  const ecInstant = lunarAtInstant.getEightChar();
  const yearP = pillarFromGanZhi(ecInstant.getYear());
  const monthP = pillarFromGanZhi(ecInstant.getMonth());

  // 4. 일주·시주: 지방 평균 태양시 기준
  const solarShift = useSolarTime ? Math.round(meanSolarOffsetMinutes(longitude) - offsetMinutes) : 0;
  let dayP: Pillar;
  let hourP: Pillar | null = null;
  let localSolarTime: string | null = null;
  if (hasExact) {
    const local = utcToWallClock(utcMs, offsetMinutes + solarShift);
    localSolarTime = fmtWall(local);
    const ec = solarFromWall(local).getLunar().getEightChar();
    ec.setSect(ziHour === "next-day" ? 1 : 2);
    dayP = pillarFromGanZhi(ec.getDay());
    hourP = pillarFromGanZhi(ec.getTime());
  } else {
    // 날짜만 아는 경우 또는 시진 버튼: 입력한 날짜의 일진 그대로
    const ec = Solar.fromYmdHms(solar.year, solar.month, solar.day, 12, 0, 0).getLunar().getEightChar();
    dayP = pillarFromGanZhi(ec.getDay());
    if (hasSijin) {
      const b = input.sijin as number;
      // 시간 천간: 일간 기준 오자둔(五子遁)
      hourP = pillarFromIndex(mod((dayP.stem % 5) * 2 + b, 10), b);
    }
  }

  // 절기 정보
  const prevJie = lunarAtInstant.getPrevJie(false);
  const nextJie = lunarAtInstant.getNextJie(false);
  const prev = beijingSolarToKst(prevJie.getSolar());
  const next = beijingSolarToKst(nextJie.getSolar());
  const nameKo = (n: string) => JIEQI_KO[n] ?? n;

  // 시간을 모르는데 그날 절입이 있으면 년주/월주가 시간에 따라 달라질 수 있음
  let boundaryWarning = false;
  if (!timeKnown) {
    const dayStart = koreaWallClockToUtc(solar.year, solar.month, solar.day, 0, 0).utcMs;
    const dayEnd = dayStart + 24 * 3600_000;
    boundaryWarning = (prev.utc >= dayStart && prev.utc < dayEnd) || (next.utc >= dayStart && next.utc < dayEnd);
  }

  // 5. 대운
  let daewoon: SajuResult["daewoon"] = null;
  if (input.gender) {
    const yun = ecInstant.getYun(input.gender === "male" ? 1 : 0, 1);
    const list = yun.getDaYun(9)
      .filter((d: { getGanZhi(): string }) => !!d.getGanZhi())
      .map((d: { getIndex(): number; getStartAge(): number; getStartYear(): number; getGanZhi(): string }) => ({
        index: d.getIndex(),
        startAge: d.getStartAge(),
        startYear: d.getStartYear(),
        pillar: pillarFromGanZhi(d.getGanZhi()),
      }));
    daewoon = {
      forward: yun.isForward(),
      startAge: list.length ? list[0].startAge : 0,
      startDetail: { years: yun.getStartYear(), months: yun.getStartMonth(), days: yun.getStartDay() },
      list,
    };
  }

  const counts = [0, 0, 0, 0, 0];
  for (const p of [yearP, monthP, dayP, hourP]) {
    if (!p) continue;
    counts[STEM_ELEMENT[p.stem]]++;
    counts[BRANCH_ELEMENT[p.branch]]++;
  }

  return {
    solarDate: solar,
    lunarDate,
    timeKnown,
    pillars: { year: yearP, month: monthP, day: dayP, hour: hourP },
    legacy: {
      year: [yearP.stem, yearP.branch],
      month: [monthP.stem, monthP.branch],
      day: [dayP.stem, dayP.branch],
      hour: hourP ? [hourP.stem, hourP.branch] : null,
    },
    fiveElements: { wood: counts[0], fire: counts[1], earth: counts[2], metal: counts[3], water: counts[4] },
    correction: {
      utcOffsetMinutes: offsetMinutes,
      daylightSaving,
      solarShiftMinutes: solarShift,
      localSolarTime,
    },
    solarTerm: {
      previous: { name: nameKo(prevJie.getName()), kst: prev.kst },
      next: { name: nameKo(nextJie.getName()), kst: next.kst },
    },
    boundaryWarning,
    daewoon,
  };
}

/** 십성(十星): 일간 기준으로 다른 천간이 어떤 관계인지 */
const TEN_GODS = ["비견", "겁재", "식신", "상관", "편재", "정재", "편관", "정관", "편인", "정인"];
export function tenGodOfStem(dayStem: number, otherStem: number): string {
  const me = STEM_ELEMENT[dayStem], other = STEM_ELEMENT[otherStem];
  const rel = mod(other - me, 5); // 0 같음, 1 내가 생, 2 내가 극, 3 나를 극, 4 나를 생
  const samePolarity = dayStem % 2 === otherStem % 2;
  return TEN_GODS[rel * 2 + (samePolarity ? 0 : 1)];
}

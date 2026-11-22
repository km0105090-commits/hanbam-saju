/**
 * 시간 보정 도구
 *
 * 1) 한국 표준시 변경 이력과 서머타임(일광절약시간)을 반영해, 사람이 적은 "벽시계 시각"을 실제 세계 시각(UTC)으로 바꿉니다.
 *    - 1954-03-21 ~ 1961-08-09: 표준시가 UTC+8:30
 *    - 1948~1951, 1955~1960, 1987~1988: 서머타임(+1시간)
 *    이 이력은 브라우저/Node 에 들어 있는 국제 시간대 데이터(IANA "Asia/Seoul")를 그대로 씁니다.
 * 2) 태어난 곳의 경도로 "지방 평균 태양시"를 구합니다. (서울은 한국 표준시보다 약 32분 늦습니다)
 */

const SEOUL_TZ = "Asia/Seoul";

let fmt: Intl.DateTimeFormat | null = null;
function seoulFormatter() {
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: SEOUL_TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  return fmt;
}

/** 어떤 UTC 시각에 서울의 시계가 UTC 보다 몇 분 앞서 있었는지 */
export function seoulOffsetMinutes(utcMs: number): number {
  const p: Record<string, string> = {};
  for (const part of seoulFormatter().formatToParts(new Date(utcMs))) p[part.type] = part.value;
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
}

/** 한국 벽시계 시각 → UTC 밀리초. 서머타임 경계처럼 애매한 시각도 안정적으로 처리합니다. */
export function koreaWallClockToUtc(y: number, m: number, d: number, hh: number, mm: number): { utcMs: number; offsetMinutes: number } {
  const wall = Date.UTC(y, m - 1, d, hh, mm, 0);
  let guess = wall - 9 * 3600_000;
  for (let i = 0; i < 3; i++) {
    const off = seoulOffsetMinutes(guess);
    const next = wall - off * 60_000;
    if (next === guess) break;
    guess = next;
  }
  return { utcMs: guess, offsetMinutes: seoulOffsetMinutes(guess) };
}

export type WallClock = { year: number; month: number; day: number; hour: number; minute: number; second: number };

/** UTC 밀리초에 고정 시차(분)를 더한 벽시계 시각 */
export function utcToWallClock(utcMs: number, offsetMinutes: number): WallClock {
  const dt = new Date(utcMs + offsetMinutes * 60_000);
  return {
    year: dt.getUTCFullYear(),
    month: dt.getUTCMonth() + 1,
    day: dt.getUTCDate(),
    hour: dt.getUTCHours(),
    minute: dt.getUTCMinutes(),
    second: dt.getUTCSeconds(),
  };
}

/** 경도 → 지방 평균 태양시의 시차(분). 동경 127도면 508분(=UTC+8:28) */
export function meanSolarOffsetMinutes(longitude: number): number {
  return longitude * 4;
}

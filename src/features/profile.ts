/**
 * 무료 기능에서 함께 쓰는 "내 생년월일" 저장과 입력 폼.
 * 이 기기의 브라우저(localStorage)에만 저장하고 서버로 보내지 않아요.
 */
import { calculateSaju, type SajuInput, type SajuResult } from "@/lib/saju";

export type Profile = {
  name: string;
  gender: "male" | "female";
  year: number;
  month: number;
  day: number;
  calendar: "solar" | "lunar";
  leap: boolean;
  /** 0=자시 … 11=해시, 모르면 null */
  sijin: number | null;
};

const KEY = "hanbam-profile";

/** 서울 태양시 보정을 반영한 한국 표준시 기준 시진 */
export const SIJIN = [
  ["자", "23:30~01:30"], ["축", "01:30~03:30"], ["인", "03:30~05:30"], ["묘", "05:30~07:30"],
  ["진", "07:30~09:30"], ["사", "09:30~11:30"], ["오", "11:30~13:30"], ["미", "13:30~15:30"],
  ["신", "15:30~17:30"], ["유", "17:30~19:30"], ["술", "19:30~21:30"], ["해", "21:30~23:30"],
];

export function esc(s: unknown) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Profile;
    return p && p.year && p.month && p.day ? p : null;
  } catch {
    return null;
  }
}
export function saveProfile(p: Profile) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* 저장이 막힌 브라우저: 이번 화면에서만 씁니다 */ }
}
export function clearProfile() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}

export function toInput(p: Profile): SajuInput {
  const inp: SajuInput = { year: p.year, month: p.month, day: p.day, calendar: p.calendar, isLeapMonth: p.leap, gender: p.gender };
  if (p.sijin != null) inp.sijin = p.sijin;
  return inp;
}
export function sajuOf(p: Profile): SajuResult {
  return calculateSaju(toInput(p));
}

export function profileLine(p: Profile) {
  return `${p.calendar === "lunar" ? "음력 " : ""}${p.year}.${p.month}.${p.day}${p.leap ? "(윤달)" : ""} · ${p.sijin == null ? "시간 모름" : SIJIN[p.sijin][0] + "시"} · ${p.gender === "female" ? "여성" : "남성"}`;
}

type FormOpts = { id: string; title?: string; namePlaceholder?: string; value?: Profile | null; compact?: boolean };

/** 이름 · 성별 · 생년월일 · 태어난 시간을 한 번에 받는 폼 */
export function birthFormHTML(o: FormOpts) {
  const v = o.value;
  const now = new Date().getFullYear();
  let ys = '<option value="">년</option>';
  for (let y = now; y >= 1930; y--) ys += `<option${v?.year === y ? " selected" : ""}>${y}</option>`;
  let ms = '<option value="">월</option>';
  for (let m = 1; m <= 12; m++) ms += `<option value="${m}"${v?.month === m ? " selected" : ""}>${m}월</option>`;
  let ds = '<option value="">일</option>';
  for (let d = 1; d <= 31; d++) ds += `<option value="${d}"${v?.day === d ? " selected" : ""}>${d}일</option>`;
  let ss = `<option value="">태어난 시간 모름</option>`;
  SIJIN.forEach((s, i) => { ss += `<option value="${i}"${v?.sijin === i ? " selected" : ""}>${s[0]}시 · ${s[1]}</option>`; });
  const lunar = v?.calendar === "lunar";
  return `<fieldset class="fx-form" id="${o.id}" data-form>
    ${o.title ? `<legend class="fx-form-title">${esc(o.title)}</legend>` : ""}
    <div class="fx-row2">
      <input class="input" name="name" maxlength="12" autocomplete="off" placeholder="${esc(o.namePlaceholder || "이름 또는 닉네임")}" aria-label="${esc(o.namePlaceholder || "이름 또는 닉네임")}" value="${esc(v?.name || "")}">
      <div class="seg" role="group" aria-label="성별">
        <button type="button" data-gender="female" aria-pressed="${v?.gender === "female"}">여성</button><button type="button" data-gender="male" aria-pressed="${v?.gender === "male"}">남성</button>
      </div>
    </div>
    <div class="seg" role="group" aria-label="달력">
      <button type="button" data-cal="solar" aria-pressed="${!lunar}">양력</button><button type="button" data-cal="lunar" aria-pressed="${lunar}">음력</button>
    </div>
    <div class="q-row3">
      <select class="sel" name="year" aria-label="태어난 해">${ys}</select>
      <select class="sel" name="month" aria-label="태어난 달">${ms}</select>
      <select class="sel" name="day" aria-label="태어난 날">${ds}</select>
    </div>
    <div class="fx-row-time">
      <select class="sel" name="sijin" aria-label="태어난 시간">${ss}</select>
      <label class="check"${lunar ? "" : " hidden"} data-leapwrap><input type="checkbox" name="leap"${v?.leap ? " checked" : ""}>윤달</label>
    </div>
    <p class="hint" data-hint></p>
  </fieldset>`;
}

export function wireForm(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-form]").forEach((f) => {
    const seg = (attr: string) => f.querySelectorAll<HTMLButtonElement>(`[${attr}]`).forEach((b) =>
      b.addEventListener("click", () => {
        f.querySelectorAll(`[${attr}]`).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        if (attr === "data-cal") (f.querySelector("[data-leapwrap]") as HTMLElement).hidden = b.dataset.cal !== "lunar";
      }));
    seg("data-gender");
    seg("data-cal");
    f.querySelectorAll("select").forEach((s) => {
      const upd = () => s.classList.toggle("empty", !s.value);
      s.addEventListener("change", upd);
      upd();
    });
  });
}

/** 폼을 읽어 Profile 을 돌려주고, 틀린 곳이 있으면 힌트에 이유를 적고 null */
export function readForm(f: HTMLElement, opts: { needName?: boolean } = {}): Profile | null {
  const hint = f.querySelector<HTMLElement>("[data-hint]")!;
  const val = (n: string) => (f.querySelector(`[name="${n}"]`) as HTMLInputElement | HTMLSelectElement).value.trim();
  const fail = (t: string) => { hint.textContent = t; hint.classList.add("err"); f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake"); return null; };
  const gender = f.querySelector('[data-gender][aria-pressed="true"]')?.getAttribute("data-gender") as Profile["gender"] | undefined;
  const calendar = (f.querySelector('[data-cal][aria-pressed="true"]')?.getAttribute("data-cal") || "solar") as Profile["calendar"];
  const name = val("name");
  if (opts.needName !== false && !name) return fail("이름이나 별명을 적어 주세요.");
  if (!gender) return fail("성별을 골라 주세요. 대운의 방향을 정할 때 써요.");
  const year = +val("year"), month = +val("month"), day = +val("day");
  if (!year || !month || !day) return fail("태어난 해·달·날을 모두 골라 주세요.");
  const sj = val("sijin");
  const p: Profile = { name: name || "나", gender, year, month, day, calendar, leap: calendar === "lunar" && (f.querySelector('[name="leap"]') as HTMLInputElement).checked, sijin: sj === "" ? null : +sj };
  try {
    calculateSaju(toInput(p));
  } catch (e) {
    return fail((e as Error).message || "날짜를 다시 확인해 주세요.");
  }
  hint.textContent = "";
  hint.classList.remove("err");
  return p;
}

/**
 * 무료 기능 화면들: 오늘의 운세 카드 · 내 오행과 대운 · 궁합 보기 · 홍연 인연 찾기 · 한 가지 질문 풀이(990원)
 * 계산은 src/lib/saju (만세력 엔진 + insights + oneQuestion) 에서 하고, 여기서는 보여 주기만 해요.
 */
import {
  BRANCHES, BRANCHES_KO, BRANCH_ELEMENT, STEMS, STEMS_KO, STEM_ELEMENT,
  compatibility, dailyCard, daewoonFlow, elementBalance, elementTrait, inyeonMonths,
  ELEMENT_HANJA, ELEMENT_NAME, REMEDIES,
  CATEGORIES, QUESTIONS, answerQuestion, questionById,
  type SajuResult, type Pillar,
} from "@/lib/saju";
import { PRODUCTS } from "@/config/products";
import { birthFormHTML, esc, loadProfile, profileLine, readForm, sajuOf, saveProfile, wireForm, type Profile } from "./profile";
import { openShareSheet } from "./shareCard";

const EL_KO = ["목", "화", "토", "금", "수"];
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends HTMLElement = HTMLElement>(root: ParentNode, sel: string) => root.querySelector<T>(sel)!;
const won = (n: number) => n.toLocaleString("ko-KR") + "원";
const go = (v: string) => { location.hash = v; };

/* ------------------------------------------------------------------ */
/* 공통 조각                                                             */
/* ------------------------------------------------------------------ */

function head(eyebrow: string, title: string, lead: string) {
  return `<header class="fx-head"><p class="fx-eyebrow">${eyebrow}</p><h1 class="fx-title">${title}</h1><p class="fx-lead">${lead}</p></header>`;
}

function cellHTML(p: Pillar | null, part: "stem" | "branch", k: number) {
  if (!p) return `<span class="fx-cell unknown" style="--k:${k}"><b>?</b><small>모름</small></span>`;
  const idx = part === "stem" ? p.stem : p.branch;
  const el = part === "stem" ? STEM_ELEMENT[idx] : BRANCH_ELEMENT[idx];
  const hz = part === "stem" ? STEMS[idx] : BRANCHES[idx];
  const ko = (part === "stem" ? STEMS_KO[idx] : BRANCHES_KO[idx]) + EL_KO[el];
  return `<span class="fx-cell fe-${el}" style="--k:${k}"><b>${hz}</b><small>${ko}</small></span>`;
}

/** 명식표 (오른쪽부터 년·월·일·시). 글자는 년→시 순서로 한 자씩 떠올라요. */
function mingHTML(r: SajuResult) {
  const P = r.pillars;
  const cols: [string, Pillar | null, number, boolean][] = [["시주", P.hour, 3, false], ["일주", P.day, 2, true], ["월주", P.month, 1, false], ["년주", P.year, 0, false]];
  return `<div class="fx-ming" data-reveal>${cols.map(([lab, p, o, me]) =>
    `<div class="fx-pcol${me ? " me" : ""}"><span class="fx-plab">${lab}${me ? " · 나" : ""}</span>${cellHTML(p, "stem", o * 2)}${cellHTML(p, "branch", o * 2 + 1)}</div>`).join("")}</div>`;
}

/** 화면에 들어오면 .in 클래스를 붙여 등장 애니메이션을 시작 */
function revealOnView(root: HTMLElement) {
  const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
  if (reduce() || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .25 });
  els.forEach((e) => io.observe(e));
}

function countUp(el: HTMLElement, to: number, ms = 1100) {
  if (reduce()) { el.textContent = String(to); return; }
  const t0 = performance.now();
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / ms), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
    el.textContent = String(v);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** 생일이 없으면 폼, 있으면 요약 줄(바꾸기 버튼)을 보여 줍니다. */
function profileGate(body: HTMLElement, opts: { title: string; cta: string; onReady: (p: Profile) => void; needGender?: boolean }) {
  const p = loadProfile();
  if (p) { opts.onReady(p); return; }
  body.innerHTML = `<div class="fx-gate" data-reveal>
      <p class="fx-gate-say">${opts.title}</p>
      ${birthFormHTML({ id: "fxMe", value: null })}
      <button class="btn fx-wide" type="button" data-submit>${opts.cta}</button>
      <p class="note fx-center">이 기기에만 저장하고 어디로도 보내지 않아요. 언제든 지울 수 있어요.</p>
    </div>`;
  wireForm(body);
  revealOnView(body);
  $(body, "[data-submit]").addEventListener("click", () => {
    const np = readForm($(body, "#fxMe"));
    if (!np) return;
    saveProfile(np);
    opts.onReady(np);
    window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
  });
}

function whoBar(p: Profile, rerender: () => void) {
  const div = document.createElement("div");
  div.className = "fx-who";
  div.innerHTML = `<span><b>${esc(p.name)}님</b> · ${esc(profileLine(p))}</span><button type="button" class="fx-link">바꾸기</button>`;
  div.querySelector("button")!.addEventListener("click", () => {
    try { localStorage.removeItem("hanbam-profile"); } catch { /* noop */ }
    rerender();
  });
  return div;
}

function shareBtn(label = "결과 카드로 저장") {
  return `<button class="fx-share-btn" type="button" data-sharecard><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 8v7M9 12l3 3 3-3"/></svg>${label}</button>`;
}

function upsell(prod: keyof typeof PRODUCTS, line: string, btn: string) {
  const P = PRODUCTS[prod];
  return `<aside class="fx-upsell" data-reveal><span class="fx-up-tag">${esc(P.guide)} · ${esc(P.title)}</span><p>${line}</p><button class="btn fx-wide" type="button" data-goto="${prod}">${btn} <span class="fx-price">${won(P.price)}</span></button></aside>`;
}
function wireGoto(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => go(b.dataset.goto!)));
}

/* ------------------------------------------------------------------ */
/* 오늘의 운세 카드                                                       */
/* ------------------------------------------------------------------ */

const FLIP_KEY = "hanbam-flipped";

export function renderToday(body: HTMLElement) {
  const now = new Date();
  const p = loadProfile();
  const me = p ? sajuOf(p) : null;
  const c = dailyCard(now, me);
  const dateKey = `${c.date.year}-${c.date.month}-${c.date.day}${p ? "-me" : ""}`;
  let flipped = false;
  try { flipped = localStorage.getItem(FLIP_KEY) === dateKey; } catch { /* noop */ }
  const dp = c.dayPillar, el = STEM_ELEMENT[dp.stem];
  const wk = "일월화수목금토"[now.getDay()];

  body.innerHTML = `<div class="tab-pad fx-today">
    ${head(`${c.date.year}. ${c.date.month}. ${c.date.day} (${wk}) · ${dp.hangul}일`, "오늘의 카드", p ? `${esc(p.name)}님의 일간과 오늘의 일진이 만나 고른 한 장이에요.` : "오늘의 일진으로 고른 한 장이에요. 생일을 넣으면 내 사주로 골라 드려요.")}
    <div class="fx-deck${flipped ? " flipped" : ""}" data-deck>
      <button class="fx-card" type="button" aria-label="${flipped ? "오늘의 카드" : "카드 뒤집기"}" aria-pressed="${flipped}">
        <span class="fx-card-in">
          <span class="fx-face fx-back" aria-hidden="${flipped}">
            <svg viewBox="0 0 200 300" aria-hidden="true">
              <rect x="8" y="8" width="184" height="284" class="b1"/><rect x="15" y="15" width="170" height="270" class="b2"/>
              <circle cx="100" cy="150" r="38" class="moon"/><circle cx="100" cy="150" r="52" class="b2"/>
              ${[0, 1, 2, 3, 4].map((i) => { const a = (-90 + i * 72) * Math.PI / 180; return `<circle cx="${(100 + Math.cos(a) * 70).toFixed(1)}" cy="${(150 + Math.sin(a) * 70).toFixed(1)}" r="6" class="dot"/>`; }).join("")}
              <path d="M40 60 L62 44 L84 58 M116 242 L138 256 L160 238" class="con"/>
              <circle cx="40" cy="60" r="1.8" class="st"/><circle cx="62" cy="44" r="2.4" class="st"/><circle cx="84" cy="58" r="1.6" class="st"/>
              <circle cx="116" cy="242" r="1.6" class="st"/><circle cx="138" cy="256" r="2.4" class="st"/><circle cx="160" cy="238" r="1.8" class="st"/>
              <path d="M22 22h16M22 22v16M178 22h-16M178 22v16M22 278h16M22 278v-16M178 278h-16M178 278v-16" class="b1"/>
            </svg>
            <span class="fx-back-hint">눌러서 뒤집기</span>
          </span>
          <span class="fx-face fx-front fe-${el}" aria-hidden="${!flipped}">
            <span class="fx-front-top"><span>${dp.hanja}日</span><span>${c.score}</span></span>
            <span class="fx-glyph">${c.glyph}</span>
            <span class="fx-card-name">${esc(c.title)}</span>
            <span class="fx-kws">${c.keywords.map((k) => `<i>${esc(k)}</i>`).join("")}</span>
          </span>
        </span>
      </button>
      <span class="fx-shadow" aria-hidden="true"></span>
    </div>
    <div class="fx-reading" ${flipped ? "" : "hidden"} data-reading>
      <p class="fx-msg">${esc(c.message)}</p>
      <dl class="fx-lucky"><div><dt>행운의 색</dt><dd>${esc(c.luckyColor)}</dd></div><div><dt>숫자</dt><dd>${esc(c.luckyNumber)}</dd></div><div><dt>방향</dt><dd>${esc(c.luckyDirection)}</dd></div></dl>
      <p class="fx-adv"><span>오늘의 한 걸음</span>${esc(c.advice)}</p>
      ${shareBtn("오늘의 카드 저장")}
    </div>
    <div data-after></div>
  </div>`;

  const deck = $(body, "[data-deck]"), card = $<HTMLButtonElement>(body, ".fx-card"), reading = $(body, "[data-reading]");
  card.addEventListener("click", () => {
    if (deck.classList.contains("flipped")) return;
    deck.classList.add("flipped");
    card.setAttribute("aria-pressed", "true");
    card.setAttribute("aria-label", "오늘의 카드");
    body.querySelector(".fx-back")!.setAttribute("aria-hidden", "true");
    body.querySelector(".fx-front")!.setAttribute("aria-hidden", "false");
    try { localStorage.setItem(FLIP_KEY, dateKey); } catch { /* noop */ }
    setTimeout(() => { reading.hidden = false; reading.classList.add("in"); }, reduce() ? 0 : 640);
  });
  $(body, "[data-sharecard]").addEventListener("click", () => openShareSheet({
    slug: "today", eyebrow: `${c.date.month}월 ${c.date.day}일 · ${dp.hanja}日 오늘의 카드`, glyph: c.glyph, title: c.title,
    lines: [c.message, `오늘의 한 걸음 — ${c.advice}`], chips: [c.luckyColor, `숫자 ${c.luckyNumber}`, c.luckyDirection],
  }));

  const after = $(body, "[data-after]");
  if (!p) {
    after.innerHTML = `<div class="fx-mini-cta"><p>생일을 넣으면 <b>내 일간</b>과 오늘의 일진이 만나는 카드를 뽑아 드려요.</p><button type="button" class="btn btn-ghost fx-wide" data-me>내 사주로 다시 뽑기</button></div>`;
    $(after, "[data-me]").addEventListener("click", () => {
      profileGate(after, { title: "오늘의 카드를 내 사주로 뽑을게요.", cta: "내 카드 보기", onReady: () => renderToday(body) });
    });
  } else {
    after.appendChild(whoBar(p, () => renderToday(body)));
    after.insertAdjacentHTML("beforeend", `<div class="fx-links"><button type="button" data-goto="chart">내 오행 · 대운 보기 →</button><button type="button" data-goto="one">한 가지 질문 풀이 →</button></div>`);
    wireGoto(after);
  }
}

/* ------------------------------------------------------------------ */
/* 내 오행 밸런스 + 대운 타임라인                                           */
/* ------------------------------------------------------------------ */

function radarHTML(counts: number[]) {
  const max = Math.max(4, ...counts);
  const R = 92, cx = 120, cy = 118;
  const pt = (i: number, v: number) => { const a = (-90 + i * 72) * Math.PI / 180; return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v]; };
  const ring = (v: number) => [0, 1, 2, 3, 4].map((i) => pt(i, v).map((n) => n.toFixed(1)).join(",")).join(" ");
  const poly = counts.map((c, i) => pt(i, Math.max(.08, c / max)).map((n) => n.toFixed(1)).join(",")).join(" ");
  const labels = counts.map((c, i) => {
    const [x, y] = pt(i, 1.24);
    return `<g class="fx-rl fe-${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><text class="hz" y="-2">${ELEMENT_HANJA[i]}</text><text class="ct" y="15">${ELEMENT_NAME[i]} ${c}</text></g>`;
  }).join("");
  const dots = counts.map((c, i) => { const [x, y] = pt(i, Math.max(.08, c / max)); return `<circle class="fx-rd fe-${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`; }).join("");
  // 상생 화살표: 木→火→土→金→水→木
  const arcs = [0, 1, 2, 3, 4].map((i) => {
    const a1 = (-90 + i * 72 + 14) * Math.PI / 180, a2 = (-90 + (i + 1) * 72 - 14) * Math.PI / 180, r = R * 1.24;
    return `<path class="fx-arc" d="M${(cx + Math.cos(a1) * r).toFixed(1)} ${(cy + Math.sin(a1) * r).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + Math.cos(a2) * r).toFixed(1)} ${(cy + Math.sin(a2) * r).toFixed(1)}"/>`;
  }).join("");
  return `<svg class="fx-radar" viewBox="0 0 240 240" role="img" aria-label="오행 분포: ${counts.map((c, i) => ELEMENT_NAME[i] + " " + c).join(", ")}">
    <defs><linearGradient id="fxRadarFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e7c1" stop-opacity=".32"/><stop offset="1" stop-color="#b88d4f" stop-opacity=".12"/></linearGradient></defs>
    ${[.25, .5, .75, 1].map((v) => `<polygon class="fx-rg" points="${ring(v)}"/>`).join("")}
    ${[0, 1, 2, 3, 4].map((i) => { const [x, y] = pt(i, 1); return `<line class="fx-rg" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join("")}
    ${arcs}
    <g class="fx-rpoly"><polygon points="${poly}"/>${dots}</g>
    ${labels}
  </svg>`;
}

export function renderChart(body: HTMLElement) {
  profileGate(body, {
    title: "생일을 알려 주시면 여덟 글자를 세우고, 오행의 균형과 10년마다 바뀌는 대운의 물길을 그려 드릴게요.",
    cta: "내 명식 펼치기",
    onReady: (p) => chartBody(body, p),
  });
}

function chartBody(body: HTMLElement, p: Profile) {
  const r = sajuOf(p);
  const bal = elementBalance(r);
  const flow = daewoonFlow(r);
  const R = bal.remedy;
  const now = new Date().getFullYear();
  const cur = flow.find((f) => f.current);

  body.innerHTML = `<div class="tab-pad fx-chart">
    ${head("내 명식 · 오행 · 대운", `${esc(p.name)}님의 여덟 글자`, `${STEMS_KO[r.pillars.day.stem]}${EL_KO[bal.dayElement]} 일간 · ${r.pillars.day.hangul}일주${r.timeKnown ? "" : " · 시간을 몰라 여섯 글자로 봤어요"}`)}
    <div data-who></div>
    ${mingHTML(r)}
    <section class="fx-sec" data-reveal>
      <div class="fx-sec-h"><span class="no">01</span><h2>오행 밸런스</h2></div>
      <div class="fx-bal">
        ${radarHTML(bal.counts)}
        <ul class="fx-pct">${bal.percents.map((v, i) => `<li class="fe-${i}${bal.missing.includes(i) ? " zero" : ""}"><b>${ELEMENT_HANJA[i]}</b><span class="tr"><i style="--w:${v}%"></i></span><em>${v}%</em></li>`).join("")}</ul>
      </div>
      <p class="fx-p">${esc(bal.summary)}</p>
      <p class="fx-trait"><b>${ELEMENT_HANJA[bal.strongest]}</b>${esc(elementTrait(bal.strongest))}</p>
    </section>
    <section class="fx-sec" data-reveal>
      <div class="fx-sec-h"><span class="no">02</span><h2>보태면 좋은 기운 · ${ELEMENT_NAME[R.element]}(${ELEMENT_HANJA[R.element]})</h2></div>
      <div class="fx-remedy">
        <div><small>색</small><b>${R.color}</b></div><div><small>방향</small><b>${R.direction}</b></div>
        <div><small>맛</small><b>${R.taste}</b></div><div><small>숫자</small><b>${R.numbers}</b></div>
        <div class="wide"><small>생활 습관</small><b>${R.habit}</b></div>
      </div>
      <p class="note">전통 오행 풀이에서 쓰는 생활 속 보완법이에요. 건강 문제는 꼭 전문가와 상의해 주세요.</p>
    </section>
    <section class="fx-sec" data-reveal>
      <div class="fx-sec-h"><span class="no">03</span><h2>대운 타임라인</h2></div>
      ${cur ? `<p class="fx-p">지금은 <b>${cur.hanja} 대운</b>(${cur.startYear}~${cur.endYear}) · <b>${esc(cur.theme)}</b>을 지나고 있어요. ${esc(cur.detail)}</p>` : `<p class="fx-p">대운은 ${r.daewoon?.startAge ?? "-"}세부터 10년마다 바뀌어요.</p>`}
      <div class="fx-dw" tabindex="0" aria-label="대운 흐름, 좌우로 넘겨 보세요">
        <svg class="fx-dw-line" aria-hidden="true"><path class="area"/><path class="ln"/></svg>
        <ol>${flow.map((f) => `<li class="${f.current ? "cur" : ""}${f.endYear < now ? " past" : ""}" data-score="${f.score}">
          <span class="age">${f.startAge}세</span>
          <span class="gz"><b class="fe-${f.stemElement}">${f.hanja[0]}</b><b class="fe-${f.branchElement}">${f.hanja[1]}</b></span>
          <span class="yr">${f.startYear}–${String(f.endYear).slice(2)}</span>
          <span class="god">${f.tenGod}</span>
          <span class="th">${esc(f.theme)}</span>
        </li>`).join("")}</ol>
      </div>
      <p class="note">점선 위 곡선은 내 사주에 도움이 되는 기운이 얼마나 드는지를 그린 흐름이에요. 좋고 나쁨을 단정하지 않아요.</p>
    </section>
    <div class="fx-actions">${shareBtn("나의 오행 카드 저장")}</div>
    ${upsell("life", "10년마다 바뀌는 물길이 내 삶의 어디를 지나는지, 백운 선생이 대운 하나하나를 짚어 드려요.", "인생사주로 자세히 보기")}
  </div>`;

  $(body, "[data-who]").appendChild(whoBar(p, () => renderChart(body)));
  revealOnView(body);
  wireGoto(body);
  drawDaewoonLine(body);
  $(body, "[data-sharecard]").addEventListener("click", () => openShareSheet({
    slug: "ohaeng", eyebrow: `${r.pillars.day.hanja}일주 · 나의 오행`, glyph: ELEMENT_HANJA[bal.strongest] + ELEMENT_HANJA[R.element],
    title: `${ELEMENT_NAME[bal.strongest]}이 짙고, ${ELEMENT_NAME[R.element]}을 보태면 좋은 사주`,
    lines: [bal.percents.map((v, i) => `${ELEMENT_HANJA[i]} ${v}%`).join("  ·  "), cur ? `지금은 ${cur.hanja} 대운 · ${cur.theme}` : ""].filter(Boolean),
    chips: [R.color.split(" · ")[0], R.direction, `숫자 ${R.numbers}`],
  }));
}

function drawDaewoonLine(body: HTMLElement) {
  const wrap = body.querySelector<HTMLElement>(".fx-dw");
  if (!wrap) return;
  const svg = wrap.querySelector("svg")!, items = Array.from(wrap.querySelectorAll<HTMLElement>("li"));
  const draw = () => {
    const ol = wrap.querySelector("ol")!;
    const w = ol.scrollWidth, h = 64;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.style.width = w + "px";
    const pts = items.map((li) => [li.offsetLeft + li.offsetWidth / 2, h - 8 - ((+li.dataset.score! - 46) / 50) * (h - 20)]);
    if (!pts.length) return;
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
      d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
    }
    svg.querySelector(".ln")!.setAttribute("d", d);
    svg.querySelector(".area")!.setAttribute("d", `${d} L${pts[pts.length - 1][0]} ${h} L${pts[0][0]} ${h} Z`);
  };
  draw();
  const cur = wrap.querySelector<HTMLElement>("li.cur");
  if (cur) wrap.scrollLeft = cur.offsetLeft - wrap.clientWidth / 2 + cur.offsetWidth / 2;
  let t = 0;
  window.addEventListener("resize", () => { clearTimeout(t); t = window.setTimeout(draw, 150); });
}

/* ------------------------------------------------------------------ */
/* 궁합 보기                                                              */
/* ------------------------------------------------------------------ */

export function renderGunghap(body: HTMLElement) {
  const me = loadProfile();
  body.innerHTML = `<div class="tab-pad fx-gh">
    ${head("두 사람의 일간 · 일지 · 오행 · 띠", "궁합 보기", "두 사람의 생일만으로 네 갈래 궁합을 짚어 드려요. 무료예요.")}
    <div class="fx-gh-forms" data-reveal>
      ${birthFormHTML({ id: "ghA", title: "나", value: me })}
      <div class="fx-gh-knot" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 4 C 8 14, 32 26, 20 36" /></svg></div>
      ${birthFormHTML({ id: "ghB", title: "그 사람", namePlaceholder: "그 사람 이름 또는 별명", value: null })}
      <button class="btn fx-wide" type="button" data-submit>궁합 보기</button>
    </div>
    <div data-result></div>
  </div>`;
  wireForm(body);
  revealOnView(body);
  $(body, "[data-submit]").addEventListener("click", () => {
    const a = readForm($(body, "#ghA"));
    if (!a) return;
    const b = readForm($(body, "#ghB"));
    if (!b) return;
    saveProfile(a);
    showGunghap($(body, "[data-result]"), a, b);
  });
}

function showGunghap(out: HTMLElement, a: Profile, b: Profile) {
  const A = sajuOf(a), B = sajuOf(b);
  const c = compatibility(A, B);
  const maxes: Record<string, number> = { stem: 24, branch: 22, element: 30, zodiac: 14 };
  const C = 2 * Math.PI * 54;
  out.innerHTML = `<section class="fx-gh-res" data-reveal>
    <div class="fx-duo">
      <div class="fx-seal"><small>${esc(a.name)}</small><b class="fe-${STEM_ELEMENT[A.pillars.day.stem]}">${A.pillars.day.hanja}</b><small>${A.pillars.day.hangul}일주</small></div>
      <svg class="fx-thread" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M4 40 C 50 4, 70 76, 100 40 S 150 4, 196 40" pathLength="1"/></svg>
      <div class="fx-seal"><small>${esc(b.name)}</small><b class="fe-${STEM_ELEMENT[B.pillars.day.stem]}">${B.pillars.day.hanja}</b><small>${B.pillars.day.hangul}일주</small></div>
    </div>
    <div class="fx-score">
      <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" class="tr"/><circle cx="60" cy="60" r="54" class="fg" style="stroke-dasharray:${C};stroke-dashoffset:${C};--to:${C * (1 - c.score / 100)}"/></svg>
      <div><b data-count>0</b><small>점</small></div>
    </div>
    <p class="fx-grade">${esc(c.grade)}</p>
    <p class="fx-p fx-center">${esc(c.headline)}</p>
    <ul class="fx-parts">${c.parts.map((pt) => `<li><div class="row"><b>${esc(pt.label)}</b><span class="tr"><i style="--w:${Math.round(pt.score / maxes[pt.key] * 100)}%"></i></span></div><p>${esc(pt.text)}</p></li>`).join("")}</ul>
    <div class="fx-actions">${shareBtn("궁합 카드 저장")}</div>
    ${upsell("match", "끌림과 부딪힘이 반복되는 장면, 2027년 두 사람에게 같이 오는 기운까지 홍연이 열한 장으로 풀어 드려요.", "궁합사주 전체 풀이")}
  </section>`;
  revealOnView(out);
  wireGoto(out);
  requestAnimationFrame(() => {
    out.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
    setTimeout(() => { out.querySelector(".fx-gh-res")!.classList.add("in"); countUp($(out, "[data-count]"), c.score); }, reduce() ? 0 : 450);
  });
  $(out, "[data-sharecard]").addEventListener("click", () => openShareSheet({
    slug: "gunghap", eyebrow: "두 사람의 궁합", glyph: STEMS[A.pillars.day.stem] + STEMS[B.pillars.day.stem], title: c.grade, score: c.score, accent: "#c9483a",
    lines: [c.parts[0].text, c.parts[1].text],
  }));
}

/* ------------------------------------------------------------------ */
/* 홍연 인연 찾기                                                          */
/* ------------------------------------------------------------------ */

export function renderInyeon(body: HTMLElement) {
  profileGate(body, {
    title: "홍연이에요. 당신 새끼손가락에 묶인 붉은 실이 앞으로 열두 달 동안 어디를 지나는지 따라가 볼게요.",
    cta: "붉은 실 따라가기",
    onReady: (p) => inyeonBody(body, p),
  });
}

function inyeonBody(body: HTMLElement, p: Profile) {
  const r = sajuOf(p);
  const iy = inyeonMonths(r, p.gender);
  const topKey = new Set(iy.top.map((m) => m.year * 100 + m.month));
  const n = iy.months.length;
  // 실이 지나는 길: 화면 가운데를 좌우로 굽이치며 내려가요.
  const rowH = 76, H = rowH * n + 40, W = 320;
  const nodes = iy.months.map((m, i) => ({ m, x: i % 2 ? W * .72 : W * .28, y: 40 + i * rowH }));
  let d = `M${W / 2} 0`;
  nodes.forEach((nd, i) => {
    const px = i ? nodes[i - 1].x : W / 2, py = i ? nodes[i - 1].y : 0;
    d += ` C${px} ${py + rowH * .55} ${nd.x} ${nd.y - rowH * .55} ${nd.x} ${nd.y}`;
  });
  const knot = (x: number, y: number) => `<g class="knot" transform="translate(${x} ${y})"><path d="M-9 -3 C -4 -12, 4 -12, 9 -3 C 4 6, -4 6, -9 -3 Z M-6 4 L -12 14 M6 4 L 12 14"/></g>`;

  body.innerHTML = `<div class="tab-pad fx-iy">
    ${head("홍연의 붉은 실", "인연 찾기", `${esc(p.name)}님의 실이 앞으로 열두 달 동안 가장 팽팽해지는 달을 따라가 봤어요.`)}
    <div data-who></div>
    <div class="fx-iy-top" data-reveal>
      ${iy.top.map((m) => `<div><small>${m.year}년</small><b>${m.month}월</b><span>${esc(m.reasons[0] || "기운이 차오르는 달")}</span></div>`).join("")}
    </div>
    <div class="fx-iy-map" data-iymap>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
        <defs><filter id="iyGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
        <path class="th-glow" d="${d}" filter="url(#iyGlow)" pathLength="1"/>
        <path class="th" d="${d}" pathLength="1"/>
        ${nodes.map((nd) => topKey.has(nd.m.year * 100 + nd.m.month) ? knot(nd.x, nd.y) : `<circle class="nd${nd.m.crossed ? " x" : ""}" cx="${nd.x}" cy="${nd.y}" r="4"/>`).join("")}
      </svg>
      <ol>${nodes.map((nd, i) => {
        const hot = topKey.has(nd.m.year * 100 + nd.m.month);
        return `<li class="${i % 2 ? "r" : "l"}${hot ? " hot" : ""}${nd.m.crossed ? " x" : ""}" style="top:${(nd.y / H) * 100}%">
          <b>${nd.m.month}월</b><small>${nd.m.year} · ${nd.m.pillar}월</small>
          ${hot ? `<span>${esc(nd.m.reasons.slice(0, 2).join(" · "))}</span>` : nd.m.crossed ? "<span>마음이 엇갈리기 쉬운 달</span>" : ""}
        </li>`;
      }).join("")}</ol>
    </div>
    <section class="fx-sec" data-reveal>
      <div class="fx-sec-h"><span class="no">緣</span><h2>실 끝에 있는 사람의 결</h2></div>
      <p class="fx-p"><b class="fx-el fe-${iy.partnerElement}">${ELEMENT_HANJA[iy.partnerElement]}</b>${esc(iy.partnerType)}</p>
      <p class="note">도화(桃花) 자리: ${esc(iy.peach)} · ${p.gender === "female" ? "관성" : "재성"}(인연의 별) · 일지 합을 함께 봤어요. 날짜를 단정하지 않아요.</p>
    </section>
    <div class="fx-actions">${shareBtn("인연 카드 저장")}</div>
    ${upsell("love", "그 달에 다가오는 사람이 어떤 얼굴인지, 내 연애 패턴과 함께 한결이 열한 장으로 짚어 드려요.", "연애사주 전체 풀이")}
  </div>`;
  $(body, "[data-who]").appendChild(whoBar(p, () => renderInyeon(body)));
  revealOnView(body);
  wireGoto(body);
  threadOnScroll($(body, "[data-iymap]"));
  $(body, "[data-sharecard]").addEventListener("click", () => openShareSheet({
    slug: "inyeon", eyebrow: "홍연의 붉은 실 · 인연이 가까워지는 달", glyph: "緣", accent: "#c9483a",
    title: iy.top.map((m) => `${m.month}월`).join(" · "), lines: [iy.partnerType],
  }));
}

/** 붉은 실이 스크롤에 맞춰 그려지고, 지나간 달이 하나씩 켜져요. */
function threadOnScroll(map: HTMLElement) {
  const paths = map.querySelectorAll<SVGPathElement>(".th, .th-glow");
  const items = Array.from(map.querySelectorAll<HTMLElement>("li"));
  const marks = Array.from(map.querySelectorAll<SVGElement>(".nd, .knot"));
  if (reduce()) { map.classList.add("done"); items.forEach((i) => i.classList.add("on")); marks.forEach((m) => m.classList.add("on")); return; }
  let raf = 0;
  const upd = () => {
    raf = 0;
    if (!map.isConnected) { window.removeEventListener("scroll", onScroll); return; }
    const r = map.getBoundingClientRect(), vh = window.innerHeight;
    const k = Math.max(0, Math.min(1, (vh * .72 - r.top) / r.height));
    paths.forEach((p) => { p.style.strokeDashoffset = String(1 - k); });
    items.forEach((li, i) => { const on = k >= (i + .6) / items.length; li.classList.toggle("on", on); marks[i]?.classList.toggle("on", on); });
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(upd); };
  window.addEventListener("scroll", onScroll, { passive: true });
  upd();
}

/* ------------------------------------------------------------------ */
/* 990원 한 가지 질문 풀이                                                  */
/* ------------------------------------------------------------------ */

export function renderOne(body: HTMLElement) {
  const P = PRODUCTS.one;
  let cat = CATEGORIES[0].id;
  body.innerHTML = `<div class="tab-pad fx-one">
    ${head(`${won(P.price)} · 질문 하나, 결과지 한 장`, "한 가지 질문 풀이", "가장 궁금한 질문 하나를 고르면, 내 사주에서 그 질문을 맡은 기운으로 답과 시기를 적어 드려요.")}
    <ol class="fx-steps" aria-label="진행 순서"><li class="on">질문 고르기</li><li>생일 확인</li><li>결과지</li></ol>
    <div class="fx-cats" role="tablist" aria-label="질문 갈래">${CATEGORIES.map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${c.id}"><b>${c.glyph}</b>${c.label}</button>`).join("")}</div>
    <div class="fx-qs" data-qs role="tabpanel"></div>
    <div data-next></div>
  </div>`;
  const qs = $(body, "[data-qs]"), next = $(body, "[data-next]");
  const steps = body.querySelectorAll(".fx-steps li");
  const step = (n: number) => steps.forEach((s, i) => s.classList.toggle("on", i <= n));
  const drawQs = () => {
    qs.innerHTML = QUESTIONS.filter((q) => q.cat === cat).map((q) => `<button type="button" class="fx-q" data-q="${q.id}"><span>${esc(q.text)}</span><i aria-hidden="true">→</i></button>`).join("");
    qs.querySelectorAll<HTMLElement>("[data-q]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.q!)));
  };
  body.querySelectorAll<HTMLButtonElement>("[data-cat]").forEach((b) => b.addEventListener("click", () => {
    cat = b.dataset.cat as typeof cat;
    body.querySelectorAll("[data-cat]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    drawQs();
  }));
  drawQs();

  function pick(qid: string) {
    const q = questionById(qid)!;
    qs.querySelectorAll("[data-q]").forEach((b) => b.classList.toggle("on", (b as HTMLElement).dataset.q === qid));
    step(1);
    const p = loadProfile();
    next.innerHTML = `<section class="fx-sec fx-one-confirm" data-reveal>
      <p class="fx-picked"><small>고른 질문</small>${esc(q.text)}</p>
      ${birthFormHTML({ id: "oneMe", value: p })}
      <button class="btn fx-wide" type="button" data-submit>결과지 받기</button>
    </section>`;
    wireForm(next);
    revealOnView(next);
    next.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
    $(next, "[data-submit]").addEventListener("click", () => {
      const me = readForm($(next, "#oneMe"));
      if (!me) return;
      saveProfile(me);
      step(2);
      showOne(next, me, qid);
    });
  }
}

function showOne(out: HTMLElement, p: Profile, qid: string) {
  const r = sajuOf(p);
  const a = answerQuestion(r, p.gender, qid);
  const P = PRODUCTS.one;
  const today = new Date();
  out.innerHTML = `<article class="fx-sheet" data-reveal>
    <header><span class="seal" aria-hidden="true">한밤</span><div><small>한 가지 질문 풀이 · ${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}</small><b>${esc(p.name)}님의 결과지</b></div></header>
    <p class="fx-q-big">“${esc(a.question.text)}”</p>
    <p class="fx-ans">${esc(a.headline)}</p>
    <div class="fx-basis"><span>근거</span>${esc(a.basis)}</div>
    <div class="fx-locked">
      <div class="fx-fog" aria-hidden="true">
        <h3>움직이기 좋은 때</h3><p>${a.months.map((m) => `${m.year}년 ${m.month}월`).join(", ")} 무렵, 그 기운이 하늘에서 내려와요.</p>
        <h3>해 볼 것 세 가지</h3><ol>${a.advice.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
        <h3>조심할 것</h3><p>${esc(a.caution)}</p>
      </div>
      <div class="fx-unlock">
        <b>시기 · 해 볼 것 · 조심할 것</b>
        <p>결과지 나머지 세 칸이 남아 있어요.</p>
        <button class="btn fx-wide" type="button" data-pay>${won(P.price)}으로 이어서 읽기</button>
      </div>
    </div>
    <footer class="note">같은 생일과 같은 질문에는 언제나 같은 결과지가 나와요. 참고용 풀이이며, 중요한 결정은 본인의 판단과 전문가 상담을 함께 해 주세요.</footer>
  </article>
  <div class="fx-links"><button type="button" data-again>다른 질문 고르기 →</button></div>`;
  revealOnView(out);
  out.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
  $(out, "[data-again]").addEventListener("click", () => { out.innerHTML = ""; document.querySelector(".fx-qs")?.scrollIntoView({ behavior: "smooth", block: "center" }); });
  $(out, "[data-pay]").addEventListener("click", () => openPaySheet("one", () => {
    out.querySelector(".fx-locked")!.classList.add("open");
  }));
}

/** 결제 시트: 기존 결제 화면과 같은 모양. 토스 결제 연결 전까지는 샘플 안내만 보여 줘요. */
function openPaySheet(prod: keyof typeof PRODUCTS, onSample: () => void) {
  const P = PRODUCTS[prod];
  const back = document.createElement("div");
  back.className = "sheet-back";
  back.innerHTML = `<div class="sheet pad" role="dialog" aria-modal="true" aria-label="${esc(P.title)} 결제"><div class="grab"></div>
    <h2 style="font-size:19px">${esc(P.title)}</h2>
    <div class="sheet-price"><span>질문 1개 · 결과지 1장 · 웹</span><b>${won(P.price)}</b></div>
    <div class="agree"><label class="all"><input type="checkbox" id="fxAgAll"><span>아래 내용에 모두 동의해요</span></label>
    <label><input type="checkbox" class="ag"><span>[필수] 이용약관에 동의해요</span></label>
    <label><input type="checkbox" class="ag"><span>[필수] 개인정보 수집·이용(생년월일시)에 동의해요</span></label>
    <label><input type="checkbox" class="ag"><span>[필수] 디지털 콘텐츠라 결과지가 열리면 청약철회가 제한된다는 점을 확인했어요</span></label></div>
    <button class="btn" type="button" data-pay disabled>${won(P.price)} 결제하기</button>
    <p class="sheet-msg" hidden data-msg>샘플 화면이라 실제 결제는 하지 않아요. 실제 사이트에서는 토스 결제 후 결과지가 바로 열려요. 아래 버튼으로 열린 모습을 미리 볼 수 있어요.</p>
    <button class="btn btn-ghost" type="button" data-preview hidden>열린 결과지 미리 보기</button>
    <button class="skip" type="button" data-close>닫기</button></div>`;
  document.body.appendChild(back);
  const all = back.querySelector<HTMLInputElement>("#fxAgAll")!, ags = back.querySelectorAll<HTMLInputElement>(".ag"), pay = back.querySelector<HTMLButtonElement>("[data-pay]")!;
  const sync = () => { const ok = Array.from(ags).every((a) => a.checked); all.checked = ok; pay.disabled = !ok; };
  all.addEventListener("change", () => { ags.forEach((a) => (a.checked = all.checked)); sync(); });
  ags.forEach((a) => a.addEventListener("change", sync));
  const close = () => { back.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  pay.addEventListener("click", () => { (back.querySelector("[data-msg]") as HTMLElement).hidden = false; (back.querySelector("[data-preview]") as HTMLElement).hidden = false; });
  back.querySelector("[data-preview]")!.addEventListener("click", () => { close(); onSample(); });
  back.querySelector("[data-close]")!.addEventListener("click", close);
  back.addEventListener("click", (e) => { if (e.target === back) close(); });
}

/* ------------------------------------------------------------------ */
/* 유료 풀이 결과 화면에 공유 카드 버튼 달기                                   */
/* ------------------------------------------------------------------ */

type LegacyState = { name?: string; prod?: string; birth?: string; cal?: string; leap?: boolean; time?: string | null; sj?: number | null; gender?: string };

export function decorateResult(s: LegacyState) {
  const body = document.getElementById("resultBody");
  if (!body || !s?.birth || body.querySelector("[data-sharecard]")) return;
  const [y, m, d] = s.birth.split(".").map(Number);
  const prof: Profile = { name: s.name || "나", gender: s.gender === "남성" ? "male" : "female", year: y, month: m, day: d, calendar: s.cal === "음력" ? "lunar" : "solar", leap: !!s.leap, sijin: s.sj != null && s.sj >= 0 ? s.sj : null };
  let r: SajuResult;
  try { r = sajuOf(prof); } catch { return; }
  const bal = elementBalance(r);
  const title = (PRODUCTS as Record<string, { title: string }>)[s.prod || "love"]?.title || "한밤사주";
  const anchor = body.querySelector(".locked-wrap");
  const box = document.createElement("div");
  box.className = "fx-actions fx-res-share";
  box.innerHTML = shareBtn("무료 미리보기를 카드로 저장");
  if (anchor) anchor.before(box); else body.appendChild(box);
  box.querySelector("button")!.addEventListener("click", () => openShareSheet({
    slug: s.prod || "result", eyebrow: `${title} · 무료 미리보기`, glyph: r.pillars.day.hanja,
    title: `${STEMS_KO[r.pillars.day.stem]}${EL_KO[bal.dayElement]} 일간, ${ELEMENT_NAME[bal.strongest]}의 기운이 짙은 사람`,
    lines: [bal.summary], chips: [REMEDIES[bal.remedy.element].color.split(" · ")[0], REMEDIES[bal.remedy.element].direction],
  }));
}

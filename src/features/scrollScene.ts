/**
 * 첫 화면 아래 "밤하늘 → 다섯 별자리 → 오행 → 여덟 글자" 스크롤 장면.
 *
 * 구조: 높이가 긴 <section> 안에 화면 크기의 무대(sticky)를 두고, 스크롤 진행도(0~1)로 장면을 바꿉니다.
 *  - 0.00~0.30  별이 쏟아지듯 다가오는 밤하늘 (canvas)
 *  - 0.14~0.62  별 다섯 무리가 선으로 이어져 별자리가 되고, 가운데로 모여 木火土金水 로 바뀜 (SVG)
 *  - 0.60~1.00  지금 이 순간의 명식(여덟 글자)이 한 글자씩 떠오름
 * 움직임 줄이기를 켠 사용자에게는 세 장면을 차례로 쌓아서 정지 화면으로 보여 줘요.
 */
import { calculateSaju, STEMS, BRANCHES, STEMS_KO, BRANCHES_KO, STEM_ELEMENT, BRANCH_ELEMENT } from "@/lib/saju";

const EL_HZ = "木火土金水";
const EL_NM = ["나무", "불", "흙", "쇠", "물"];
const EL_COLOR = ["#9cbf9a", "#d9705f", "#d6b46e", "#e3dccd", "#8fa6c9"];

/** 오행마다 손으로 배치한 작은 별자리(가운데 기준 좌표)와 잇는 순서 */
const CONSTELLATIONS: { pts: [number, number][]; links: [number, number][] }[] = [
  { pts: [[-26, 30], [-8, 8], [4, -16], [20, -34], [-14, -22], [24, 4]], links: [[0, 1], [1, 2], [2, 3], [2, 4], [1, 5]] }, // 木: 뻗는 가지
  { pts: [[0, -36], [-20, -4], [20, -6], [-28, 26], [28, 24], [0, 14]], links: [[0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 5]] }, // 火: 불꽃
  { pts: [[-30, -16], [30, -16], [32, 20], [-32, 20], [0, 2]], links: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 2]] }, // 土: 네모진 땅
  { pts: [[0, -34], [-26, 18], [26, 18], [0, 4], [0, 34]], links: [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4]] }, // 金: 칼날
  { pts: [[-34, -6], [-16, -20], [2, -4], [18, -18], [34, -2], [10, 26]], links: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]] }, // 水: 물결
];

const R_PENT = 118;
const vertex = (i: number) => {
  const a = (-90 + i * 72) * Math.PI / 180;
  return [Math.cos(a) * R_PENT, Math.sin(a) * R_PENT] as const;
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
/** a~b 구간에서 0→1 */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** a~b 동안 보였다가 c~d 동안 사라짐 */
const window4 = (p: number, a: number, b: number, c: number, d: number) => Math.min(seg(p, a, b), 1 - seg(p, c, d));

function buildSVG() {
  const defs = `<defs>
    <radialGradient id="sxStar"><stop offset="0" stop-color="#fffaf0"/><stop offset=".4" stop-color="#f6e7c1" stop-opacity=".9"/><stop offset="1" stop-color="#f6e7c1" stop-opacity="0"/></radialGradient>
    <linearGradient id="sxGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8ecc9"/><stop offset=".4" stop-color="#e3c27f"/><stop offset=".65" stop-color="#b88d4f"/><stop offset="1" stop-color="#f1dca6"/></linearGradient>
    <filter id="sxGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;
  // 상생 원과 상극 별(오각성)
  const ring = `<circle class="sx-ring" cx="0" cy="0" r="${R_PENT}" pathLength="1"/>`;
  const star = [0, 2, 4, 1, 3, 0].map((i) => vertex(i).map((v) => v.toFixed(1)).join(",")).join(" ");
  const penta = `<polyline class="sx-penta" points="${star}" pathLength="1"/>`;
  let groups = "";
  CONSTELLATIONS.forEach((c, i) => {
    const [cx, cy] = vertex(i);
    const lines = c.links.map(([a, b]) => `<line class="sx-link" x1="${c.pts[a][0]}" y1="${c.pts[a][1]}" x2="${c.pts[b][0]}" y2="${c.pts[b][1]}" pathLength="1"/>`).join("");
    const dots = c.pts.map(([x, y], k) => `<circle class="sx-dot" data-x="${x}" data-y="${y}" cx="${x}" cy="${y}" r="${k === 0 ? 4.2 : 3}"/>`).join("");
    groups += `<g class="sx-con" data-i="${i}" transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)})">
      <g class="sx-lines">${lines}</g><g class="sx-dots">${dots}</g>
      <circle class="sx-halo" r="34" fill="${EL_COLOR[i]}"/>
      <text class="sx-hz" y="2" fill="url(#sxGold)">${EL_HZ[i]}</text>
      <text class="sx-nm" y="46">${EL_NM[i]}</text>
    </g>`;
  });
  return `${defs}<g class="sx-geo">${ring}${penta}</g>${groups}`;
}

function buildMing(now: Date) {
  const r = calculateSaju({ year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate(), hour: now.getHours(), minute: now.getMinutes() });
  const P = r.pillars;
  // 화면은 오른쪽부터 년·월·일·시 (전통 명식 순서), 떠오르는 순서도 년 → 시
  const cols: [string, typeof P.year | null][] = [["시주", P.hour], ["일주", P.day], ["월주", P.month], ["년주", P.year]];
  const order = { 년주: 0, 월주: 1, 일주: 2, 시주: 3 } as Record<string, number>;
  const cell = (hz: string, ko: string, el: number, k: number) =>
    `<span class="sx-ch" style="--k:${k};--c:${EL_COLOR[el]}"><b>${hz}</b><small>${ko}</small></span>`;
  const html = cols.map(([lab, p]) => {
    if (!p) return "";
    const o = order[lab];
    return `<div class="sx-col"><span class="sx-lab">${lab}</span>${cell(STEMS[p.stem], STEMS_KO[p.stem], STEM_ELEMENT[p.stem], o * 2)}${cell(BRANCHES[p.branch], BRANCHES_KO[p.branch], BRANCH_ELEMENT[p.branch], o * 2 + 1)}</div>`;
  }).join("");
  const stamp = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${now.getHours()}시 ${String(now.getMinutes()).padStart(2, "0")}분`;
  return { html, stamp };
}

type Star = { x: number; y: number; z: number; s: number; tw: number };

export function setupScrollScene() {
  const root = document.getElementById("sx");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  const stage = root.querySelector<HTMLElement>(".sx-stage")!;
  const canvas = root.querySelector<HTMLCanvasElement>(".sx-sky")!;
  const svg = root.querySelector<SVGSVGElement>(".sx-art")!;
  const ming = root.querySelector<HTMLElement>(".sx-ming-grid")!;
  const stamp = root.querySelector<HTMLElement>("[data-stamp]")!;
  const lines = Array.from(root.querySelectorAll<HTMLElement>(".sx-line"));
  const bar = root.querySelector<HTMLElement>(".sx-progress i")!;
  const cta = root.querySelector<HTMLElement>(".sx-cta")!;
  svg.innerHTML = buildSVG();
  const m = buildMing(new Date());
  ming.innerHTML = m.html;
  stamp.textContent = m.stamp;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cons = Array.from(svg.querySelectorAll<SVGGElement>(".sx-con"));
  const chars = Array.from(ming.querySelectorAll<HTMLElement>(".sx-ch"));
  const ringEl = svg.querySelector<SVGCircleElement>(".sx-ring")!;
  const pentaEl = svg.querySelector<SVGPolylineElement>(".sx-penta")!;
  const geo = svg.querySelector<SVGGElement>(".sx-geo")!;

  /* ---------- 별 캔버스 ---------- */
  const ctx = canvas.getContext("2d", { alpha: false })!;
  let stars: Star[] = [];
  let cw = 0, ch = 0, dpr = 1;
  function size() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cw = stage.clientWidth; ch = stage.clientHeight;
    canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
    const n = Math.round(Math.min(520, (cw * ch) / 1800));
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    stars = Array.from({ length: n }, () => ({ x: (rnd() - .5) * 2, y: (rnd() - .5) * 2, z: .15 + rnd() * .85, s: rnd(), tw: rnd() * Math.PI * 2 }));
  }

  let progress = 0, shown = progress, running = false, visible = false, raf = 0;
  function drawSky(t: number) {
    const p = shown;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, ch);
    g.addColorStop(0, "#070a16"); g.addColorStop(.6, "#0d1122"); g.addColorStop(1, "#14110e");
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
    // 은하수 띠
    ctx.save();
    ctx.translate(cw / 2, ch / 2); ctx.rotate(-.5 + p * .25);
    const mw = ctx.createLinearGradient(0, -ch * .18, 0, ch * .18);
    mw.addColorStop(0, "rgba(150,140,220,0)"); mw.addColorStop(.5, `rgba(190,175,240,${.09 + .05 * (1 - p)})`); mw.addColorStop(1, "rgba(150,140,220,0)");
    ctx.fillStyle = mw; ctx.fillRect(-cw * 1.2, -ch * .18, cw * 2.4, ch * .36);
    ctx.restore();
    // 다가오는 별: 진행도에 따라 화면 밖으로 퍼지며 줌인
    const zoom = 1 + easeInOut(seg(p, 0, .34)) * 2.4 + seg(p, .58, .7) * 1.4;
    const rot = p * .35;
    const cos = Math.cos(rot), sin = Math.sin(rot);
    const half = Math.max(cw, ch) * .62;
    const dim = 1 - seg(p, .14, .3) * .45; // 별자리가 나올 때 배경 별은 살짝 물러남
    for (const s of stars) {
      const k = zoom * (.6 + (1 - s.z) * .9);
      const x = (s.x * cos - s.y * sin) * half * k + cw / 2;
      const y = (s.x * sin + s.y * cos) * half * k + ch / 2;
      if (x < -4 || y < -4 || x > cw + 4 || y > ch + 4) continue;
      const tw = .65 + .35 * Math.sin(t / 900 + s.tw);
      const a = (.25 + s.s * .7) * tw * dim;
      const r = (.4 + s.s * 1.3) * Math.min(2.2, .8 + k * .35);
      ctx.fillStyle = s.s > .93 ? `rgba(246,231,193,${a})` : `rgba(220,222,255,${a})`;
      ctx.fillRect(x - r / 2, y - r / 2, r, r);
    }
    // 장면 끝: 금빛으로 물듦
    const warm = seg(p, .62, .78);
    if (warm > 0) {
      const wg = ctx.createRadialGradient(cw / 2, ch * .52, 10, cw / 2, ch * .52, Math.max(cw, ch) * .7);
      wg.addColorStop(0, `rgba(226,194,128,${.18 * warm})`); wg.addColorStop(1, "rgba(226,194,128,0)");
      ctx.fillStyle = wg; ctx.fillRect(0, 0, cw, ch);
    }
  }

  /* ---------- 진행도 → 장면 ---------- */
  function apply(p: number) {
    // 글귀
    const w = [window4(p, .02, .08, .2, .27), window4(p, .3, .37, .56, .62), seg(p, .66, .72)];
    lines.forEach((el, i) => {
      el.style.opacity = String(w[i]);
      el.style.transform = `translate3d(0, ${(1 - w[i]) * 16}px, 0)`;
      el.style.visibility = w[i] > .01 ? "visible" : "hidden";
    });
    // 별자리
    const svgOut = seg(p, .6, .7);
    svg.style.opacity = String(1 - svgOut);
    svg.style.transform = `scale(${1 + easeInOut(svgOut) * .9}) rotate(${p * 24 - 6}deg)`;
    cons.forEach((g, i) => {
      const appear = ease(seg(p, .13 + i * .02, .22 + i * .02));
      const draw = ease(seg(p, .2 + i * .025, .34 + i * .025));
      const gather = easeInOut(seg(p, .4, .5));
      const hz = ease(seg(p, .45, .54));
      g.querySelectorAll<SVGCircleElement>(".sx-dot").forEach((d) => {
        const x = +d.dataset.x! * (1 - gather), y = +d.dataset.y! * (1 - gather);
        d.setAttribute("cx", x.toFixed(2)); d.setAttribute("cy", y.toFixed(2));
        d.style.opacity = String(appear * (1 - hz));
      });
      g.querySelectorAll<SVGLineElement>(".sx-link").forEach((l) => {
        l.style.strokeDashoffset = String(1 - draw);
        l.style.opacity = String(1 - gather);
      });
      const hzEl = g.querySelector<SVGTextElement>(".sx-hz")!, nm = g.querySelector<SVGTextElement>(".sx-nm")!, halo = g.querySelector<SVGCircleElement>(".sx-halo")!;
      hzEl.style.opacity = String(hz); hzEl.style.transform = `scale(${.6 + hz * .4})`;
      nm.style.opacity = String(seg(p, .5, .56));
      halo.style.opacity = String(hz * .16);
    });
    ringEl.style.strokeDashoffset = String(1 - ease(seg(p, .5, .6)));
    pentaEl.style.strokeDashoffset = String(1 - ease(seg(p, .53, .62)));
    geo.style.opacity = String(1 - svgOut);
    // 명식
    const mingOn = seg(p, .62, .68);
    ming.parentElement!.style.opacity = String(mingOn);
    ming.parentElement!.style.visibility = mingOn > .01 ? "visible" : "hidden";
    chars.forEach((c) => {
      const k = +c.style.getPropertyValue("--k");
      const t = ease(seg(p, .66 + k * .026, .72 + k * .026));
      c.style.opacity = String(t);
      c.style.transform = `translate3d(0, ${(1 - t) * 18}px, 0) scale(${.92 + t * .08})`;
      c.style.filter = t < 1 ? `blur(${(1 - t) * 8}px)` : "";
      c.classList.toggle("lit", t > .98);
    });
    cta.classList.toggle("on", p > .9);
    bar.style.transform = `scaleY(${p})`;
  }

  function measure() {
    const r = root!.getBoundingClientRect();
    const total = r.height - stage.clientHeight;
    progress = total > 0 ? clamp01(-r.top / total) : 0;
  }

  function frame(t: number) {
    // 스크롤을 부드럽게 따라가요 (관성)
    shown += (progress - shown) * .14;
    if (Math.abs(progress - shown) < .0004) shown = progress;
    apply(shown);
    drawSky(t);
    raf = visible ? requestAnimationFrame(frame) : 0;
    running = !!raf;
  }
  function kick() { if (!running && visible) { running = true; raf = requestAnimationFrame(frame); } }

  function setStatic(on: boolean) {
    root!.classList.toggle("sx--static", on);
    if (on) {
      cancelAnimationFrame(raf); running = false;
      // 정지 화면: 오행 도형과 명식을 다 보여 줘요
      size(); shown = .56; drawSky(0);
      apply(.6);
      svg.style.opacity = "1"; svg.style.transform = "none";
      lines.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; el.style.visibility = "visible"; });
      ming.parentElement!.style.opacity = "1"; ming.parentElement!.style.visibility = "visible";
      chars.forEach((c) => { c.style.opacity = "1"; c.style.transform = "none"; c.style.filter = ""; c.classList.add("lit"); });
      cta.classList.add("on");
    } else {
      size(); measure(); shown = progress; apply(shown); kick();
    }
  }

  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible && !reduce.matches) { measure(); kick(); }
  }, { rootMargin: "100px 0px" });
  io.observe(root);
  window.addEventListener("scroll", () => { if (!reduce.matches) { measure(); kick(); } }, { passive: true });
  let rt = 0;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = window.setTimeout(() => { size(); measure(); if (reduce.matches) setStatic(true); else kick(); }, 120); });
  reduce.addEventListener?.("change", () => setStatic(reduce.matches));
  setStatic(reduce.matches);
}

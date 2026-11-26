/**
 * 새 기능 연결점. 샘플 화면 스크립트(public/legacy/app.js)가 화면을 바꿀 때 window.HanbamFeatures 를 불러요.
 *  - show(view): 오늘의 운세(today) · 내 명식(chart) · 궁합(gunghap) · 인연(inyeon) · 한 가지 질문(one) 화면을 그림
 *  - result(state): 유료 풀이 무료 미리보기에 공유 카드 버튼을 붙임
 */
import { setupScrollScene } from "./scrollScene";
import { decorateResult, renderChart, renderGunghap, renderInyeon, renderOne, renderToday } from "./views";

export const FEATURE_VIEWS = ["chart", "gunghap", "inyeon", "one"] as const;

const RENDER: Record<string, (el: HTMLElement) => void> = {
  today: renderToday,
  chart: renderChart,
  gunghap: renderGunghap,
  inyeon: renderInyeon,
  one: renderOne,
};

function show(view: string) {
  const fn = RENDER[view];
  const body = document.getElementById(view === "today" ? "todayBody" : `fx-${view}`);
  if (fn && body) {
    try { fn(body); } catch (e) { console.error(e); body.innerHTML = '<p class="note" style="padding:40px 0;text-align:center">화면을 그리지 못했어요. 새로고침해 주세요.</p>'; }
    return true;
  }
  if (view === "home") setupScrollScene();
  return false;
}

export function installFeatures() {
  window.HanbamFeatures = { views: [...FEATURE_VIEWS], show, result: decorateResult };
  // 홈이 이미 떠 있으면 바로 장면을 준비해요.
  if (document.getElementById("v-home") && !document.getElementById("v-home")!.hidden) setupScrollScene();
}

declare global {
  interface Window {
    HanbamFeatures?: { views: string[]; show: (v: string) => boolean; result: typeof decorateResult };
  }
}

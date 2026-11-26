"use client";

import { useEffect } from "react";
import * as saju from "@/lib/saju";
import { installFeatures } from "@/features";

declare global {
  interface Window {
    HanbamSaju?: typeof saju;
    __hanbamBooted?: boolean;
  }
}

/** 만세력 엔진을 화면 스크립트에 연결하고, 샘플 화면 스크립트를 한 번만 실행합니다. */
export default function LegacyBoot() {
  useEffect(() => {
    window.HanbamSaju = saju;
    installFeatures();
    startHeroVideo();
    if (window.__hanbamBooted) return;
    window.__hanbamBooted = true;
    const s = document.createElement("script");
    s.src = "/legacy/app.js";
    document.body.appendChild(s);
  }, []);
  return null;
}

/**
 * 첫 화면 영상: public/media/hero-night.mp4 가 있으면 그림 위로 서서히 나타나고,
 * 없거나 재생이 막히면 그림(천천히 다가가는 효과)이 그대로 보입니다.
 */
function startHeroVideo() {
  const v = document.querySelector<HTMLVideoElement>(".hx-video");
  if (!v) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.remove(); return; }
  v.muted = true;
  const on = () => v.classList.add("on");
  if (!v.paused && v.readyState > 2) on();
  v.addEventListener("playing", on, { once: true });
  v.addEventListener("error", () => v.remove(), true);
  v.play().catch(() => {});
}

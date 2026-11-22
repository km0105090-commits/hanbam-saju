"use client";

import { useEffect } from "react";
import * as saju from "@/lib/saju";

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
    if (window.__hanbamBooted) return;
    window.__hanbamBooted = true;
    const s = document.createElement("script");
    s.src = "/legacy/app.js";
    document.body.appendChild(s);
  }, []);
  return null;
}

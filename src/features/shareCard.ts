/**
 * 결과 공유 카드: 인스타그램 스토리 크기(1080×1920) 이미지를 브라우저에서 바로 그립니다.
 * 서버로 아무것도 보내지 않아요. 공유가 되는 휴대폰은 공유 창을, 아니면 이미지 저장을 띄워요.
 */
export type ShareSpec = {
  /** 파일 이름에 쓰는 짧은 영문 */
  slug: string;
  eyebrow: string;
  /** 가운데 큰 한자 (1~4자) */
  glyph: string;
  title: string;
  lines: string[];
  /** 아래쪽 작은 칩 (예: 행운의 색) */
  chips?: string[];
  /** 0~100 점수를 띠로 보여 줄 때 */
  score?: number;
  accent?: string;
};

const W = 1080, H = 1920;

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const out: string[] = [];
  let line = "";
  // 한국어는 어절(띄어쓰기) 단위로 줄을 바꿔요.
  for (const word of text.split(" ")) {
    const t = line ? line + " " + word : word;
    if (ctx.measureText(t).width > maxW && line) { out.push(line); line = word; } else line = t;
  }
  if (line) out.push(line);
  return out;
}

async function fontsReady() {
  try {
    await Promise.all([
      document.fonts.load('900 300px "Noto Serif KR"', "火"),
      document.fonts.load('800 64px "Pretendard Variable"', "한밤"),
      document.fonts.load('500 40px "Pretendard Variable"', "한밤"),
    ]);
  } catch { /* 글꼴이 없어도 기본 글꼴로 그려요 */ }
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
}

export async function drawShareCard(spec: ShareSpec): Promise<HTMLCanvasElement> {
  await fontsReady();
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const hanja = '"Noto Serif KR", serif';
  const sans = '"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif';
  const accent = spec.accent || "#ff4a6b";

  // 한밤 남색 바탕 + 위는 라벤더, 아래는 체리빛 번짐
  ctx.fillStyle = "#090b17"; ctx.fillRect(0, 0, W, H);
  const g1 = ctx.createRadialGradient(W * .85, 120, 20, W * .85, 120, 900);
  g1.addColorStop(0, "rgba(183,176,255,.34)"); g1.addColorStop(1, "rgba(183,176,255,0)");
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
  const g2 = ctx.createRadialGradient(W * .1, H - 160, 20, W * .1, H - 160, 1000);
  g2.addColorStop(0, "rgba(255,61,99,.42)"); g2.addColorStop(1, "rgba(255,61,99,0)");
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  const r = rng(spec.glyph.charCodeAt(0) * 31 + spec.title.length);
  for (let i = 0; i < 160; i++) {
    const x = r() * W, y = r() * H * .75, s = r();
    ctx.fillStyle = `rgba(255,255,255,${.12 + s * .5})`;
    ctx.beginPath(); ctx.arc(x, y, .6 + s * 1.6, 0, Math.PI * 2); ctx.fill();
  }

  // 상단: 둥근 로고 + 이름
  const lg = ctx.createLinearGradient(96, 120, 176, 200);
  lg.addColorStop(0, "#ff6a7f"); lg.addColorStop(1, "#d61f52");
  ctx.fillStyle = lg; rrect(ctx, 96, 124, 76, 76, 24); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `800 24px ${sans}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("한", 134, 150); ctx.fillText("밤", 134, 176);
  ctx.textAlign = "left"; ctx.font = `800 46px ${sans}`; ctx.fillText("한밤사주", 196, 164);

  // 유리판
  const px = 72, py = 300, pw = W - 144, ph = 1380;
  ctx.fillStyle = "rgba(255,255,255,.06)"; rrect(ctx, px, py, pw, ph, 64); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 2; ctx.stroke();

  // 머리말 칩
  ctx.textAlign = "center"; ctx.font = `700 32px ${sans}`;
  const ew = ctx.measureText(spec.eyebrow).width + 64;
  ctx.fillStyle = "rgba(255,74,107,.2)"; rrect(ctx, (W - ew) / 2, 370, ew, 64, 32); ctx.fill();
  ctx.fillStyle = "#ff9aae"; ctx.fillText(spec.eyebrow, W / 2, 403);

  // 큰 한자 (명조 포인트)
  const n = [...spec.glyph].length;
  const size = n <= 1 ? 340 : n === 2 ? 270 : n === 3 ? 210 : 170;
  ctx.font = `900 ${size}px ${hanja}`;
  const gg = ctx.createLinearGradient(W / 2 - 260, 540, W / 2 + 260, 900);
  gg.addColorStop(0, "#ffe2a3"); gg.addColorStop(.55, "#ffb8c6"); gg.addColorStop(1, accent);
  ctx.fillStyle = gg; ctx.shadowColor = "rgba(255,74,107,.45)"; ctx.shadowBlur = 70;
  ctx.fillText(spec.glyph, W / 2, 730);
  ctx.shadowBlur = 0;

  // 제목
  ctx.fillStyle = "#ffffff"; ctx.font = `800 66px ${sans}`;
  ctx.letterSpacing = "-2px";
  let y = 1010;
  for (const ln of wrap(ctx, spec.title, pw - 120)) { ctx.fillText(ln, W / 2, y); y += 84; }
  ctx.letterSpacing = "0px";

  // 점수 막대 (둥근 끝)
  if (spec.score != null) {
    y += 6;
    const bw = 600, bx = (W - bw) / 2;
    ctx.fillStyle = "rgba(255,255,255,.12)"; rrect(ctx, bx, y, bw, 16, 8); ctx.fill();
    const sg = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    sg.addColorStop(0, "#ffb8c6"); sg.addColorStop(1, accent);
    ctx.fillStyle = sg; rrect(ctx, bx, y, Math.max(16, bw * spec.score / 100), 16, 8); ctx.fill();
    ctx.font = `800 52px ${sans}`; ctx.fillStyle = "#fff";
    ctx.fillText(`${spec.score}점`, W / 2, y + 80);
    y += 140;
  } else y += 24;

  // 본문
  ctx.fillStyle = "rgba(246,244,255,.82)"; ctx.font = `500 37px ${sans}`;
  for (const para of spec.lines) {
    for (const ln of wrap(ctx, para, pw - 150)) { ctx.fillText(ln, W / 2, y); y += 56; }
    y += 16;
    if (y > 1540) break;
  }

  // 칩 (알약)
  if (spec.chips?.length) {
    ctx.font = `700 30px ${sans}`;
    const pads = spec.chips.map((t) => ctx.measureText(t).width + 60);
    const total = pads.reduce((a, b) => a + b, 0) + (pads.length - 1) * 14;
    let x = (W - total) / 2;
    const cy = Math.max(y + 6, 1560);
    spec.chips.forEach((t, i) => {
      ctx.fillStyle = "rgba(255,255,255,.1)"; rrect(ctx, x, cy, pads[i], 66, 33); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.fillText(t, x + pads[i] / 2, cy + 34);
      x += pads[i] + 14;
    });
  }

  // 바닥
  ctx.fillStyle = "rgba(246,244,255,.5)"; ctx.font = `600 28px ${sans}`;
  ctx.fillText("나도 보러 가기 · 한밤사주", W / 2, H - 130);
  return c;
}

/** 미리보기 시트를 띄우고 공유/저장 버튼을 붙입니다. */
export async function openShareSheet(spec: ShareSpec) {
  const back = document.createElement("div");
  back.className = "sheet-back fx-share-back";
  back.innerHTML = `<div class="sheet pad fx-share" role="dialog" aria-modal="true" aria-label="공유 카드">
      <div class="grab"></div>
      <div class="fx-share-prev"><span class="fx-spin" aria-hidden="true"></span></div>
      <div class="fx-share-act">
        <button class="btn" type="button" data-share hidden>공유하기</button>
        <a class="btn btn-ghost" data-save download="hanbam-${spec.slug}.png" aria-disabled="true">이미지 저장</a>
      </div>
      <p class="note" style="text-align:center">인스타그램 스토리 크기(9:16)예요. 이름과 생일은 카드에 넣지 않았어요.</p>
      <button class="skip" type="button" data-close>닫기</button>
    </div>`;
  document.body.appendChild(back);
  const close = () => { back.remove(); document.removeEventListener("keydown", onKey); if (url) URL.revokeObjectURL(url); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  back.addEventListener("click", (e) => { if (e.target === back) close(); });
  back.querySelector("[data-close]")!.addEventListener("click", close);
  (back.querySelector("[data-close]") as HTMLElement).focus({ preventScroll: true });

  let url = "";
  const canvas = await drawShareCard(spec);
  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
  if (!blob || !back.isConnected) return;
  url = URL.createObjectURL(blob);
  const img = new Image();
  img.alt = "공유 카드 미리보기";
  img.src = url;
  const prev = back.querySelector(".fx-share-prev")!;
  prev.innerHTML = "";
  prev.appendChild(img);
  const save = back.querySelector<HTMLAnchorElement>("[data-save]")!;
  save.href = url;
  save.removeAttribute("aria-disabled");
  const file = new File([blob], `hanbam-${spec.slug}.png`, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    const sb = back.querySelector<HTMLButtonElement>("[data-share]")!;
    sb.hidden = false;
    sb.addEventListener("click", () => { nav.share({ files: [file], title: "한밤사주" }).catch(() => {}); });
  }
}

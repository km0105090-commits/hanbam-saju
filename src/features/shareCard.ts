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
const GOLD = ["#f8ecc9", "#e3c27f", "#b88d4f", "#f1dca6"];

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
      document.fonts.load('900 300px "Noto Serif KR"'),
      document.fonts.load('700 64px "Noto Serif KR"'),
      document.fonts.load('400 40px "IBM Plex Sans KR"'),
    ]);
  } catch { /* 글꼴이 없어도 기본 글꼴로 그려요 */ }
}

export async function drawShareCard(spec: ShareSpec): Promise<HTMLCanvasElement> {
  await fontsReady();
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const serif = '"Noto Serif KR", "Gowun Batang", serif';
  const sans = '"IBM Plex Sans KR", "Apple SD Gothic Neo", sans-serif';

  // 밤하늘 바탕
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0d1020"); bg.addColorStop(.55, "#15120f"); bg.addColorStop(1, "#0b0908");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 760, 40, W / 2, 760, 620);
  glow.addColorStop(0, "rgba(246,231,193,.16)"); glow.addColorStop(1, "rgba(246,231,193,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
  const r = rng(spec.glyph.charCodeAt(0) * 31 + spec.title.length);
  for (let i = 0; i < 240; i++) {
    const x = r() * W, y = r() * H * .8, s = r();
    ctx.fillStyle = `rgba(246,231,193,${.15 + s * .55})`;
    ctx.beginPath(); ctx.arc(x, y, .6 + s * 1.8, 0, Math.PI * 2); ctx.fill();
  }

  // 금테 두 줄
  const gold = ctx.createLinearGradient(0, 0, W, H);
  GOLD.forEach((g, i) => gold.addColorStop(i / 3, g));
  ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.strokeRect(54, 54, W - 108, H - 108);
  ctx.globalAlpha = .35; ctx.lineWidth = 1.5; ctx.strokeRect(72, 72, W - 144, H - 144); ctx.globalAlpha = 1;

  // 상단: 인장 + 이름
  ctx.save();
  ctx.translate(W / 2 - 128, 176); ctx.rotate(-.05);
  ctx.fillStyle = "#b5372a"; ctx.fillRect(-34, -34, 68, 68);
  ctx.strokeStyle = "rgba(246,233,214,.55)"; ctx.lineWidth = 3; ctx.strokeRect(-29, -29, 58, 58);
  ctx.fillStyle = "#f6e9d6"; ctx.font = `700 25px ${serif}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("한", 0, -12); ctx.fillText("밤", 0, 14);
  ctx.restore();
  ctx.fillStyle = "#f6e7c1"; ctx.font = `700 46px ${serif}`; ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.letterSpacing = "14px";
  ctx.fillText("한밤사주", W / 2 - 74, 178);
  ctx.letterSpacing = "8px";

  // 머리말
  ctx.textAlign = "center";
  ctx.fillStyle = "#e0bf7d"; ctx.font = `500 34px ${serif}`;
  ctx.fillText(spec.eyebrow, W / 2, 330);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "rgba(226,194,128,.4)"; ctx.fillRect(W / 2 - 40, 374, 80, 2);

  // 큰 한자
  const n = [...spec.glyph].length;
  const size = n <= 1 ? 380 : n === 2 ? 300 : n === 3 ? 230 : 190;
  ctx.font = `900 ${size}px ${serif}`;
  const gg = ctx.createLinearGradient(W / 2 - 300, 520, W / 2 + 300, 980);
  gg.addColorStop(0, "#fbf0d2"); gg.addColorStop(.45, "#e3c27f"); gg.addColorStop(.7, "#b88d4f"); gg.addColorStop(1, "#f1dca6");
  ctx.fillStyle = gg; ctx.shadowColor = "rgba(226,190,120,.45)"; ctx.shadowBlur = 60;
  ctx.fillText(spec.glyph, W / 2, 770);
  ctx.shadowBlur = 0;

  // 제목
  ctx.fillStyle = "#fbf4e4"; ctx.font = `700 64px ${serif}`;
  let y = 1090;
  for (const ln of wrap(ctx, spec.title, W - 240)) { ctx.fillText(ln, W / 2, y); y += 84; }

  // 점수 띠
  if (spec.score != null) {
    y += 10;
    const bw = 560, bx = (W - bw) / 2;
    ctx.fillStyle = "rgba(246,231,193,.12)"; ctx.fillRect(bx, y, bw, 10);
    ctx.fillStyle = spec.accent || "#e3c27f"; ctx.fillRect(bx, y, bw * spec.score / 100, 10);
    ctx.font = `700 40px ${serif}`; ctx.fillStyle = "#f6e7c1";
    ctx.fillText(`${spec.score}점`, W / 2, y + 66);
    y += 120;
  } else y += 20;

  // 본문
  ctx.fillStyle = "rgba(238,229,211,.86)"; ctx.font = `400 38px ${sans}`;
  for (const para of spec.lines) {
    for (const ln of wrap(ctx, para, W - 260)) { ctx.fillText(ln, W / 2, y); y += 58; }
    y += 18;
    if (y > 1640) break;
  }

  // 칩
  if (spec.chips?.length) {
    ctx.font = `500 32px ${sans}`;
    const pads = spec.chips.map((t) => ctx.measureText(t).width + 56);
    const total = pads.reduce((a, b) => a + b, 0) + (pads.length - 1) * 16;
    let x = (W - total) / 2;
    const cy = Math.max(y + 10, 1660);
    spec.chips.forEach((t, i) => {
      ctx.strokeStyle = "rgba(226,194,128,.5)"; ctx.lineWidth = 2; ctx.strokeRect(x, cy, pads[i], 64);
      ctx.fillStyle = "#f6e7c1"; ctx.fillText(t, x + pads[i] / 2, cy + 33);
      x += pads[i] + 16;
    });
  }

  // 바닥
  ctx.fillStyle = "rgba(196,195,224,.55)"; ctx.font = `400 28px ${sans}`;
  ctx.fillText("절기의 분 단위까지 맞춘 만세력 · 한밤사주", W / 2, H - 120);
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

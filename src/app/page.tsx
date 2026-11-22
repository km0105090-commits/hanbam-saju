import { LEGACY_MARKUP } from "@/legacy/markup";
import LegacyBoot from "@/components/LegacyBoot";

/**
 * 한밤사주 첫 화면.
 * 지금은 claude.ai 에서 만든 샘플 화면을 그대로 옮겨 왔고, 만세력 계산만 진짜 엔진(src/lib/saju)으로 바꿨어요.
 * 앞으로 화면을 하나씩 React 컴포넌트로 옮기면 됩니다.
 */
export default function Home() {
  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: LEGACY_MARKUP }} />
      <LegacyBoot />
    </>
  );
}

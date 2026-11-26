import type { Metadata, Viewport } from "next";
import "./hanbam.css";
import "./premium.css";
import "./features.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./fresh.css";

export const metadata: Metadata = {
  title: "한밤사주",
  description: "절기 기준 만세력으로 정확하게 세운 사주, 한밤사주가 풀어 드려요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090b17",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

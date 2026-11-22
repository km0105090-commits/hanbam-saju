import { NextResponse } from "next/server";
import { calculateSaju, type SajuInput } from "@/lib/saju";

/**
 * POST /api/saju
 * 예) { "year": 1997, "month": 5, "day": 21, "hour": 14, "minute": 30, "calendar": "solar", "gender": "female" }
 * AI 풀이를 서버에서 만들 때 이 결과(여덟 글자, 대운, 절기)를 프롬프트에 넣습니다.
 */
export async function POST(req: Request) {
  let body: Partial<SajuInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON 형식으로 보내 주세요." }, { status: 400 });
  }
  const { year, month, day } = body;
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return NextResponse.json({ error: "year, month, day 는 꼭 필요해요." }, { status: 400 });
  }
  try {
    return NextResponse.json(calculateSaju(body as SajuInput));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

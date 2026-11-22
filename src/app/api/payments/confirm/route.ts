import { NextResponse } from "next/server";
import { PRODUCTS, type ProductId } from "@/config/products";

/**
 * 토스페이먼츠 결제 승인 (아직 화면과 연결 전인 뼈대)
 *
 * 흐름: 화면에서 토스 결제창 → 결제 성공 시 successUrl 로 paymentKey, orderId, amount 가 돌아옴
 *       → 이 API 가 금액을 상품표와 맞춰 본 뒤 토스에 "승인"을 요청 → 승인되면 전체 풀이를 엽니다.
 * 필요한 값: .env.local 의 TOSS_SECRET_KEY (토스페이먼츠 개발자센터에서 발급, 테스트 키로 시작)
 */
export async function POST(req: Request) {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "아직 결제 키가 설정되지 않았어요. (TOSS_SECRET_KEY)" }, { status: 503 });
  }
  const { paymentKey, orderId, amount, productId } = (await req.json()) as {
    paymentKey: string;
    orderId: string;
    amount: number;
    productId: ProductId;
  };
  const product = PRODUCTS[productId];
  if (!product || product.price !== amount) {
    return NextResponse.json({ error: "결제 금액이 상품 가격과 달라요." }, { status: 400 });
  }
  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(secretKey + ":").toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data.message ?? "결제 승인에 실패했어요." }, { status: res.status });
  // TODO: 여기서 주문을 DB 에 저장하고, 전체 풀이 생성(AI)을 시작합니다.
  return NextResponse.json({ ok: true, orderId: data.orderId, method: data.method, approvedAt: data.approvedAt });
}

/**
 * 상품과 가격. 결제 금액은 반드시 서버에서 이 표로 확인합니다. (화면에서 보낸 금액을 그대로 믿지 않기)
 */
export const PRODUCTS = {
  newyear: { title: "2027 신년운세", price: 29900, guide: "연지" },
  love: { title: "연애사주", price: 29900, guide: "한결" },
  match: { title: "궁합사주", price: 34900, guide: "홍연" },
  life: { title: "인생사주", price: 44900, guide: "백운 선생" },
} as const;

export type ProductId = keyof typeof PRODUCTS;

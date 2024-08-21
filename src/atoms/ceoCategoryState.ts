import { atom } from "recoil";

// 사장님 글램핑장 심사승인대기중 & 반려상태 일때 일부 카테고리 비활성화 됨
export const isCategoryState = atom({
  key: "isCategoryState",
  default: false,
});

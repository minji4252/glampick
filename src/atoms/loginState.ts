import { atom } from "recoil";

// user 정보 상태
export const userEmailState = atom({
  key: "userEmailState",
  default: "",
});
export const userPwState = atom({
  key: "userPwState",
  default: "",
});
export const userRememberMeState = atom({
  key: "userRememberMeState",
  default: false,
});

// user 로그인 상태
export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});
export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: "",
});

// userRole 상태
export const userRoleState = atom({
  key: "userRoleState", // 각 atom의 고유한 식별자
  default: "", // 초기값
});

// ceo 정보 상태
export const ceoEmailState = atom({
  key: "ceoEmailState",
  default: "",
});
export const ceoPwState = atom({
  key: "ceoPwState",
  default: "",
});
export const ceoRememberMeState = atom({
  key: "ceoRememberMeState",
  default: false,
});

// ceo 로그인 상태
export const isCeoLoginState = atom({
  key: "isCeoLoginState",
  default: false,
});

export const ceoAccessTokenState = atom<string | null>({
  key: "ceoAccessTokenState",
  default: "",
});

// ceoRole 상태
export const ceoRoleState = atom({
  key: "ceoRoleState", // 각 atom의 고유한 식별자
  default: "", // 초기값
});

// 관리자 정보 상태
export const adminIdState = atom({
  key: "adminIdState",
  default: "",
});
export const adminPwState = atom({
  key: "adminPwState",
  default: "",
});
export const adminAccessTokenState = atom<string | null>({
  key: "adminAccessTokenState",
  default: "",
});

// 공통
export const errorMessageState = atom({
  key: "errorMessageState",
  default: "",
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

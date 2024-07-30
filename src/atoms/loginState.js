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

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
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

// isCeoLoginState

// ceoAccessTokenState

// 공통
export const errorMessageState = atom({
  key: "errorMessageState",
  default: "",
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

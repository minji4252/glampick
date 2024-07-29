import { atom } from "recoil";

export const userEmailState = atom({
  key: 'userEmailState',
  default: '',
});

export const userPwState = atom({
  key: 'userPwState',
  default: '',
});

export const errorMessageState = atom({
  key: 'errorMessageState',
  default: '',
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const rememberMeState = atom({
  key: 'rememberMeState',
  default: false,
});

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
});
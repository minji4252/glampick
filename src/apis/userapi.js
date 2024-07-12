import axios from "axios";

// 로그인 Api 호출
export const postSignIn = async ({ userEmail, userPw }) => {
  try {
    const response = await axios.post("/api/auth/sign-in", {
      userEmail: userEmail,
      userPw: userPw,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 메일 인증 api 호출
export const postMailSend = async ({ userEmail }) => {
  try {
    const reqData = `/api/auth/mail-send?userEmail=${userEmail}`;
    const response = await axios.post(reqData, { userEmail });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 인증코드 api 호출
export const postAuthCode = async ({ userEmail, authCode }) => {
  try {
    const reqData = `/api/auth/mail-check?userEmail=${userEmail}&emailKey=${authCode}`;
    const response = await axios.post(reqData, {
      userEmail: userEmail,
      authKey: authCode,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("코드인증에러", error);
  }
};

// 핸드폰 인증 api 호출
export const postSendSms = async ({ userPhone }) => {
  try {
    const reqData = `/api/auth/send-sms?userPhone=${userPhone}`;
    const response = await axios.post(reqData, { userPhone });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 핸드폰 인증코드 확인 api 호출
export const postCheckSms = async ({ userPhone, authNumber }) => {
  try {
    const reqData = `/api/auth/check-sms?userPhone=${userPhone}&phoneKey=${authNumber}`;
    const response = await axios.post(reqData, {
      userPhone: userPhone,
      phoneKey: authNumber,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원가입 api 호출
export const postSignUp = async ({
  userEmail,
  userPw,
  userPhone,
  userName,
  userNickName,
}) => {
  try {
    const response = await axios.post(`/api/auth/sign-up`, {
      userEmail: userEmail,
      userPw: userPw,
      userPhone: userPhone,
      userName: userName,
      userNickname: userNickName,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

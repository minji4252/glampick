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
    // 에러 응답이 있는 경우 에러 응답을 반환
    if (error.response) {
      return error.response;
    }
    console.log(error);
  }
};

// 로그아웃 Api 호출 (user, ceo 모두 동일)
export const postSignOut = async () => {
  try {
    const response = await axios.post("/api/auth/sign-out");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
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
    // 에러 응답이 있는 경우 에러 응답을 반환
    if (error.response) {
      return error.response;
    }
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
    // 에러 응답이 있는 경우 에러 응답을 반환
    if (error.response) {
      return error.response;
    }
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
    // 에러 응답이 있는 경우 에러 응답을 반환
    if (error.response) {
      return error.response;
    }
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
    // 에러 응답이 있는 경우 에러 응답을 반환
    if (error.response) {
      return error.response;
    }
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
    // console.log(response);
    return response;
  } catch (error) {
    // 에러 응답이 있는 경우 에러 응답을 반환
    if (error.response) {
      return error.response;
    }
    console.log(error);
  }
};

// sns 회원가입 api
export const postSocailSignUp = async ({
  userId,
  userName,
  userPhone,
  userNickName,
}) => {
  try {
    const response = await axios.post(`/api/auth/social/sign-up`, {
      userId: userId,
      userName: userName,
      userPhone: userPhone,
      userNickName: userNickName,
    });
    console.log("회원가입 전송데이터:", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 유저 정보수정 비밀번호 확인 api
export const postPasswordCheck = async ({ userPw }) => {
  try {
    const response = await axios.post(`/api/user/password-check`, {
      userPw: userPw,
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원탈퇴 api 호출
export const deleteUser = async () => {
  try {
    const response = await axios.delete(`/api/user`);
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

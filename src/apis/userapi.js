import axios from "axios";

// 로그인 Api 호출
export const postSignIn = async ({ userEmail, userPw }) => {
  try {
    const res = await axios.post("/api/auth/sign-in", {
      userEmail: userEmail,
      userPw: userPw,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 메일 인증 Api 호출
export const postMailSend = async ({ userEmail }) => {
  try {
    const reqData = `/api/auth/mail-send?userEmail=${userEmail}`;
    const response = await axios.post(reqData, { userEmail });
    // console.log(response.data.code);
    return response;
  } catch (error) {
    console.log(error);
  }
};

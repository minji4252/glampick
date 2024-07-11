import axios from "axios";

// 로그인 Api 연동
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

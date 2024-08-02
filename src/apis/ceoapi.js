import axios from "axios";

// ceo 로그인 api 호출
export const postOwnerSignin = async ({ ceoEmail, ceoPw }) => {
  try {
    const response = await axios.post("/api/auth/owner/sign-in", {
      ownerEmail: ceoEmail,
      ownerPw: ceoPw,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ceo 회원가입 api 호출

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

// ceo 메일 인증 api 호출
export const postOwnerMailSend = async ({ ceoEmail }) => {
  try {
    const reqData = `/api/auth/owner/mail-send?ownerEmail=${ceoEmail}`;
    const response = await axios.post(reqData, { ceoEmail });
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

// ceo 메일 인증 코드 확인 api 호출
export const postOwnerAuthCode = async ({ ceoEmail, authCode }) => {
  try {
    const reqData = `/api/auth/owner/mail-check?ownerEmail=${ceoEmail}&emailKey=${authCode}`;
    const response = await axios.post(reqData, {
      ceoEmail: ceoEmail,
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

// ceo 사업자등록번호 확인 api 호출

// ceo 회원가입 api 호출
export const postOwnerSignUp = async ({
  businessNumber,
  ownerEmail,
  ownerPw,
  ownerName,
  ownerPhone,
}) => {
  try {
    const response = await axios.post(`/api/auth/owner/sign-up`, {
      businessNumber: businessNumber,
      ownerEmail: ownerEmail,
      ownerPw: ownerPw,
      ownerName: ownerName,
      ownerPhone: ownerPhone,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

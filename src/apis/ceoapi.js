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
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response?.data;
    } else {
      console.error("Unexpected error", error);
    }
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

// ceo 핸드폰 인증 api 호출
export const postOwnerSendSms = async ({ phone }) => {
  try {
    const reqData = `/api/auth/owner/send-sms?ownerPhone=${phone}`;
    const response = await axios.post(reqData, { phone });
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

// ceo 핸드폰 인증코드 확인 api 호출
export const postOwnerCheckSms = async ({ phone, phoneAuthCode }) => {
  try {
    const reqData = `/api/auth/owner/check-sms?ownerPhone=${phone}&phoneKey=${phoneAuthCode}`;
    const response = await axios.post(reqData, {
      ownerPhone: phone,
      phoneKey: phoneAuthCode,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// ceo 회원가입 api 호출
export const postOwnerSignUp = async ({
  file,
  businessNumber,
  ceoEmail,
  password,
  name,
  phone,
}) => {
  console.log("파일:", file);
  try {
    // FormData 객체 생성
    const formData = new FormData();
    // FormData에 텍스트 필드 추가
    formData.append(
      "dto",
      JSON.stringify({
        businessNumber: businessNumber,
        ownerEmail: ceoEmail,
        ownerPw: password,
        ownerName: name,
        ownerPhone: phone,
      }),
    );
    // FormData에 파일 추가
    formData.append("file", file);
    const response = await axios.post(`/api/auth/owner/sign-up`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

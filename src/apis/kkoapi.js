import axios from "axios";

// 깃허브 올리면 절대 안됨
const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
// 카카오 로그인 시 이동할 Redirec 주소
const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
// 클라이언트 시크릿(추가)
const client_secret = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 받기 경로
export const getAccessToken = async authCode => {
  const access_token_url = "https://kauth.kakao.com/oauth/token";

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
    client_secret: client_secret, // 추가
  }).toString();

  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await axios.post(access_token_url, params, header);
    const accessToken = res.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 토큰을 이용해서 사용자 정보 호출하기
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await axios.get(kko_user_api, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    console.log(response.data);
    console.log(response.data.id);
    return {
      id: response.data.id, // userId
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

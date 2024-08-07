const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
// 카카오 로그인 시 이동할 Redirec 주소
const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../atoms/loginState";

const useFetchAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
        } else {
          // console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        // console.log("엑세스 토큰 가져오는 중 에러", error);
      }
    };
    fetchAccessToken();
  }, [setAccessToken]);

  return accessToken;
};

export default useFetchAccessToken;

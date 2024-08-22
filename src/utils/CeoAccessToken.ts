import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ceoAccessTokenState } from "../atoms/loginState";

const useFetchCeoAccessToken = () => {
  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);

  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = localStorage.getItem("ceoAccessToken");
        if (token) {
          setCeoAccessToken(token);
        } else {
          // console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        // console.log("엑세스 토큰 가져오는 중 에러", error);
      }
    };
    fetchAccessToken();
  }, [setCeoAccessToken]);

  return ceoAccessToken;
};

export default useFetchCeoAccessToken;

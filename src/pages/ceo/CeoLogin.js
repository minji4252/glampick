import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  ceoAccessTokenState,
  ceoEmailState,
  ceoPwState,
  ceoRememberMeState,
  ceoRoleState,
  errorMessageState,
  isCeoLoginState,
} from "../../atoms/loginState";
import { CeoButton } from "../../components/common/Button";
import { WrapStyle } from "../user/LoginPage";
import base64 from "base-64";
import { postOwnerSignin } from "../../apis/ceoapi";
import useModal from "../../hooks/UseModal";

const CeoLogin = () => {
  const [ceoEmail, setCeoEmail] = useRecoilState(ceoEmailState);
  const [ceoPw, setCeoPw] = useRecoilState(ceoPwState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [rememberMe, setRememberMe] = useRecoilState(ceoRememberMeState);

  // 로그인 상태 업데이트
  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);
  const [isCeoLogin, setIsCeoLogin] = useRecoilState(isCeoLoginState);
  const [ceoRole, setCeoRole] = useRecoilState(ceoRoleState); // 사용자 역할 상태를 가져오고 설정

  const navigate = useNavigate();

  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  // 페이지 로드 시 로컬 스토리지에서 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setCeoEmail(savedEmail);
      setRememberMe(true); // 로컬 스토리지에서 이메일을 불러오면 체크박스를 선택된 상태로 설정
    }
  }, []);

  // 이메일 저장
  const handleRememberMeChange = () => {
    setRememberMe(prev => {
      const newRememberMe = !prev;
      if (newRememberMe) {
        localStorage.setItem("savedEmail", ceoEmail);
      } else {
        localStorage.removeItem("savedEmail");
      }
      return newRememberMe;
    });
  };

  // 로그인시 처리할 함수
  const handleCeoLogin = async e => {
    e.preventDefault();

    if (!ceoEmail || !ceoPw) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = await postOwnerSignin({ ceoEmail, ceoPw });
    if (result.code === "SU") {
      console.log(result);

      // 토큰에서 사용자 정보 파싱
      const payload = JSON.parse(
        base64.decode(result.accessToken.split(".")[1]),
      );
      const signedCeo = JSON.parse(payload.signedUser);
      console.log("signedCeo :", signedCeo);

      // Ceo역할을 Recoil 상태에 저장
      setCeoRole(signedCeo.role); // userRoleState를 업데이트

      // 로그인 성공 시 로컬스토리지에 사장님 정보 저장
      localStorage.setItem("ceoAccessToken", result.accessToken);
      setCeoAccessToken(result.accessToken);
      setIsCeoLogin(true);

      openModal({ message: "로그인 성공하였습니다!" });
      setTimeout(() => {
        if (location.state && location.state.fromSignup) {
          navigate("/");
        } else {
          navigate(-1);
        }
      }, 1000); // 1초 후에 페이지 이동
    } else {
      console.log("로그인 실패");
      setErrorMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <WrapStyle>
      <main>
        <div className="inner">
          <div className="container">
            <div className="glampick-logo"></div>
            <h2>비즈니스 로그인</h2>
            <div className="wrap">
              <form
                className="login-form"
                onSubmit={e => {
                  handleCeoLogin(e);
                }}
              >
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ceoEmail}
                  placeholder="glampickceo@good.kr"
                  onChange={e => {
                    setCeoEmail(e.target.value);
                  }}
                />
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={ceoPw}
                  placeholder="비밀번호를 입력하세요"
                  onChange={e => {
                    setCeoPw(e.target.value);
                  }}
                />
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label htmlFor="rememberMe">이메일 기억하기</label>
                </div>
                <p className="error-message">{errorMessage}</p>
                <div className="login-btn">
                  <CeoButton label="로그인" />
                </div>
              </form>
              <div className="signup">
                <Link to="/ceosignup" className="ceosignup-btn">
                  <p>회원가입</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </WrapStyle>
  );
};

export default CeoLogin;

import { useEffect, useState } from "react";
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
  loadingState,
} from "../../atoms/loginState";
import { CeoButton } from "../../components/common/Button";
import { WrapStyle } from "../user/LoginPage";
import base64 from "base-64";
import { postOwnerSignin } from "../../apis/ceoapi";
import useModal from "../../hooks/UseModal";
import AlertModal from "../../components/common/AlertModal";
import Loading from "../../components/common/Loading";
import { ErrorMessage } from "./CeoSignup";

const CeoLogin = () => {
  const [ceoEmail, setCeoEmail] = useRecoilState(ceoEmailState);
  const [ceoPw, setCeoPw] = useRecoilState(ceoPwState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [rememberMe, setRememberMe] = useRecoilState(ceoRememberMeState);

  // 로그인 상태 업데이트
  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);
  const [isCeoLogin, setIsCeoLogin] = useRecoilState(isCeoLoginState);
  const [ceoRole, setCeoRole] = useRecoilState(ceoRoleState); // 사용자 역할 상태를 가져오고 설정

  const navigate = useNavigate();

  // 모달
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  // Recoil 상태 변경 감지
  useEffect(() => {
    console.log("CeoRole 상태 변경 감지 ", ceoRole);
  }, [ceoRole]);

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
    // setLoading(true);

    if (!ceoEmail || !ceoPw) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const result = await postOwnerSignin({ ceoEmail, ceoPw });
      // console.log("결과:", result);
      if (result.code === "SU") {
        // setLoading(false);
        openModal({ message: "로그인 성공하였습니다!" });
        console.log("모달 열기 호출 후 상태:", isModalOpen);
        console.log("모달 메시지:", modalMessage);
        // 데이터 보관해 둠
        setSaveResult(result);
      } else if (result.code === "SF") {
        setErrorMessage("아이디와 비밀번호가 일치하지 않습니다.");
      } else if (result.code === "NS") {
        setErrorMessage("탈퇴한 회원입니다.");
      } else if (result.code === "WO") {
        setErrorMessage("탈퇴 대기중인 회원입니다.");
      } else if (result.code === "WS") {
        setErrorMessage("가입 대기중인 회원입니다.");
      } else {
        console.log("로그인 실패");
        setErrorMessage("아이디와 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      // if (error.response?.data.code === "SF") {
      //   setErrorMessage("!!아이디와 비밀번호가 일치하지 않습니다.");
      // }
      console.log(error);
    }
  };

  // 보관해둔 로그인 정보를 나중에 활용
  const [saveResult, setSaveResult] = useState(null);

  const loginSuccessModalClose = () => {
    loginSuccessFn(saveResult);
    closeModal();
  };

  const loginSuccessFn = result => {
    // 토큰에서 사용자 정보 파싱
    const payload = JSON.parse(base64.decode(result.accessToken.split(".")[1]));
    const signedCeo = JSON.parse(payload.signedUser);
    console.log("signedCeo :", signedCeo);

    // Ceo역할을 Recoil 상태에 저장
    setCeoRole(signedCeo.role);
    console.log("Updated ceoRole:", signedCeo.role);

    // 로그인 성공 시 로컬스토리지에 사장님 정보 저장
    localStorage.setItem("ceoAccessToken", result.accessToken);
    localStorage.setItem("ownerRole", signedCeo.role);
    setCeoAccessToken(result.accessToken);
    setIsCeoLogin(true);

    setTimeout(() => {
      navigate("/ceoglamping");
    }, 1000);
  };

  return (
    <WrapStyle>
      {loading && <Loading />}
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
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label htmlFor="rememberMe">이메일 기억하기</label>
                </div>

                <div className="login-btn">
                  <CeoButton label="로그인" />
                </div>
              </form>
              <AlertModal
                isOpen={isModalOpen}
                onClose={loginSuccessModalClose}
                message={modalMessage}
              />
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

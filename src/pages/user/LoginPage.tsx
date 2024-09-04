import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import base64 from "base-64";
import { postSignIn } from "../../apis/userapi";
import {
  accessTokenState,
  errorMessageState,
  isLoginState,
  loadingState,
  userEmailState,
  userPwState,
  userRememberMeState,
  userRoleState,
} from "../../atoms/loginState";
import AlertModal from "../../components/common/AlertModal";
import { ActionButton, MainButton } from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import useModal from "../../hooks/UseModal";
import GlampickLogo from "../../images/glampick_logo.png";
import { colorSystem, size } from "../../styles/color";
import axios from "axios";

export const WrapStyle = styled.div`
  position: relative;

  .container {
    display: flex;
    width: 760px;
    height: 800px;
    /* 높이 임시로 설정 */
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .glampick-logo {
    width: 180px;
    height: 180px;
    background: url(${GlampickLogo}) no-repeat center;
    background-size: contain;
    /* 반응형 */
    ${size.mid} {
      width: 160px;
      height: 160px;
    }
  }

  h2 {
    color: ${colorSystem.g800};
    font-size: 1.6rem;
    margin-top: 40px;
    margin-bottom: 40px;
    ${size.mid} {
      font-size: 1.5rem;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }

  .wrap {
    width: 550px;
    position: relative;
    ${size.mid} {
      width: 70%;
    }
  }

  .login-form {
    width: 80%;
    margin: 0 auto;
  }

  .login-form label {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 15px;
    ${size.mid} {
      font-size: 1.2rem;
    }
  }

  .login-form input {
    width: 100%;
    height: 50px;
    font-size: 1rem;
    border-radius: 10px;

    background-color: ${colorSystem.g100};
    border: none;
    padding: 10px;
    ${size.mid} {
      height: 45px;
    }
  }

  .login-form input[type="email"] {
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .login-form input::placeholder {
    font-size: 1rem;
    background-color: ${colorSystem.g100};
    font-weight: 300;
    ${size.mid} {
      font-size: 0.9rem;
    }
  }

  .error-message {
    display: block;
    color: ${colorSystem.error};
    font-size: 0.9rem;
    margin-top: 7px;
    margin-left: 5px;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  /* 로그인 버튼 */
  .login-btn > button {
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    margin-top: 30px;
    ${size.mid} {
      font-size: 1.1rem;
      height: 45px;
    }
  }

  .login-bottom {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    .login-search {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-top: 10px;
    }
    .search-email {
      padding-right: 3px;
      margin-left: 5px;
      border-right: 1px solid ${colorSystem.g500};
    }
    .search-pw {
      padding-left: 3px;
    }
    /* 회원가입 */
    .signup {
      width: 100%;
      margin: 0 auto;
      position: relative;
    }

    .search-email p,
    .search-pw p {
      color: ${colorSystem.g700};
      font-size: 1rem;
      ${size.mid} {
        font-size: 1rem;
      }
    }
    .signup p {
      position: absolute;
      right: 0;
      // 로그인버튼 하단에 위치 고정
      color: ${colorSystem.g700};
      font-size: 1.1rem;
      padding: 10px;
      ${size.mid} {
        font-size: 1rem;
      }
    }
  }

  .sns-login {
    width: 80%;
    margin: 0 auto;
    ${size.mid} {
      margin: 0 auto;
    }
  }

  .sns-login p {
    color: ${colorSystem.g700};
    display: flex;
    font-size: 1.1rem;
    margin-top: 45px;
    text-align: center;
    ${size.mid} {
      font-size: 1rem;
      margin-top: 35px;
    }
  }

  .sns-login p::before,
  .sns-login p::after {
    content: "";
    flex: 1;
    border-top: 1px dashed ${colorSystem.g300};
    margin: 0 10px; /* 텍스트와 선 사이 간격 */
    align-self: center;
  }

  .sns-login-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 24px;
    gap: 30px;
    justify-content: center;
    ${size.mid} {
      margin-top: 20px;
      gap: 25px;
    }
  }
  /* 카카오로그인 버튼 */
  .sns-login-item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background-color: #fbe400;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 30px;
    margin-top: 15px;
    ${size.mid} {
      font-size: 1.1rem;
      height: 45px;
    }
    // sns 로그인 아이콘
    .kakao {
    }
    .kakaoicon {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      background-size: contain;
    }
  }

  /* 이메일 기억하기 */
  .remember-me {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-left: 3px;
    > input {
      width: 13px;
      height: 13px;
      margin-right: 5px;
    }
    > label {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      margin: 0;
    }
  }

  /* ceo 로그인 */
  .ceo-login {
    margin-top: 20px;
    margin-bottom: 50px;

    .ceo-login-btn > button {
      width: 80%;
      height: 45px;
      font-size: 1.1rem;
      margin: 0 auto;
      background: ${colorSystem.g100};
      border: none;
      border-radius: 20;
      /* &:hover {
        background: ${colorSystem.g200};
      } */
      ${size.mid} {
        font-size: 1rem;
        height: 45px;
      }
    }
  }
`;

const LoginPage = () => {
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [userPw, setUserPw] = useRecoilState(userPwState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [rememberMe, setRememberMe] = useRecoilState(userRememberMeState);

  // 로그인 상태 업데이트
  const [accessToken, setAccessToken] = useRecoilState<string | null>(
    accessTokenState,
  );
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userRole, setUserRole] = useRecoilState(userRoleState); // 사용자 역할 상태를 가져오고 설정

  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const host = window.location.origin;
    setRedirectUrl(`${host}/auth/redirect`); // 리디렉션 URI 설정
  }, []);
  // const kakaoLogin = getKakaoLoginLink();

  // 페이지 로드 시 로컬 스토리지에서 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setRememberMe(true); // 로컬 스토리지에서 이메일을 불러오면 체크박스를 선택된 상태로 설정
    }
  }, []);

  // 페이지 로드 시 에러 메시지 초기화
  useEffect(() => {
    setErrorMessage("");
  }, [setErrorMessage]);

  // 이메일 저장
  const handleRememberMeChange = () => {
    setRememberMe(prev => {
      const newRememberMe = !prev;
      if (newRememberMe) {
        localStorage.setItem("savedEmail", userEmail);
      } else {
        localStorage.removeItem("savedEmail");
      }
      return newRememberMe;
    });
  };

  // 로그인시 처리할 함수
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력 필드 검사
    if (!userEmail || !userPw) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const result = await postSignIn({ userEmail, userPw });
      if (result.code === "SU") {
        // console.log(result);
        openModal({ message: "로그인 성공하였습니다!" });
        // 데이터 보관해 둠
        setSaveResult(result);
      } else {
        setErrorMessage("아이디와 비밀번호가 일치하지 않습니다22.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage("아이디와 비밀번호가 일치하지 않습니다.");
      }
      // console.log(error);
    }
    setLoading(false);
  };

  // 보관해둔 로그인 정보를 나중에 활용
  const [saveResult, setSaveResult] = useState(null);

  const loginSuccessModalClose = () => {
    loginSuccessFn(saveResult);
    closeModal();
  };

  const loginSuccessFn = (result: any) => {
    // 토큰에서 사용자 정보 파싱
    const payload = JSON.parse(base64.decode(result.accessToken.split(".")[1]));
    const signedUser = JSON.parse(payload.signedUser);
    // console.log("signedUser :", signedUser);

    // 사용자 역할을 Recoil 상태에 저장
    setUserRole(signedUser.role); // userRoleState를 업데이트
    // 로그인 성공 시 로컬스토리지에 사용자 정보 저장
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("userRole", signedUser.role);
    // setAccessToken(result.accessToken);

    setTimeout(() => {
      if (location.state && location.state.fromSignup) {
        navigate("/");
      } else if (location.state && location.state.fromSearchPw) {
        navigate("/");
      } else {
        navigate(-1);
      }
    }, 1000); // 1초 후에 페이지 이동
  };

  return (
    <WrapStyle>
      {loading && <Loading />}
      <main>
        <div className="inner">
          <div className="container">
            <div className="glampick-logo"></div>
            <h2>로그인</h2>
            <div className="wrap">
              <form
                className="login-form"
                onSubmit={e => {
                  handleLogin(e);
                }}
              >
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userEmail}
                  placeholder="glampick@good.kr"
                  onChange={e => {
                    setUserEmail(e.target.value);
                  }}
                />
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userPw}
                  placeholder="비밀번호를 입력하세요"
                  onChange={e => {
                    setUserPw(e.target.value);
                  }}
                />
                <p className="error-message">{errorMessage}</p>
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
                  <MainButton label="로그인" />
                </div>
              </form>

              <div className="login-bottom">
                <div className="login-search">
                  <div className="search-email">
                    <Link to="/search-email" className="search-email-btn">
                      <p>이메일 찾기</p>
                    </Link>
                  </div>
                  <div className="search-pw">
                    <Link to="/search-pw" className="search-pw-btn">
                      <p>비밀번호 찾기</p>
                    </Link>
                  </div>
                </div>
                <div className="signup">
                  <Link to="/signup" className="signup-btn">
                    <p>회원가입</p>
                  </Link>
                </div>
              </div>
              <div className="sns-login">
                <p>sns 로그인</p>
                <a
                  href={`http://112.222.157.156:5124/oauth2/authorization/kakao?redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`}
                >
                  <div className="sns-login-item">
                    <div className="kakao" />
                    <RiKakaoTalkFill className="kakaoicon" />
                    카카오로그인
                  </div>
                </a>
              </div>
              <div className="ceo-login">
                <Link to="/ceologin" className="ceo-login-btn">
                  <ActionButton label="비즈니스 로그인" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <AlertModal
            isOpen={isModalOpen}
            onClose={loginSuccessModalClose}
            message={modalMessage}
          />
        )}
      </main>
    </WrapStyle>
  );
};

export default LoginPage;

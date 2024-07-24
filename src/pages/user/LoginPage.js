import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postSignIn } from "../../apis/userapi";
import { MainButton } from "../../components/common/Button";
import KakaoIcon from "../../images/btn_kakao.svg";
import NaverIcon from "../../images/btn_naver.png";
import GlampickLogo from "../../images/glampick_logo.png";
import { colorSystem, size } from "../../styles/color";
import { setCookie } from "../../utils/cookie";
import AlertModal from "../../components/common/AlertModal";
import useModal from "../../hooks/UseModal";
import Loading from "../../components/common/Loading";

const WrapStyle = styled.div`
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

  /* 회원가입 */
  .signup {
    width: 80%;
    margin: 0 auto;
    position: relative;
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

  .sns-login {
    width: 60%;
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
    display: flex;
    margin-top: 24px;
    gap: 30px;
    justify-content: center;
    ${size.mid} {
      margin-top: 20px;
      gap: 25px;
    }
  }
  .sns-login-item {
  }
  .sns-login-link {
  }

  // sns 로그인 아이콘
  .kakao-icon {
    width: 48px;
    height: 48px;
    background: url(${KakaoIcon}) no-repeat center;
    background-size: contain;
    ${size.mid} {
      width: 42px;
      height: 42px;
    }
  }
  .naver-icon {
    width: 48px;
    height: 48px;
    background: url(${NaverIcon}) no-repeat center;
    background-size: contain;
    ${size.mid} {
      width: 42px;
      height: 42px;
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
`;

const LoginPage = () => {
  // 사용자 로그인
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  // 이메일 기억하기 체크박스 상태
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 로드 시 로컬 스토리지에서 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setRememberMe(true); // 로컬 스토리지에서 이메일을 불러오면 체크박스를 선택된 상태로 설정
    }
  }, []);

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
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    // 입력 필드 검사
    if (!userEmail || !userPw) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = await postSignIn({ userEmail, userPw });
    // console.log(result.code);
    if (result.code === "SU") {
      // console.log(result);
      // 로그인 성공 시 쿠키에 사용자 정보 저장
      setCookie("access-Token", result.accessToken);
      openModal({ message: "로그인 성공하였습니다!" });
      setTimeout(() => {
        if (location.state && location.state.fromSignup) {
          navigate("/");
        } else {
          navigate(-1);
        }
      }, 1000); // 1초 후에 페이지 이동
    } else {
      // console.log("로그인 실패");
      setErrorMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
    setLoading(false);
    // navigate("/");
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
                  <MainButton label="로그인" />
                </div>
              </form>
              <AlertModal
                isOpen={isModalOpen}
                onClose={closeModal}
                message={modalMessage}
              />
              <div className="signup">
                <Link to="/signup" className="signup-btn">
                  <p>회원가입</p>
                </Link>
              </div>
              <div className="sns-login">
                <p>sns 로그인</p>
                <ul className="sns-login-list">
                  <li className="sns-login-item">
                    <a href="#" className="sns-login-link">
                      <div className="kakao-icon" />
                    </a>
                  </li>
                  <li className="sns-login-item">
                    <a href="#" className="sns-login-link">
                      <div className="naver-icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </WrapStyle>
  );
};

export default LoginPage;

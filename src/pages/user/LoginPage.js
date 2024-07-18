import styled from "@emotion/styled";
import { useState } from "react";
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
`;

const LoginPage = () => {
  // const [userEmail, setUserEmail] = useState("test1@test.net");
  // const [userPw, setUserPw] = useState("Asdf@1234");

  // 임시 로그인 계정 (정보 담아둠)
  const [userEmail, setUserEmail] = useState("mybirth811@gmail.com");
  const [userPw, setUserPw] = useState("Tngus811!");
  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState("");
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인시 처리할 함수
  const handleLogin = async e => {
    e.preventDefault();

    // 입력 필드 검사
    if (!userEmail || !userPw) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = await postSignIn({ userEmail, userPw });
    // console.log(result.code);
    if (result.code === "SU") {
      console.log(result);
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
      console.log("로그인 실패");
      setErrorMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
    // navigate("/");
  };

  return (
    <WrapStyle>
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

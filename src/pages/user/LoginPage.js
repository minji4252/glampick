import styled from "@emotion/styled";
import GlampickLogo from "../../images/glampick_logo.png";
import KakaoIcon from "../../images/btn_kakao.svg";
import NaverIcon from "../../images/btn_naver.png";
import { colorSystem, size } from "../../styles/color";
import { Link } from "react-router-dom";
import { MainButton } from "../../components/common/Button";
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
    font-size: 1.1rem;
    color: ${colorSystem.g800};
    background-color: ${colorSystem.g100};
    border: none;
    padding: 10px;
    ${size.mid} {
      height: 45px;
    }
  }

  .login-form input[type="email"] {
    margin-bottom: 20px;
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
    display: none;
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
  return (
    <WrapStyle>
      <main>
        <div className="inner">
          <div className="container">
            <div className="glampick-logo"></div>
            <h2>로그인</h2>
            <div className="wrap">
              <form className="login-form">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="glampick@good.kr"
                />
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="비밀번호를 입력하세요"
                />
                <p className="error-message">
                  아이디나 비밀번호가 일치하지 않습니다.
                </p>
                <div className="login-btn">
                  <MainButton label="로그인" />
                </div>
              </form>
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

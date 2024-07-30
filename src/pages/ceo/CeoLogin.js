import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  ceoEmailState,
  ceoPwState,
  ceoRememberMeState,
  errorMessageState,
} from "../../atoms/loginState";
import { CeoButton } from "../../components/common/Button";
import GlampickLogo from "../../images/glampick_logo.png";
import { colorSystem, size } from "../../styles/color";

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

  .ceo-login-form {
    width: 80%;
    margin: 0 auto;
  }

  label {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 15px;
    ${size.mid} {
      font-size: 1.2rem;
    }
  }

  input {
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

  input[type="email"] {
    margin-bottom: 20px;
    border-radius: 10px;
  }

  input::placeholder {
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

const CeoLogin = () => {
  const [ceoEmail, setCeoEmail] = useRecoilState(ceoEmailState);
  const [ceoPw, setCeoPw] = useRecoilState(ceoPwState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [rememberMe, setRememberMe] = useRecoilState(ceoRememberMeState);

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

  return (
    <WrapStyle>
      <main>
        <div className="inner">
          <div className="container">
            <div className="glampick-logo"></div>
            <h2>비즈니스 로그인</h2>
            <div className="wrap">
              <form className="ceo-login-form">
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

import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import { MainButton } from "../../components/common/Button";

const WrapStyle = styled.div`
  position: relative;

  .container {
    display: flex;
    width: 760px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wrap {
    width: 100%;
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 25px;
  }

  /* 구분선 */
  .line {
    width: 80%;
    border-bottom: 2px solid ${colorSystem.g400};
    margin-bottom: 30px;
  }

  /* 회원가입 폼 */
  .signup-form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group label {
    display: block;
    font-size: 18px;
    margin-bottom: 7px;
    /* 반응형 */
    ${size.mid} {
      font-size: 15px;
    }
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    /* 반응형 */
    ${size.mid} {
      margin-right: 23px;
      width: 100%;
      /* 다른 input과 너비 동일하게 맞춤 */
    }
  }

  .form-group input,
  .input-group input {
    width: calc(100% - 150px - 10px);
    /* 너비 조정: 100%에서 버튼 너비와 마진 값을 뺀 값 */
    height: 40px;
    border: none;
    background-color: ${colorSystem.g100};
    padding: 10px;
    font-size: 15px;
    /* 반응형 */
    ${size.mid} {
      font-size: 12px;
    }
  }

  // 버튼 없는 input에 마진 주기
  .password-input,
  .confirm-password-input,
  .name-input {
    margin-bottom: 30px;
  }

  /* 폼 버튼 */
  .form-button > button {
    width: 140px;
    height: 40px;
    font-size: 15px;
    /* 반응형 */
    ${size.mid} {
      font-size: 12px;
    }
  }

  /* 회원가입 버튼 */
  .sign-button > button {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    font-size: 20px;
    /* 반응형 */
    ${size.mid} {
      font-size: 18px;
    }
  }
`;

/* 약관동의 */
const TermsGroupStyle = styled.div`
  .terms-group p {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 25px;
    /* 반응형 */
    ${size.mid} {
      font-size: 16px;
    }
  }

  .agree-all {
    font-weight: 600;
  }
  .terms-group ul {
  }
  .terms-group li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  /* 모두 동의 체크박스 */
  .terms-group input {
    width: 18px;
    height: 18px;
    ${size.mid} {
      width: 15px;
      height: 15px;
    }
  }
  .terms-group label {
    font-size: 17px;
    ${size.mid} {
      font-size: 14px;
    }
  }
  .terms-item {
    display: flex;
    justify-content: space-between;
    /* 반응형 */
    ${size.mid} {
      margin-right: 23px;
    }
  }

  /* 필수, 선택 체크박스 */
  .left-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .left-content input {
    width: 18px;
    height: 18px;
    ${size.mid} {
      width: 15px;
      height: 15px;
    }
  }

  .view-terms-btn {
    font-size: 16px;
    color: ${colorSystem.g700};
    border: none;
    background-color: transparent;
    cursor: pointer;
    ${size.mid} {
      font-size: 13px;
    }
  }
`;

const SignupPage = () => {
  return (
    <WrapStyle>
      <main>
        <div className="inner">
          <div className="container">
            <h2>회원가입</h2>
            <div className="line"></div>
            <div className="wrap">
              <form className="signup-form">
                <fieldset>
                  <legend></legend>
                  <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="glampick@good.kr"
                      />
                      <div className="form-button">
                        <MainButton label="인증코드 발송" />
                      </div>
                    </div>
                  </div>
                  <p className="error-message"></p>
                  <div className="form-group">
                    <label htmlFor="auth-code">인증코드</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="auth-code"
                        required
                        placeholder="인증코드를 입력해주세요"
                      />
                      <div className="form-button">
                        <MainButton label="인증코드 발송" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      id="password"
                      className="password-input"
                      required
                      placeholder="비밀번호를 입력해주세요"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">비밀번호 확인</label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="confirm-password-input"
                      required
                      placeholder="비밀번호를 한번 더 입력해주세요"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input
                      type="text"
                      id="name"
                      className="name-input"
                      required
                      placeholder="이름을 입력해주세요"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="nickname"
                        required
                        placeholder="닉네임을 입력해주세요"
                      />
                      <div className="form-button">
                        <MainButton label="중복확인" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cellphone">휴대폰</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="cellphone"
                        required
                        placeholder="휴대폰번호를 정확히 입력해주세요"
                      />
                      <div className="form-button">
                        <MainButton label="인증번호 발송" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="auth-number">인증번호</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="auth-number"
                        required
                        placeholder="인증번호를 입력해주세요"
                      />
                      <div className="form-button">
                        <MainButton label="확인" />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <TermsGroupStyle>
                  <div className="terms-group">
                    <p>이용약관 동의</p>
                    <ul>
                      <li>
                        <input type="checkbox" id="agree-all" />
                        <label htmlFor="agree-all" className="agree-all">
                          모두 동의
                        </label>
                      </li>
                      <li className="terms-item">
                        <div className="left-content">
                          <input type="checkbox" id="agree-terms" />
                          <label htmlFor="agree-terms">(필수) 이용약관</label>
                        </div>
                        <button type="button" className="view-terms-btn">
                          약관보기 &gt;
                        </button>
                      </li>
                      <li className="terms-item">
                        <div className="left-content">
                          <input type="checkbox" id="agree-privacy" />
                          <label htmlFor="agree-privacy">
                            (필수) 개인정보 처리방침
                          </label>
                        </div>
                        <button type="button" className="view-terms-btn">
                          약관보기 &gt;
                        </button>
                      </li>
                      <li className="terms-item">
                        <div className="left-content">
                          <input type="checkbox" id="agree-marketing" />
                          <label htmlFor="agree-marketing">
                            (선택) 이벤트 정보 및 마케팅 수신활용
                          </label>
                        </div>
                        <button type="button" className="view-terms-btn">
                          약관보기 &gt;
                        </button>
                      </li>
                    </ul>
                  </div>
                </TermsGroupStyle>
                <div className="sign-button">
                  <MainButton label="회원가입" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </WrapStyle>
  );
};

export default SignupPage;

import styled from "@emotion/styled";
import React from "react";
import { colorSystem } from "../../styles/color";

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
    margin-top: 25px;
    margin-bottom: 70px;
    font-size: 25px;
  }

  .signup-form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    display: block;
    font-size: 20px;
    margin-bottom: 7px;
  }
  .form-group label:after {
    content: "*";
    color: #ff5858;
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .form-group input,
  .input-group input {
    width: calc(100% - 150px - 10px);
    /* 너비 조정: 100%에서 버튼 너비와 마진 값을 뺀 값 */
    height: 40px;
    border: none;
    background-color: ${colorSystem.g100};
    padding: 10px;
    font-size: 16px;
  }

  .password-input,
  .confirm-password-input,
  .name-input {
    margin-bottom: 30px;
  }

  .form-group button {
    display: inline-block;
    width: 140px;
    height: 40px;
    padding: 10px;
    background-color: ${colorSystem.p500};
    color: white;
    font-size: 18px;
    border-radius: 20px;
    /* 테두리 수정해야함 */
    border: none;
    cursor: pointer;
  }

  .signup-btn {
    width: 100%;
    height: 50px;
    padding: 10px;
    background-color: ${colorSystem.p500};
    color: white;
    font-size: 23px;
    border-radius: 20px;
    /* 테두리 수정해야함 */
    border: none;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  .terms-group p {
    font-size: 23px;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .terms-group li {
    margin-bottom: 10px;
  }

  .terms-group input {
  }
`;

const SignupPage = () => {
  return (
    <WrapStyle>
      <main>
        <div className="inner">
          <div className="container">
            <h2>회원가입</h2>
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
                      <button>인증코드 발송</button>
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
                      <button>확인</button>
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
                      <button>중복확인</button>
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
                      <button>인증번호 발송</button>
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
                      <button>확인</button>
                    </div>
                  </div>
                </fieldset>
                <div className="terms-group">
                  <p>이용약관 동의</p>
                  <ul>
                    <li>
                      <input type="checkbox" id="agree-all" />
                      <label htmlFor="agree-all" className="agree-all">
                        모두 동의
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="agree-terms" />
                      <label htmlFor="agree-terms">(필수)이용약관</label>
                      <a href="#">약관보기</a>
                    </li>
                    <li>
                      <input type="checkbox" id="agree-privacy" />
                      <label htmlFor="agree-privacy">
                        (필수)개인정보 처리방침
                      </label>
                      <a href="#">약관보기</a>
                    </li>
                    <li>
                      <input type="checkbox" id="agree-marketing" />
                      <label htmlFor="agree-marketing">
                        (선택)이벤트 정보 및 마케팅 수신활용
                      </label>
                      <a href="#">약관보기</a>
                    </li>
                  </ul>
                </div>
                <input type="submit" value="회원가입" className="signup-btn" />
              </form>
            </div>
          </div>
        </div>
      </main>
    </WrapStyle>
  );
};

export default SignupPage;

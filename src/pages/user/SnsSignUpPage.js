import React from "react";
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
    color: ${colorSystem.g800};
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 1.6rem;
    /* 반응형 */
    ${size.mid} {
      font-size: 1.4rem;
    }
  }

  /* 구분선 */
  .line {
    width: 80%;
    border-bottom: 1.5px solid ${colorSystem.g500};
    margin-bottom: 35px;
  }

  /* 회원가입 폼 */
  .signup-form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group label {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 7px;
    ${size.mid} {
      font-size: 1rem;
    }
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    ${size.mid} {
      width: calc(100% - 140px - 10px);
      width: 100%;
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
    font-size: 0.9rem;
    ${size.mid} {
      font-size: 0.8rem;
    }
  }

  // 버튼 없는 input에 마진 주기
  .name-input {
    margin-bottom: 30px;
  }

  /* 폼 버튼 */
  .form-button > button {
    width: 140px;
    height: 40px;
    font-size: 0.95rem;
    ${size.mid} {
      width: 130px;
      font-size: 0.8rem;
    }
  }

  /* 회원가입 버튼 */
  .sign-button > button {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 100px;
    font-size: 1.2rem;
    ${size.mid} {
      font-size: 1.1rem;
      margin-bottom: 80px;
    }
  }
`;

/* 약관동의 */
const TermsGroupStyle = styled.div`
  .terms-group p {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 25px;
    ${size.mid} {
      font-size: 1rem;
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
  /* 모두동의 체크박스 */
  .terms-group input {
    width: 18px;
    height: 18px;
    ${size.mid} {
      width: 15px;
      height: 15px;
    }
  }
  .terms-group label {
    font-size: 1rem;
    ${size.mid} {
      font-size: 0.9rem;
    }
  }

  .terms-item {
    display: flex;
    justify-content: space-between;
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
    font-size: 1rem;
    color: ${colorSystem.g700};
    border: none;
    background-color: transparent;
    cursor: pointer;
    ${size.mid} {
      font-size: 0.9rem;
    }
  }
`;

const SnsSignUpPage = () => {
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

export default SnsSignUpPage;

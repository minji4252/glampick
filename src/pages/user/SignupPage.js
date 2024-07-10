import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import { MainButton } from "../../components/common/Button";
import { useEffect, useState } from "react";
import { postUserEmail } from "../../apis/userapi";
import axios from "axios";

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
    margin-bottom: 15px;
  }

  /* 회원가입 폼 */
  .signup-form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group label {
    display: block;
    font-size: 1.1rem;
    margin-top: 20px;
    margin-bottom: 7px;
    ${size.mid} {
      font-size: 1rem;
    }
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 10px;
    ${size.mid} {
      width: 100%;
      /* 다른 input과 너비 동일하게 맞춤 */
    }
  }

  .error-message {
    display: block;
    color: ${colorSystem.error};
    font-size: 0.9rem;
    ${size.mid} {
      font-size: 0.8rem;
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
    margin-bottom: 10px;
    font-size: 0.9rem;
    ${size.mid} {
      width: calc(100% - 140px - 10px);
      font-size: 0.8rem;
    }
  }

  // 버튼 없는 input에 마진 주기
  .password-input,
  .confirm-password-input,
  .name-input {
    margin-bottom: 10px;
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
    margin-top: 20px;
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

const SignupPage = () => {
  // 폼 입력 상태 관리 설정
  const [userEmail, setUserEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [authNumber, setAuthNumber] = useState("");

  // 문자열 형식 유효성 검사
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^[0-9]{11,13}$/;
  const nickNamePattern = /^[a-zA-Z가-힣][a-zA-Z0-9가-힣]{2,10}$/;
  const namePattern = /^[가-힣]{1,10}$/;

  // 닉네임 중복 확인
  const [isCheckNickName, setIsCheckNickName] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const [emailSend, setEmailSend] = useState(false);

  // 비밀번호 일치여부 확인
  const [passwordMatch, setPasswordMatch] = useState(true);

  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState("");

  // 약관동의 체크박스 상태 관리
  const [isAgreeAllChecked, setIsAgreeAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });

  // 메일 인증
  const postUserEmail = async userEmail => {
    try {
      const reqData = `/api/auth/mail-send?userEmail=${userEmail}`;
      const response = await axios.post(reqData, { userEmail });
      console.log(response.data.code);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // 메일 인증시 처리할 함수
  const handlemailSubmit = async e => {
    e.preventDefault();
    const result = await postUserEmail(userEmail);
    console.log(result.data.code);
    if (result.data.code === "SU") {
      console.log("메일인증 성공");
    }
  };

  // 인증코드
  const postAuthCode = async ({ userEmail, authCode }) => {
    // console.log(userEmail);
    // console.log(authCode);
    try {
      const result = await axios.post(`/api/auth/mail-check`, {
        userEmail,
        authCode,
      });
      // const reqData = `/api/auth/mail-check`;
      // console.log(reqData);
      // const response = await axios.post(reqData, {
      //   userEmail: userEmail,
      //   authCode: authCode,
      // });
      console.log(result);
      return result;
    } catch (error) {
      console.log("코드인증에러", error);
    }
  };

  // 메일 인증코드 확인 시 처리할 함수
  const handleAuthCodeSubmit = async e => {
    e.preventDefault();

    const result = await postAuthCode({ userEmail, authCode });
    console.log(result.data);
    if (result.data.code === "SU") {
      console.log("코드인증 성공");
    } else {
      console.log("코드인증 실패");
    }
  };

  // 닉네임 중복 확인 결과 처리

  // 약관 전체동의 체크박스 핸들러
  const handleAgreeAllChange = e => {
    const isChecked = e.target.checked;
    setIsAgreeAllChecked(isChecked);
    setCheckboxes({
      agreeTerms: isChecked,
      agreePrivacy: isChecked,
      agreeMarketing: isChecked,
    });
  };

  // 약관 개별동의 체크박스 핸들러
  const handleCheckboxChange = e => {
    const { id, checked } = e.target;
    const updateCheckboxes = {
      ...checkboxes,
      [id]: checked,
    };
    setCheckboxes(updateCheckboxes);
    setIsAgreeAllChecked(Object.values(updateCheckboxes).every(value => value));
  };

  // 회원가입시 처리할 함수
  const handleSubmit = e => {
    e.preventDefault();

    // 이메일 인증

    // 닉네임 중복 확인

    // 핸드폰 인증

    // 비밀번호 일치 여부 확인
    if (userPw !== userPwCheck) {
      setPasswordMatch(false);
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setPasswordMatch(true);
    }

    // 기타 입력 값 유효성 검사
    if (!passwordPattern.test(userPw)) {
      setErrorMessage(
        "비밀번호는 대소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.",
      );
      return;
    }
    if (!phonePattern.test(userPhone)) {
      setErrorMessage("휴대폰 번호는 11~13자의 숫자여야 합니다.");
      return;
    }
    if (!namePattern.test(userName)) {
      setErrorMessage("이름은 1~10자 사이 한글만 가능합니다.");
      return;
    }
    if ((!nickNamePattern, test(userNickName))) {
      setErrorMessage(
        "닉네임은 2~10자의 대소문자, 한글, 숫자로 구성되어야 하며, 숫자는 첫째자리에 올 수 없습니다.",
      );
    }
  };

  return (
    <WrapStyle>
      <main>
        <div className="inner">
          <div className="container">
            <h2>회원가입</h2>
            <div className="line"></div>
            <div className="wrap">
              <form
                className="signup-form"
                onSubmit={e => {
                  handleSubmit(e);
                }}
              >
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
                        value={userEmail}
                        onChange={e => {
                          setUserEmail(e.target.value);
                          setEmailValid(emailPattern.test(e.target.value));
                        }}
                      />
                      <div className="form-button">
                        <MainButton
                          label="인증코드 발송"
                          onClick={e => {
                            handlemailSubmit(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {!emailValid && (
                    <p className="error-message">
                      유효한 이메일 형식이 아닙니다.
                    </p>
                  )}
                  <div className="form-group">
                    <label htmlFor="auth-code">인증코드</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="auth-code"
                        required
                        placeholder="인증코드를 입력해주세요"
                        value={authCode}
                        onChange={e => setAuthCode(e.target.value)}
                      />
                      <div className="form-button">
                        <MainButton
                          label="확인"
                          onClick={e => {
                            handleAuthCodeSubmit(e);
                          }}
                        />
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
                      value={userPw}
                      onChange={e => {
                        setUserPw(e.target.value);
                        setPasswordValid(passwordPattern.test(e.target.value));
                        setPasswordMatch(e.target.value === userPwCheck);
                      }}
                    />
                    {!passwordValid && (
                      <p className="error-message">
                        비밀번호가 형식에 맞지 않습니다 (대소문자, 숫자,
                        특수문자를 포함해 8자 이상)
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirm-password">비밀번호 확인</label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="confirm-password-input"
                      required
                      placeholder="비밀번호를 한번 더 입력해주세요"
                      value={userPwCheck}
                      onChange={e => {
                        setUserPwCheck(e.target.value);
                        setPasswordMatch(e.target.value === userPw);
                      }}
                    />
                    {userPwCheck && !passwordMatch && (
                      <p className="error-message">
                        비밀번호가 일치하지 않습니다.
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input
                      type="text"
                      id="name"
                      className="name-input"
                      required
                      placeholder="이름을 입력해주세요"
                      value={userName}
                      onChange={e => {
                        setUserName(e.target.value);
                        setNameValid(namePattern.test(e.target.value));
                      }}
                    />
                  </div>
                  {!nameValid && (
                    <p className="error-message">
                      이름이 형식에 맞지 않습니다 (1~10자 사이 한글만 가능)
                    </p>
                  )}
                  <div className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="nickname"
                        required
                        placeholder="닉네임을 입력해주세요"
                        value={userNickName}
                        onChange={e => {
                          setUserNickName(e.target.value);
                          setNickNameValid(
                            nickNamePattern.test(e.target.value),
                          );
                        }}
                      />
                      <div className="form-button">
                        <MainButton label="중복확인" />
                      </div>
                    </div>
                    {!nickNameValid && (
                      <p className="error-message">
                        닉네임이 형식에 맞지 않습니다 (2~10자의 대소문자, 한글,
                        숫자만 가능)
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cellphone">휴대폰</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="cellphone"
                        required
                        placeholder="휴대폰번호를 정확히 입력해주세요"
                        value={userPhone}
                        onChange={e => {
                          setUserPhone(e.target.value);
                          setPhoneValid(phonePattern.test(e.target.value));
                        }}
                      />
                      <div className="form-button">
                        <MainButton label="인증번호 발송" />
                      </div>
                    </div>
                    {!phoneValid && (
                      <p className="error-message">
                        핸드폰 번호를 바르게 기재해주세요 (11~13자의 숫자만
                        가능)
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="auth-number">인증번호</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="auth-number"
                        required
                        placeholder="인증번호를 입력해주세요"
                        value={authNumber}
                        onChange={e => setAuthNumber(e.target.value)}
                      />
                      <div className="form-button">
                        <MainButton label="확인" />
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* 약관 동의 */}
                <TermsGroupStyle>
                  <div className="terms-group">
                    <p>이용약관 동의</p>
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          id="agreeAll"
                          checked={isAgreeAllChecked}
                          onChange={e => {
                            handleAgreeAllChange(e);
                          }}
                        />
                        <label htmlFor="agreeAll" className="agree-all">
                          모두 동의
                        </label>
                      </li>
                      <li className="terms-item">
                        <div className="left-content">
                          <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={checkboxes.agreeTerms}
                            onChange={e => {
                              handleCheckboxChange(e);
                            }}
                          />
                          <label htmlFor="agreeTerms">(필수) 이용약관</label>
                        </div>
                        <button type="button" className="view-terms-btn">
                          약관보기 &gt;
                        </button>
                      </li>
                      <li className="terms-item">
                        <div className="left-content">
                          <input
                            type="checkbox"
                            id="agreePrivacy"
                            checked={checkboxes.agreePrivacy}
                            onChange={e => {
                              handleCheckboxChange(e);
                            }}
                          />
                          <label htmlFor="agreePrivacy">
                            (필수) 개인정보 처리방침
                          </label>
                        </div>
                        <button type="button" className="view-terms-btn">
                          약관보기 &gt;
                        </button>
                      </li>
                      <li className="terms-item">
                        <div className="left-content">
                          <input
                            type="checkbox"
                            id="agreeMarketing"
                            checked={checkboxes.agreeMarketing}
                            onChange={e => {
                              handleCheckboxChange(e);
                            }}
                          />
                          <label htmlFor="agreeMarketing">
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

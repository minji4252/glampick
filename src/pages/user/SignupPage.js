import axios from "axios";
import { useState } from "react";
import { MainButton } from "../../components/common/Button";
import { TermsGroupStyle, WrapStyle } from "../../styles/signupstyle";
import { postMailSend } from "../../apis/userapi";

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
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

  // 메일 인증시 처리할 함수
  const handlemailSubmit = async e => {
    e.preventDefault();
    const result = await postMailSend({ userEmail });
    // console.log(result.data);
    console.log(result.data.code);
    if (result.data.code === "SU") {
      alert("인증코드가 발송되었습니다!");
      // 타이머 넣어야 함
    }
  };

  // 인증코드 API 호출 함수
  const postAuthCode = async ({ userEmail, authCode }) => {
    try {
      const reqData = `/api/auth/mail-check?userEmail=${userEmail}&authKey=${authCode}`;
      console.log(reqData);
      const response = await axios.post(reqData, {
        userEmail: userEmail,
        authKey: authCode,
      });
      console.log(response);
      return response;
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

    // 이메일 유효성 검사 체크
    // 이메일 중복확인 체크
    // 이메일 인증코드 일치여부 체크

    // 비밀번호 유효성 검사 체크
    if (!passwordPattern.test(userPw)) {
      setErrorMessage(
        "비밀번호는 영어, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.",
      );
      return;
    }

    // 비밀번호 일치 여부 체크
    if (userPw !== userPwCheck) {
      setPasswordMatch(false);
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setPasswordMatch(true);
    }

    // 이름 유효성 검사 체크
    if (!namePattern.test(userName)) {
      setErrorMessage("이름은 1~10자 사이 한글만 가능합니다.");
      return;
    }
    // 닉네임 유효성 검사 체크
    if (!nickNamePattern.test(userNickName)) {
      setErrorMessage(
        "닉네임은 2~10자의 대소문자, 한글, 숫자로 구성되어야 하며, 숫자는 첫째자리에 올 수 없습니다.",
      );
    }
    // 닉네임 중복 확인 체크

    // 핸드폰 유효성 검사 체크
    if (!phonePattern.test(userPhone)) {
      setErrorMessage("휴대폰 번호는 11~13자의 숫자여야 합니다.");
      return;
    }
    // 핸드폰 중복확인 체크
    // 핸드폰 인증번호 일치여부 체크
  };

  // 백엔드에 전달하는 회원가입 정보
  const signUpReslutFunc = async () => {
    const signUpRequestData = {
      userEmail: userEmail,
      userPw: userPw,
      userPhone: userPhone,
      userName: userName,
      userNickname: userNickName,
    };

    const postAuthSignUp = async data => {
      try {
        const response = await axios.post("api/auth/sign-up", data);
        return response;
      } catch (error) {
        console.log(error);
      }
    };

    const signUpResult = await postAuthSignUp(signUpRequestData);

    // 회원가입 성공, 실패 메세지 안내
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
                        비밀번호가 형식에 맞지 않습니다 (영어, 숫자, 특수문자
                        포함 8자 이상 가능)
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
                      {/* <div className="form-button">
                        <MainButton label="중복확인" />
                      </div> */}
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

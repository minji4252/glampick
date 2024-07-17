import { useEffect, useState } from "react";
import {
  postAuthCode,
  postCheckSms,
  postMailSend,
  postSendSms,
  postSignUp,
} from "../../apis/userapi";
import AlertModal from "../../components/common/AlertModal";
import { MainButton } from "../../components/common/Button";
import TermsModal from "../../components/common/TermsModal";
import useModal from "../../hooks/UseModal";
import { TermsGroupStyle, WrapStyle } from "../../styles/signupstyle";
import { useNavigate } from "react-router-dom";

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
  const authCodePattern = /^[0-9]{6}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^[0-9]{11,13}$/;
  const nickNamePattern = /^[a-zA-Z가-힣][a-zA-Z0-9가-힣]{2,10}$/;
  const namePattern = /^[가-힣]{1,10}$/;
  const authNumberPattern = /^[0-9]{6}$/;

  // 문자열 형식 유효성 일치여부 확인
  const [emailValid, setEmailValid] = useState(true);
  const [authCodeValid, setAuthCodeValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [authNumberValid, setAuthNumberValid] = useState(true);

  // 비밀번호 일치여부 확인
  const [passwordMatch, setPasswordMatch] = useState(true);

  // 메일발송 여부 확인
  const [isEmailSent, setIsEmailSent] = useState(false);
  // 핸드폰 발송 여부 확인
  const [isSmsSent, setIsSmsSent] = useState(false);

  // 이메일 인증을 위한 타이머 변수
  const [emailTimer, setEmailTimer] = useState(0);
  const [emailTimerId, setEmailTimerId] = useState(null);

  // 핸드폰 인증을 위한 타이머 변수
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [phoneTimerId, setPhoneTimerId] = useState(null);

  // 인증 완료 여부 상태 추가
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthNumberVerified, setIsAuthNumberVerified] = useState(false);

  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState("");

  // 약관동의 체크박스 상태 관리
  const [isAgreeAllChecked, setIsAgreeAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  // 약관보기 모달 관련 상태 및 함수
  const [isTermsModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const navigate = useNavigate();
  // 약관보기 모달
  const openTermsModal = modalType => {
    setSelectedModal(modalType);
    setIsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsModalOpen(false);
  };

  // 메일 인증 타이머 초기화 및 정리
  useEffect(() => {
    if (emailTimer > 0 && !emailTimerId) {
      const id = setInterval(() => {
        setEmailTimer(prevemailTimer => prevemailTimer - 1);
      }, 1000); // 1000밀리초 (1초)마다 실행
      setEmailTimerId(id);
    } else if (emailTimer === 0 && emailTimerId) {
      clearInterval(emailTimerId);
      setEmailTimerId(null);
    }
    return () => {
      if (emailTimerId) {
        clearInterval(emailTimerId);
        setEmailTimerId(null);
      }
    };
  }, [emailTimer, emailTimerId]);

  // 핸드폰 인증 타이머 초기화 및 정리
  useEffect(() => {
    if (phoneTimer > 0 && !phoneTimerId) {
      const id = setInterval(() => {
        setPhoneTimer(prevPhoneTimer => prevPhoneTimer - 1);
      }, 1000); // 1000밀리초 (1초)마다 실행
      setPhoneTimerId(id);
    } else if (phoneTimer === 0 && phoneTimerId) {
      clearInterval(phoneTimerId);
      setPhoneTimerId(null);
    }
    return () => {
      if (phoneTimerId) {
        clearInterval(phoneTimerId);
        setPhoneTimerId(null);
      }
    };
  }, [phoneTimer, phoneTimerId]);

  // 메일 인증시 처리할 함수
  const handlEmailSubmit = async e => {
    e.preventDefault();
    const result = await postMailSend({ userEmail });
    // console.log(result.data);
    console.log(result.data.code);
    if (result.data.code === "SU") {
      openModal({
        message: "인증코드가 발송되었습니다. 메일을 확인해주세요",
      });
      // 메일발송 성공
      setIsEmailSent(true);
      setEmailTimer(299);
    } else if (result.data.code === "DE") {
      openModal({
        message: "중복된 이메일입니다.",
      });
    } else if (result.data.code === "EE") {
      openModal({
        message: "메일 주소를 입력해주세요.",
      });
    } else if (result.data.code === "IE") {
      openModal({
        message: "메일 형식이 올바르지 않습니다.",
      });
    } else {
      openModal({
        message: "메일 발송에 실패하였습니다. 다시 시도해주세요.",
      });
    }
  };

  // 인증코드 확인 시 처리할 함수
  const handleAuthCodeSubmit = async e => {
    e.preventDefault();
    const result = await postAuthCode({ userEmail, authCode });
    console.log(result.data);
    if (result.data.code === "SU") {
      setIsEmailVerified(true);
      setIsAuthCodeVerified(true);
      openModal({
        message: "인증이 완료되었습니다.",
      });
      setIsEmailSent(false);
      setEmailTimer(0);
      if (emailTimerId) {
        // 타이머 중지
        clearInterval(emailTimerId);
        setEmailTimerId(null);
      }
    } else if (result.data.code === "IC") {
      openModal({
        message: "인증코드가 올바르지 않습니다.",
      });
    } else if (result.data.code === "VF") {
      openModal({
        message: "인증코드를 입력해주세요.",
      });
    } else {
      openModal({
        message: "인증에 실패하였습니다. 다시 시도해주세요",
      });
    }
  };

  // 이메일 타이머 포맷 함수 (분:초 형식으로 표시)
  const formatEmailTimer = () => {
    const minutes = Math.floor(emailTimer / 60);
    const seconds = emailTimer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // 핸드폰 인증시 처리할 함수
  const handleSmsSubmit = async e => {
    e.preventDefault();
    const result = await postSendSms({ userPhone });
    console.log(result.data);
    if (result.data.code === "SU") {
      openModal({
        message: "인증코드가 발송되었습니다. 문자메세지를 확인해주세요",
      });
      // Sms 발송 성공
      setIsSmsSent(true);
      setPhoneTimer(299);
    } else if (result.data.code === "IPH") {
      openModal({
        message: "전화번호 형식이 올바르지 않습니다.",
      });
    } else if (result.data.code === "DT") {
      openModal({
        message: "중복된 전화번호 입니다.",
      });
    } else {
      openModal({
        message: "발송 실패하였습니다. 다시 시도해주세요",
      });
    }
  };

  // 핸드폰 인증코드 처리할 함수
  const handleAuthNumberSubmit = async e => {
    e.preventDefault();

    const result = await postCheckSms({ userPhone, authNumber });
    console.log(result);
    if (result.data.code === "SU") {
      setIsPhoneVerified(true);
      setIsAuthNumberVerified(true);
      openModal({
        message: "인증이 완료되었습니다.",
      });
      setIsSmsSent(false);
      setPhoneTimer(0);
      if (phoneTimerId) {
        // 타이머 중지
        clearInterval(phoneTimerId);
        setPhoneTimerId(null);
      }
    } else if (result.data.code === "IC") {
      openModal({
        message: "인증코드가 올바르지 않습니다.",
      });
    } else {
      openModal({
        message: "인증에 실패하였습니다. 다시 시도해주세요",
      });
    }
  };

  // 핸드폰 타이머 포맷 함수 (분:초 형식으로 표시)
  const formatPhoneTimer = () => {
    const minutes = Math.floor(phoneTimer / 60);
    const seconds = phoneTimer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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
  const handleSubmit = async e => {
    e.preventDefault();

    // 입력창이 비어있을 경우 체크
    if (
      !userEmail ||
      !authCode ||
      !userPw ||
      !userPwCheck ||
      !userName ||
      !userNickName ||
      !userPhone ||
      !authNumber
    ) {
      openModal({
        message: "입력창을 모두 기재해주세요",
      });
      return; // 회원가입을 막고 여기서 함수 실행을 종료
    }
    //  이메일 인증
    if (!isEmailVerified) {
      setIsModalOpen(true);
      openModal({
        message: "이메일을 인증해주세요",
      });
      return;
    }
    // 이메일 인증코드 확인
    if (!isAuthCodeVerified) {
      setIsModalOpen(true);
      openModal({
        message: "이메일 인증코드를 확인해주세요",
      });
      return;
    }
    //  핸드폰 인증
    if (!isPhoneVerified) {
      setIsModalOpen(true);
      openModal({
        message: "핸드폰을 인증해주세요",
      });
      return;
    }
    // 핸드폰 인증번호 확인
    if (!isAuthNumberVerified) {
      setIsModalOpen(true);
      openModal({
        message: "핸드폰 인증코드를 확인해주세요",
      });
      return;
    }
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
    // 핸드폰 유효성 검사 체크
    if (!phonePattern.test(userPhone)) {
      setErrorMessage("휴대폰 번호는 11~13자의 숫자여야 합니다.");
      return;
    }

    // 필수 이용약관 체크 여부 확인
    if (!checkboxes.agreeTerms || !checkboxes.agreePrivacy) {
      setIsModalOpen(true);
      openModal({
        message: "필수 이용약관에 동의해주세요",
      });
      return;
    }
    // 백엔드에 전달할 회원가입 유저 정보
    const result = await postSignUp({
      userEmail,
      userPw,
      userPhone,
      userName,
      userNickName,
    });

    console.log(result.data);
    if (result.data.code === "SU") {
      openModal({
        message: "회원가입에 성공하였습니다! 로그인 후 이용해주세요",
      });
      setTimeout(() => {
        navigate("/login", { state: { fromSignup: true } });
      }, 1000); // 1초 후에 페이지 이동
    } else if (result.data.code === "DN") {
      openModal({
        message: "이미 사용중인 닉네임입니다.",
      });
    } else if (result.data.code === "IN") {
      openModal({
        message: "닉네임이 형식에 맞지 않습니다.",
      });
    } else if (result.data.code === "IP") {
      openModal({
        message: "비밀번호가 형식에 맞지 않습니다.",
      });
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
                        disabled={isEmailVerified}
                      />
                      <div className="form-button">
                        <MainButton
                          label="인증코드 발송"
                          onClick={e => {
                            handlEmailSubmit(e);
                          }}
                        />
                        <AlertModal
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          message={modalMessage}
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
                        maxLength="6"
                        pattern="\d{6}"
                        placeholder="인증코드를 입력해주세요"
                        value={authCode}
                        onChange={e => {
                          setAuthCode(e.target.value);
                          setAuthCodeValid(
                            authCodePattern.test(e.target.value),
                          );
                        }}
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
                  {/* 타이머 */}
                  {isEmailSent && emailTimer > 0 && (
                    <div>
                      <p className="timer">남은 시간: {formatEmailTimer()}</p>
                    </div>
                  )}
                  {isEmailSent && emailTimer === 0 && (
                    <div>
                      <p className="time-over">
                        인증 시간이 만료되었습니다. 다시 발송해주세요.
                      </p>
                    </div>
                  )}
                  {/* {!authCodeValid && (
                    <p className="error-message">
                      인증코드는 숫자로만 입력해주세요.
                    </p>
                  )} */}
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
                        disabled={isPhoneVerified}
                      />
                      <div className="form-button">
                        <MainButton
                          label="인증번호 발송"
                          onClick={e => {
                            handleSmsSubmit(e);
                          }}
                        />
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
                        maxLength="6"
                        pattern="\d{6}"
                        placeholder="인증번호를 입력해주세요"
                        value={authNumber}
                        onChange={e => {
                          setAuthNumber(e.target.value);
                          setAuthNumberValid(
                            authNumberPattern.test(e.target.value),
                          );
                        }}
                      />
                      <div className="form-button">
                        <MainButton
                          label="확인"
                          onClick={e => {
                            handleAuthNumberSubmit(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 타이머 */}
                  {isSmsSent && phoneTimer > 0 && (
                    <div>
                      <p className="timer">남은 시간: {formatPhoneTimer()}</p>
                    </div>
                  )}
                  {isSmsSent && phoneTimer === 0 && (
                    <div>
                      <p className="time-over">
                        인증 시간이 만료되었습니다. 다시 발송해주세요.
                      </p>
                    </div>
                  )}
                  {/* {!authNumberValid && (
                    <p className="error-message">
                      인증번호는 숫자로만 입력해주세요.
                    </p>
                  )} */}
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
                        <button
                          type="button"
                          className="view-terms-btn"
                          onClick={() => {
                            openTermsModal("terms");
                          }}
                        >
                          약관보기 &gt;
                        </button>
                        {selectedModal === "terms" && (
                          <TermsModal
                            isOpen={isTermsModalOpen}
                            onClose={closeTermsModal}
                            title="이용약관"
                            content="제 1 조 (목적) 이 약관은 [주식회사 글램픽] (이하 서비스)의 이용과 관련하여
        서비스 제공자와 회원 간의 권리, 의무 및 책임사항 등을 규정하는 것을
        목적으로 합니다. 제 2 조 (정의) 서비스란 [주식회사 글램픽]이 제공하는
        [서비스 내용]을 말합니다. 회원이란 본 약관에 동의하고 서비스에 가입하여
        이용자 아이디(ID)를 부여받은 자를 말합니다. 아이디(ID)란 회원의 식별과
        서비스 이용을 위하여 회원이 설정하고 서비스 제공자가 승인하는 문자와
        숫자의 조합을 말합니다. 비밀번호란 회원의 동일성 확인과 비밀 보호를 위해
        회원이 설정한 문자와 숫자의 조합을 말합니다."
                          />
                        )}
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
                        <button
                          type="button"
                          className="view-terms-btn"
                          onClick={() => {
                            openTermsModal("privacy");
                          }}
                        >
                          약관보기 &gt;
                        </button>
                        {selectedModal === "privacy" && (
                          <TermsModal
                            isOpen={isTermsModalOpen}
                            onClose={closeTermsModal}
                            title="개인정보 처리방침"
                            content="개인정보 처리방침 내용을 여기에 작성하세요."
                          />
                        )}
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
                        <button
                          type="button"
                          className="view-terms-btn"
                          onClick={() => {
                            openTermsModal("marketing");
                          }}
                        >
                          약관보기 &gt;
                        </button>
                        {selectedModal === "marketing" && (
                          <TermsModal
                            isOpen={isTermsModalOpen}
                            onClose={closeTermsModal}
                            title="마케팅 수신활용"
                            content="마케팅수신활용 내용을 여기에 작성하세요."
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                </TermsGroupStyle>
                <div className="sign-button">
                  <MainButton
                    label="회원가입"
                    onClick={e => {
                      handleSubmit(e);
                    }}
                  />
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

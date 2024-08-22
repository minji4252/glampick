import { useEffect, useState } from "react";
import AlertModal from "../../components/common/AlertModal";
import { MainButton } from "../../components/common/Button";
import useModal from "../../hooks/UseModal";
import { WrapStyle } from "../mypage/UserInfo";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { TimerWrap } from "../ceo/CeoInfo";
import {
  PostSearchMailCheck,
  PostSearchMailSms,
  postAuthCode,
  postMailSend,
} from "../../apis/userapi";
import { ErrorMessage } from "../ceo/CeoSignup";
import axios from "axios";

const SearchPw = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 메일발송 여부 확인
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  // 인증 완료 여부 상태 추가
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  // 이메일 인증을 위한 타이머 변수
  const [emailTimer, setEmailTimer] = useState(0);
  const [emailTimerId, setEmailTimerId] = useState<NodeJS.Timer | null>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  // 메일 인증시 처리할 함수
  const handlEmailSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await PostSearchMailSms({ userEmail });
      // console.log(result.data);
      // console.log(result.data.code);
      if (result.data.code === "SU") {
        openModal({
          message: "인증코드가 발송되었습니다. \n 메일을 확인해주세요",
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
          message: "메일 발송에 실패하였습니다. \n 다시 시도해주세요.",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.error("Phone auth error:", error);
        openModal({ message: error.response?.data.message });
      }
    }
    setLoading(false);
  };

  // 인증코드 확인 시 처리할 함수
  const handleAuthCodeSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    // 인증코드가 빈 값인지 확인
    if (!authCode) {
      openModal({
        message: "인증코드를 입력해주세요.",
      });
      return; // 빈 값일 경우 서버 요청을 보내지 않도록 리턴
    }

    try {
      const result = await PostSearchMailCheck({ userEmail, authCode });
      // console.log(result.data);
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
          message: "인증에 실패하였습니다. \n 다시 시도해주세요",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        openModal({ message: error.response?.data.message });
      } else {
        openModal({ message: "인증에 실패하였습니다. \n 다시 시도해주세요" });
      }
    }
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

  // 이메일 타이머 포맷 함수 (분:초 형식으로 표시)
  const formatEmailTimer = () => {
    const minutes = Math.floor(emailTimer / 60);
    const seconds = emailTimer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <WrapStyle>
      {loading && <Loading />}
      <div className="inner">
        <p className="search">비밀번호 재설정</p>
        <div className="container">
          {/* 프로필 사진 등록 */}

          <div className="wrap">
            <form
              className="userInfo-form"
              //   onSubmit={e => {
              //     handleSubmit(e);
              //   }}
            >
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  className="name-input"
                  value={userName}
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cellphone">이메일</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="email"
                    className="email-input"
                    placeholder="이메일을 정확히 입력해주세요"
                    value={userEmail}
                    style={{ backgroundColor: "#fff" }}
                    onChange={e => {
                      setUserEmail(e.target.value);
                      setEmailValid(emailPattern.test(e.target.value));
                    }}
                    disabled={isEmailVerified}
                  />
                  <div className="form-button">
                    <div className="auth-number-btn">
                      <MainButton
                        label="인증번호 발송"
                        onClick={e => {
                          handlEmailSubmit(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {!emailValid && (
                  <ErrorMessage>유효한 이메일 형식이 아닙니다.</ErrorMessage>
                )}
              </div>
              {isEmailSent && (
                <div className="form-group">
                  <label htmlFor="auth-number">인증코드</label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="auth-number"
                      maxLength={6}
                      pattern="\d{6}"
                      placeholder="인증코드를 입력해주세요"
                      value={authCode}
                      //   onChange={e => {
                      //     setAuthNumber(e.target.value);
                      //     setAuthNumberValid(
                      //       authNumberPattern.test(e.target.value),
                      //     );
                      //   }}
                    />
                    <div className="form-button">
                      <div className="auth-number-btn">
                        <MainButton
                          label="확인"
                          onClick={e => {
                            handleAuthCodeSubmit(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* 타이머 */}
              {isEmailSent && emailTimer > 0 && (
                <TimerWrap>
                  <p className="timer">남은시간: {formatEmailTimer()}</p>
                </TimerWrap>
              )}
              {isEmailSent && emailTimer === 0 && (
                <TimerWrap>
                  <p className="time-over">
                    인증 시간이 만료되었습니다. 다시 발송해주세요.
                  </p>
                </TimerWrap>
              )}
              {/* 인증코드 확인이 완료되면 나타나기 */}
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  className="password-input"
                  placeholder="비밀번호를 입력해주세요"
                  value={userPw}
                  //   onChange={e => {
                  //     handlePasswordChange(e);
                  //     setPasswordValid(passwordPattern.test(e.target.value));
                  //     setPasswordMatch(e.target.value === userPwCheck);
                  //   }}
                />
                {!passwordValid && (
                  <p className="error-message">
                    비밀번호는 최소 8자 이상, 대소문자 및 특수문자를 포함해야
                    합니다.
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="confirm-password-input"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={userPwCheck}
                  //   onChange={e => {
                  //     handleConfirmPasswordChange(e);
                  //   }}
                />
                {!passwordMatch && (
                  <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                )}
              </div>
              <div className="modify-btn">
                <MainButton label="수정하기" />
              </div>
            </form>
            <AlertModal
              isOpen={isModalOpen}
              onClose={closeModal}
              message={modalMessage}
            />
          </div>
        </div>
      </div>
    </WrapStyle>
  );
};

export default SearchPw;

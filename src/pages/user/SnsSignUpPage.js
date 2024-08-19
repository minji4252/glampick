import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  fetchAccessToken,
  getAccessToken,
  getMemberWithAccessToken,
} from "../../apis/kkoapi";
import { MainButton } from "../../components/common/Button";
import { colorSystem, size } from "../../styles/color";
import { TermsGroupStyle } from "../../styles/signupstyle";
import { ErrorMessage, SignupWrapStyle, modalMessages } from "../ceo/CeoSignup";
import { useSearchParams } from "react-router-dom";
import useModal from "../../hooks/UseModal";
import {
  postCheckSms,
  postSendSms,
  postSignUp,
  postSocailSignUp,
} from "../../apis/userapi";
import Loading from "../../components/common/Loading";
import AlertModal from "../../components/common/AlertModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidationSchema } from "../../components/validation/userValidationSchema";
import { TimerWrap } from "../ceo/CeoInfo";
import TermsModal from "../../components/common/TermsModal";

const WrapStyle = styled.div`
  position: relative;

  .container {
    display: flex;
    width: 760px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    width: 80%;
    display: flex;
    padding: 20px;
    justify-content: center;
    color: ${colorSystem.g800};
    font-size: 1.6rem;
    border-bottom: 1.5px solid ${colorSystem.g500};
    /* 반응형 */
    ${size.mid} {
      font-size: 1.4rem;
    }
  }
`;

// 모달 열기 함수
const handleModalOpen = (code, type, openModal) => {
  const message = modalMessages[type][code] || modalMessages[type].default;
  openModal({ message });
};

const SnsSignUpPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    mode: "onChange",
    defaultValues: {
      providerId: "",
      userName: "",
      userPhone: "",
      userNickname: "",
      // phoneAuthCode: "",
    },
  });
  // 핸드폰 발송 여부 확인
  const [isSmsSent, setIsSmsSent] = useState(false);
  // 핸드폰 인증을 위한 타이머 변수
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [phoneTimerId, setPhoneTimerId] = useState(null);
  // 인증 완료 여부 상태 추가
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isPhoneAuthCodeVerified, setIsPhoneAuthCodeVerified] = useState(false);
  // 약관동의 체크박스 상태 관리
  const [isAgreeAllChecked, setIsAgreeAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [isTermsModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  // 로딩
  const [loading, setLoading] = useState(false);
  // 모달
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");
  const [userId, setUserId] = useState(null);

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (authCode) {
        try {
          // 액세스 토큰 가져오기
          const accessToken = await getAccessToken(authCode);
          // 사용자 정보 가져오기
          const userInfo = await getMemberWithAccessToken(accessToken);

          // userId가 제대로 받아와졌는지 확인
          console.log("Received providerId:", userInfo.id);

          setValue("providerId", userInfo.id);
          // 사용자 정보 상태 업데이트
          setUserData(userInfo);
        } catch (err) {
          setError(err.message || "Error fetching data");
        }
      }
    };
    fetchData();
  }, [authCode, setValue]);

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

  // 핸드폰 타이머 포맷 함수 (분:초 형식으로 표시)
  const formatPhoneTimer = () => {
    const minutes = Math.floor(phoneTimer / 60);
    const seconds = phoneTimer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // 휴대폰 인증코드 발송
  const handlePhoneClick = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const phone = watch("phone");
      const result = await postSendSms({ userPhone: phone });
      console.log(result);
      setIsPhoneVerified(true);
      handleModalOpen(result.data.code, "smsSend", openModal);
      if (result.data.code === "SU") {
        // Sms 발송 성공
        setIsSmsSent(true);
        setPhoneTimer(299);
      } else {
        setIsSmsSent(false);
      }
    } catch (error) {
      openModal({ message: modalMessages.smsSend.default });
    } finally {
      setLoading(false);
    }
  };

  // 휴대폰 인증코드 확인
  const handlePhoneAuthCodeClick = async e => {
    e.preventDefault();
    const phone = watch("phone");
    const smsAuthCode = watch("phoneAuthCode");
    try {
      const result = await postCheckSms({
        userPhone: phone,
        authNumber: smsAuthCode,
      });
      console.log(result);

      if (result.data.code === "SU") {
        // 인증이 성공한 경우에만 처리
        setIsPhoneVerified(true);
        setIsPhoneAuthCodeVerified(true);
        handleModalOpen(result.data.code, "phoneAuth", openModal);
        setIsSmsSent(false);
        setPhoneTimer(0);
        if (phoneTimerId) {
          // 타이머 중지
          clearInterval(phoneTimerId);
          setPhoneTimerId(null);
        }
      } else {
        // 핸드폰 인증 실패 시 상태 업데이트 방지
        setIsPhoneAuthCodeVerified(false);
      }
    } catch (error) {
      openModal({ message: modalMessages.phoneAuth.default });
    }
  };

  // 전화번호 자동 변경
  // const handleChangePhone = e => {
  //   const phoneNumber = formatPhoneNumber(e.target.value);
  //   // console.log(phoneNumber);
  //   setValue("phone", phoneNumber);
  // };

  // 전화번호 형식
  // const formatPhoneNumber = value => {
  //   if (!value) return value;
  //   const phoneNumber = value.replace(/[^\d]/g, "");
  //   const phoneNumberLength = phoneNumber.length;
  //   if (phoneNumberLength < 4) return phoneNumber;
  //   if (phoneNumberLength < 8) {
  //     return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  //   }
  //   return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  // };

  // 약관보기 모달
  const openTermsModal = modalType => {
    setSelectedModal(modalType);
    setIsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsModalOpen(false);
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

  // 이용약관 내용
  const TERMS = `제1조 (목적)
    이 약관은 (주)글램픽 (이하 “글램픽”)이 운영하는 [글램핑 예약 서비스] (이하 “서비스”)의 이용과 관련하여 회사와 이용자 간의 권리와 의무를 규정함을 목적으로 합니다.
    
    제2조 (정의)
    "서비스"란 회사가 제공하는 [글램핑 예약]을 의미합니다.
    "이용자"란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.
    "계정"이란 서비스 이용을 위해 이용자가 등록한 사용자 정보를 포함한 계정을 의미합니다.
    
    제3조 (약관의 명시와 개정)
    회사는 이 약관의 내용을 이용자가 알 수 있도록 서비스 화면에 게시합니다.
    회사는 관련 법령에 위배되지 않는 범위 내에서 본 약관을 개정할 수 있습니다. 약관 개정 시에는 적용 일자 및 개정 사유를 명시하여, 적용 일자 7일 전까지 공지합니다.
    
    제4조 (이용 계약의 성립)
    이용 계약은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 가입 신청을 완료한 때에 성립합니다.
    회사는 이용자의 가입 신청에 대해 승낙할 의무가 있으며, 승낙하지 않을 경우 사유를 이용자에게 통지합니다.
    
    제5조 (서비스의 제공)
    회사는 다음과 같은 서비스를 제공합니다:
    [서비스 제공 내용]
    [서비스 제공 방법]
    회사는 서비스의 운영과 관련하여 정기적인 점검 및 유지보수를 할 수 있으며, 이로 인해 서비스가 일시 중지될 수 있습니다.
    
    제6조 (이용자의 의무)
    이용자는 본 약관을 준수해야 하며, 서비스 이용 시 타인의 권리를 침해하거나 법령에 위반되는 행위를 해서는 안 됩니다.
    이용자는 자신의 계정 정보를 보호하고, 계정에서 발생하는 모든 활동에 대해 책임을 집니다.
    
    제7조 (서비스의 중단)
    회사는 다음과 같은 경우 서비스의 제공을 중단할 수 있습니다:
    서비스의 설비 점검 및 유지보수
    천재지변 또는 불가항력적인 사유
    기타 회사의 사정으로 인한 서비스 중단
    서비스 중단에 대해 회사는 사전에 공지하며, 불가피한 사유로 인해 사전 공지가 어려운 경우 사후에 공지합니다.
    
    제8조 (개인정보 보호)
    회사는 개인정보 보호를 위해 최선을 다하며, 개인정보 처리 방침을 별도로 정하여 이를 공지합니다.
    이용자는 회사가 개인정보를 수집하고 이용하는 방식에 대해 동의합니다.
    
    제9조 (이용계약의 해지)
    이용자는 언제든지 자신의 계정을 해지할 수 있습니다.
    회사는 이용자가 본 약관을 위반한 경우, 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
    
    제10조 (면책사항)
    회사는 서비스의 이용으로 인한 손해에 대해 책임을 지지 않으며, 천재지변, 불가항력, 기타 회사의 책임이 없는 사유로 인한 손해에 대해서도 책임을 지지 않습니다.
    회사는 이용자가 서비스 이용 중 발생한 문제에 대해 해결할 책임이 없습니다.
    
    제11조 (분쟁 해결)
    이 약관에 관한 분쟁은 회사의 본사 소재지를 관할하는 법원에서 해결합니다.
    이용자는 회사의 약관 및 정책을 확인하고 동의한 후 서비스를 이용합니다.
    
    제12조 (기타)
    본 약관은 [시행 일자]부터 시행됩니다.
    회사는 이용자에게 필요한 공지 및 정보를 이메일 또는 서비스 내 공지 사항을 통해 제공합니다.`;

  const PRIVACY_TERMS = `제1조 (목적)
    이 개인정보 처리방침은 (주)글램픽 (이하 “글램픽”)이 운영하는 [글램핑장 예약] (이하 “서비스”)에서 이용자의 개인정보를 어떻게 수집, 이용, 보관, 보호하는지에 대해 설명합니다.
    
    제2조 (개인정보의 수집 및 이용 목적)
    회사는 다음의 목적을 위해 개인정보를 수집 및 이용합니다:
    
    서비스 제공 및 관리: 서비스의 제공 및 유지보수, 고객 지원
    회원 관리: 회원 가입, 회원 정보 수정, 회원 탈퇴 처리
    마케팅 및 광고: 맞춤형 서비스 제공, 이벤트 및 프로모션 정보 제공
    서비스 개선: 이용자의 서비스 이용 패턴 분석 및 개선
    
    제3조 (수집하는 개인정보 항목)
    회사는 다음과 같은 개인정보를 수집합니다:
    필수 항목: 이름, 이메일 주소, 연락처, 주소
    선택 항목: 생년월일, 성별
    서비스 이용 과정에서 자동으로 수집되는 정보: IP 주소, 브라우저 유형, 방문 일시, 사용 기록
    
    제4조 (개인정보의 보유 및 이용 기간)
    회사는 개인정보를 수집 및 이용 목적이 달성될 때까지 보유하며, 보유 기간이 종료된 개인정보는 지체 없이 파기합니다. 단, 법령에 의한 정보 보존 의무가 있는 경우 해당 기간 동안 보관합니다.
    
    제5조 (개인정보의 제3자 제공)
    회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
    
    이용자의 동의가 있는 경우
    법령에 의한 요구가 있는 경우
    서비스 제공에 필요한 경우 (예: 결제 대행사)
    제6조 (개인정보의 안전성 확보 조치)
    회사는 개인정보 보호를 위해 다음과 같은 조치를 취합니다:
    
    접근 제한: 개인정보를 처리하는 시스템에 대한 접근 권한 제한
    암호화: 개인정보의 암호화 처리
    보안 프로그램: 해킹 및 바이러스 공격에 대한 방어 시스템 운영
    
    제7조 (이용자의 권리 및 행사 방법)
    이용자는 자신의 개인정보에 대해 열람, 수정, 삭제, 처리 정지를 요구할 수 있습니다. 이러한 요구는 회사의 고객센터를 통해 접수할 수 있습니다.
    
    제8조 (개인정보 처리방침의 변경)
    회사는 개인정보 처리방침을 변경할 수 있으며, 변경 사항은 서비스 내 공지 또는 이메일 등을 통해 이용자에게 통지합니다.
    
    제9조 (연락처)
    개인정보 관련 문의는 다음의 연락처로 문의해 주시기 바랍니다:
    
    전화: 053-572-1005
    이메일: mj17428@glampick.com
    주소: 대구광역시 중구 중앙대로 394 제일빌딩 5F`;

  const MARKETING_TERMS = `제1조 (목적)
    이 약관은 (주)글램픽 (이하 “글램픽”)이 진행하는 이벤트 및 마케팅 활동에 대한 수신 및 활용에 관한 사항을 규정합니다.
    
    제2조 (이벤트 및 마케팅 정보의 수신)
    회사는 다음과 같은 목적을 위해 이벤트 및 마케팅 정보를 수신할 수 있습니다:
    
    프로모션, 이벤트, 캠페인 정보 제공
    맞춤형 광고 및 마케팅 자료 제공
    설문조사 및 피드백 요청
    
    제3조 (정보 수신 동의)
    이용자는 회사가 제공하는 이벤트 및 마케팅 정보를 수신하기 위해 별도의 동의를 받아야 합니다. 이용자는 수신 동의를 거부할 권리가 있으며, 동의하지 않을 경우에도 서비스 이용에는 제한이 없습니다.
    
    제4조 (수신 동의 방법)
    이용자는 서비스 내에서 직접 수신 동의 여부를 선택하거나, 이메일, 문자 메시지 등을 통해 동의할 수 있습니다.
    
    제5조 (수신 동의 철회)
    이용자는 언제든지 수신 동의를 철회할 수 있으며, 철회 방법은 다음과 같습니다:
    
    서비스 내 수신 동의 해제
    이메일 또는 문자 메시지의 수신 거부 링크 클릭
    
    제6조 (개인정보 보호)
    이벤트 및 마케팅 활동을 위해 수집된 개인정보는 관련 법령 및 회사의 개인정보 처리방침에 따라 안전하게 처리됩니다.
    
    제7조 (약관의 변경)
    회사는 본 약관을 변경할 수 있으며, 변경 사항은 서비스 내 공지 또는 이메일 등을 통해 이용자에게 통지합니다.
    
    제8조 (연락처)
    이벤트 및 마케팅 정보에 대한 문의는 다음의 연락처로 문의해 주시기 바랍니다:
    
    전화: 053-572-1005
    이메일: mj17428@glampick.com
    주소: 대구광역시 중구 중앙대로 394 제일빌딩 5F`;

  // 회원가입 버튼 클릭 이벤트
  const onHandleSubmit = async data => {
    console.log("onSubmit 함수 호출됨");
    console.log("providerId:", data.providerId);
    console.log("userName:", data.userName);
    console.log("userPhone:", data.userPhone); // watch("phone") 대신 data.phone 사용
    console.log("userNickname:", data.userNickname);

    // 닉네임 중복여부 체크

    // 핸드폰 인증여부 체크
    // if (!isPhoneVerified || !isPhoneAuthCodeVerified) {
    //   openModal({ message: "휴대폰 인증을 완료해주세요." });
    //   return;
    // }

    // 필수 이용약관 체크 여부 확인
    // if (!checkboxes.agreeTerms || !checkboxes.agreePrivacy) {
    //   setIsModalOpen(true);
    //   openModal({
    //     message: "필수 이용약관에 동의해주세요",
    //   });
    //   return;
    // }
    console.log("isPhoneVerified:", isPhoneVerified);
    console.log("isPhoneAuthCodeVerified:", isPhoneAuthCodeVerified);
    // 백엔드에 보낼 회원가입 데이터
    console.log("전송시 데이터 ", data);

    try {
      setLoading(true);
      const result = await postSocailSignUp({
        providerId: data.providerId,
        userName: data.userName,
        userPhone: data.userPhone,
        userNickname: data.userNickname,
      });
      console.log("회원가입 성공:", result);
      // 회원가입 성공 시 처리 (예: 메인 페이지로 리다이렉트)
    } catch (error) {
      console.error("회원가입 실패:", error);
      openModal({ message: "회원가입에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapStyle>
      {loading && <Loading />}
      <div className="container">
        <h2>회원가입</h2>
        <SignupWrapStyle>
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                {...register("userName")}
              />
            </div>
            {errors.userName && (
              <ErrorMessage>{errors.userName.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>닉네임</label>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                {...register("userNickname")}
              />
            </div>
            {errors.userNickname && (
              <ErrorMessage>{errors.userNickname.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>휴대폰</label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                  {...register("userPhone")}
                  // disabled={isPhoneVerified} // 인증 완료 시 비활성화
                  // onChange={e => {
                  //   handleChangePhone(e);
                  // }}
                />
                <div className="form-button">
                  <MainButton
                    label="인증코드 발송"
                    onClick={e => {
                      handlePhoneClick(e);
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
            {errors.userPhone && (
              <ErrorMessage>{errors.userPhone.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>인증 코드</label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  {...register("phoneAuthCode")}
                />
                <div className="form-button">
                  <MainButton
                    label="확인"
                    onClick={e => {
                      handlePhoneAuthCodeClick(e);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* {errors.phoneAuthCode && (
              <ErrorMessage>{errors.phoneAuthCode.message}</ErrorMessage>
            )} */}
            {/* 타이머 */}
            {isSmsSent && phoneTimer > 0 && (
              <TimerWrap>
                <p className="timer">남은 시간: {formatPhoneTimer()}</p>
              </TimerWrap>
            )}
            {isSmsSent && phoneTimer === 0 && (
              <div>
                <p className="time-over">
                  인증 시간이 만료되었습니다. 다시 발송해주세요.
                </p>
              </div>
            )}
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
                        content={TERMS}
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
                        content={PRIVACY_TERMS}
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
                        content={MARKETING_TERMS}
                      />
                    )}
                  </li>
                </ul>
              </div>
            </TermsGroupStyle>
            <div className="signup-button">
              <MainButton label="회원가입" />
            </div>
          </form>
        </SignupWrapStyle>
      </div>
    </WrapStyle>
  );
};

export default SnsSignUpPage;

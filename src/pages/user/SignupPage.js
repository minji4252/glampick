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
import {
  Tab,
  Tabs,
  TermsGroupStyle,
  WrapStyle,
} from "../../styles/signupstyle";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";

const SignupPage = () => {
  // 폼 입력 상태 관리 설정 (사용자)
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
  const [isTermsModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
    const result = await postMailSend({ userEmail });
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
    setLoading(false);
  };

  // 인증코드 확인 시 처리할 함수
  const handleAuthCodeSubmit = async e => {
    e.preventDefault();
    const result = await postAuthCode({ userEmail, authCode });
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
    setLoading(true);
    const result = await postSendSms({ userPhone });
    // console.log(result.data);
    if (result.data.code === "SU") {
      openModal({
        message: "인증코드가 발송되었습니다. \n 문자메세지를 확인해주세요",
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
    setLoading(false);
  };

  // 핸드폰 인증코드 처리할 함수
  const handleAuthNumberSubmit = async e => {
    e.preventDefault();

    const result = await postCheckSms({ userPhone, authNumber });
    // console.log(result);
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
        message: "인증에 실패하였습니다. \n 다시 시도해주세요",
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

    setLoading(true);
    // 백엔드에 전달할 회원가입 유저 정보
    const result = await postSignUp({
      userEmail,
      userPw,
      userPhone,
      userName,
      userNickName,
    });
    setLoading(false);
    // console.log(result.data);
    if (result.data.code === "SU") {
      openModal({
        message: "회원가입에 성공하였습니다! \n 로그인 후 이용해주세요",
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
      {loading && <Loading />}
      <main>
        <div className="inner">
          <div className="container">
            <h2>회원가입</h2>
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
                      <p className="timer">남은시간: {formatEmailTimer()}</p>
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
                        닉네임이 형식에 맞지 않습니다 (3~10자의 대소문자, 한글,
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
                      <p className="timer">남은시간: {formatPhoneTimer()}</p>
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

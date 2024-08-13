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
      userId: "",
      userName: "",
      nickName: "",
      userPhone: "",
      phoneAuthCode: "",
    },
  });
  // 핸드폰 및 인증코드 확인 상태
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  // 로딩
  const [loading, setLoading] = useState(false);
  // 모달
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

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
          console.log("Received userId:", userInfo.id);

          setValue("userId", userInfo.id);
          // 사용자 정보 상태 업데이트
          setUserData(userInfo);
        } catch (err) {
          setError(err.message || "Error fetching data");
        }
      }
    };

    fetchData();
  }, [authCode, setValue]);

  // 휴대폰 문자 발송 로직
  const handlPhoneClick = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const phone = watch("phone");
      const result = await postSendSms({ userPhone: phone });
      console.log(result);
      setIsPhoneVerified(true);
      handleModalOpen(result.data.code, "smsSend", openModal);
    } catch (error) {
      openModal({ message: modalMessages.smsSend.default });
    } finally {
      setLoading(false);
    }
  };

  // 휴대폰 인증코드 확인 로직
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
      setIsAuthCodeVerified(true);
      handleModalOpen(result.data.code, "phoneAuthCode", openModal);
    } catch (error) {
      openModal({ message: modalMessages.phoneAuthCode.default });
    }
  };

  // // 전화번호 자동 변경
  // const handleChangePhone = e => {
  //   const phoneNumber = formatPhoneNumber(e.target.value);
  //   // console.log(phoneNumber);
  //   setValue("phone", phoneNumber);
  // };

  // // 전화번호 형식
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

  // 회원가입 버튼 클릭 이벤트
  const onSubmit = async data => {
    console.log("onSubmit 함수 호출됨");

    console.log("전송시 데이터 ", data);
    console.log("userId:", data.userId);
    console.log("userName:", data.userName);
    console.log("userPhone:", data.phone); // watch("phone") 대신 data.phone 사용
    console.log("userNickName:", data.nickName);

    // 핸드폰 인증 확인
    // 인증코드 확인
    // if (!isPhoneVerified) {
    //   openModal({ message: "휴대폰을 인증해주세요" });
    //   return;
    // }

    // if (!isAuthCodeVerified) {
    //   openModal({ message: "휴대폰 인증코드를 확인해주세요" });
    //   return;
    // }
    // 백엔드에 보낼 회원가입 데이터

    try {
      setLoading(true);
      const result = await postSocailSignUp({
        userId: data.id,
        userName: data.userName,
        userPhone: data.userPhone,
        userNickName: data.nickname,
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("nickName")}
              />
            </div>
            {errors.nickName && (
              <ErrorMessage>{errors.nickName.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>휴대폰</label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                  {...register("phone")}
                  // onChange={e => {
                  //   handleChangePhone(e);
                  // }}
                />
                <div className="form-button">
                  <MainButton
                    label="인증코드 발송"
                    onClick={e => {
                      handlPhoneClick(e);
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
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
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
            {errors.phoneAuthCode && (
              <ErrorMessage>{errors.phoneAuthCode.message}</ErrorMessage>
            )}
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
            <div className="signup-button">
              <MainButton label="회원가입" type="submit" />
            </div>
          </form>
        </SignupWrapStyle>
      </div>
    </WrapStyle>
  );
};

export default SnsSignUpPage;

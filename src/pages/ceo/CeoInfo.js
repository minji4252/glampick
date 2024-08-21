import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { postOwnerCheckSms, postOwnerSendSms } from "../../apis/ceoapi";
import { ceoAccessTokenState } from "../../atoms/loginState";
import CeoWithdrawModal from "../../components/ceo/CeoWithdrawModal";
import AlertModal from "../../components/common/AlertModal";
import { CeoButton } from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import PasswordCheckModal from "../../components/common/PasswordCheckModal";
import CeoCategories from "../../components/mypage/CeoCategories";
import { ceoInfoValidationSchema } from "../../components/validation/ceoInfoValidationSchema";
import useModal from "../../hooks/UseModal";
import { colorSystem, size } from "../../styles/color";
import { ErrorMessage, modalMessages } from "./CeoSignup";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
    margin-bottom: 80px;
  }

  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
    margin-bottom: 65px;
  }

  /* 회원탈퇴 */
  .delete-ceo {
    width: 60%;
    height: 10px;
    position: relative;
    margin: 0 auto;
    display: flex;
  }

  .delete-btn {
    position: absolute;
    right: 5px;
    font-size: 1rem;
    color: ${colorSystem.g600};
    background: none;
    border: none;
    cursor: pointer;
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  }
`;

const CeoInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid ${colorSystem.g400};
  margin-bottom: 10px;

  ${size.mid} {
    width: 80%;
  }

  /* 수정하기 버튼 */
  .modify-btn {
    width: 100%;
    > button {
      width: 100%;
      height: 50px;
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 1.1rem;
      ${size.mid} {
      }
    }
  }

  form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group {
    width: 100%;

    label {
      display: block;
      font-weight: 600;
      color: ${colorSystem.g800};
      margin-top: 20px;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      border: 0px;
      background-color: ${colorSystem.white};
      border: 1px solid ${colorSystem.g100};
      height: 40px;
      border-radius: 10px;
      padding: 15px;
    }

    /* 읽기 전용 필드의 배경색 */
    input.readOnly {
      background-color: ${colorSystem.g100};
      color: ${colorSystem.g800};
    }

    .input-group {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
    .auth-code-btn {
      max-width: 110px;
      width: 100%;
      font-size: 0.8rem;
      > button {
        width: 100%;
        height: 40px;
        padding: 8px 10px;
      }
    }
  }
`;

// 타이머
export const TimerWrap = styled.div`
  width: 100%;
  .timer {
    margin-top: 5px;
    margin-left: 5px;
    color: ${colorSystem.error};
    font-size: 0.8rem;
    ${size.mid} {
      font-size: 0.7rem;
    }
  }
  .time-over {
    margin-top: 5px;
    margin-left: 5px;
    color: ${colorSystem.error};
    font-size: 0.8rem;
    ${size.mid} {
      font-size: 0.7rem;
    }
  }
`;

// 모달 열기 함수
const handleModalOpen = (code, type, openModal) => {
  const message = modalMessages[type][code] || modalMessages[type].default;
  openModal({ message });
};

const CeoInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ownerEmail: "", // 기본 이메일 (수정 불가)
      ownerName: "", // 기본 이름 (수정 불가)
      businessNumber: "", // 기본 사업자등록번호 (수정 불가)
      password: "", // 비밀번호
      confirmPassword: "", // 비밀번호 확인
      phone: "", // 핸드폰 번호
    },
    mode: "onChange",
    resolver: yupResolver(ceoInfoValidationSchema),
  });

  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);
  // 사용자 정보 변경여부 체크 (기존값)
  const [initialValues, setInitialValues] = useState({
    password: "",
    phone: "",
  });

  // 핸드폰 인증을 위한 타이머 변수
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [phoneTimerId, setPhoneTimerId] = useState(null);

  // 핸드폰 인증코드 발송 여부 확인
  const [isSmsSent, setIsSmsSent] = useState(false);
  // 사용 가능 핸드폰 확인
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  // 인증코드 확인
  const [isPhoneAuthCodeVerified, setIsPhoneAuthCodeVerified] = useState(false);
  // 비밀번호 확인 입력창 모달
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // 회원탈퇴 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 로딩
  const [loading, setLoading] = useState(false);
  // 정보 업데이트 완료 후
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // 핸드폰 번호 상태
  const [phone, setPhone] = useState("");

  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  // 비밀번호 입력 확인 모달
  useEffect(() => {
    setIsPasswordModalOpen(true);
  }, []);

  // 비밀번호 확인 모달 닫기
  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
  };

  // 비밀번호 입력 성공 확인 함수
  const handlePasswordCheckSuccess = () => {
    setIsPasswordModalOpen(false);
  };

  // 유저 정보 불러오기
  useEffect(() => {
    const getOwnerInfo = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await axios.get(`/api/owner/info`, {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        });
        const { ownerEmail, ownerName, businessNumber, ownerPhone } =
          response.data;

        setValue("ownerEmail", ownerEmail);
        setValue("ownerName", ownerName);
        setValue("businessNumber", businessNumber);
        setValue("phone", ownerPhone);
        setInitialValues({
          password: "",
          phone: ownerPhone,
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getOwnerInfo();
  }, [ceoAccessToken, setValue]);

  // 핸드폰 번호 상태 업데이트
  useEffect(() => {
    const phoneValue = watch("phone");
    setPhone(phoneValue);
  }, [watch("phone")]);

  // 정보 변경사항 확인
  const hasChanges = () => {
    // 현재 값
    const currentValues = {
      password: watch("password") || "",
      confirmPassword: watch("confirmPassword") || "",
      phone: watch("phone") || "",
    };
    return (
      // watch로 감시하는 값이 undefined일 경우 빈 문자열로 대체
      //  실제로 값이 변경되지 않았을 경우 false를 반환
      currentValues.password !== (initialValues.password || "") ||
      currentValues.confirmPassword !== (initialValues.confirmPassword || "") ||
      currentValues.phone !== (initialValues.phone || "")
    );
  };

  // 전화번호 자동 변경
  const handleChangePhone = e => {
    const phoneNumber = formatPhoneNumber(e.target.value);
    // console.log(phoneNumber);
    setValue("phone", phoneNumber, { shouldValidate: true });
  };

  // 전화번호 형식
  const formatPhoneNumber = value => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }

    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  // 핸드폰 인증코드 발송
  const handlPhoneClick = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const phone = watch("phone");
      const result = await postOwnerSendSms({ phone });
      console.log(result);
      handleModalOpen(result.data.code, "smsSend", openModal);
      if (result.data.code === "SU") {
        // Sms 발송 성공
        setIsSmsSent(true);
        setPhoneTimer(299);
      }
    } catch (error) {
      openModal({ message: modalMessages.smsSend.default });
    } finally {
      setLoading(false);
    }
  };

  // 핸드폰 타이머 포맷 함수 (분:초 형식으로 표시)
  const formatPhoneTimer = () => {
    const minutes = Math.floor(phoneTimer / 60);
    const seconds = phoneTimer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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

  // 핸드폰 인증코드 확인
  const handlePhoneAuthCodeClick = async e => {
    e.preventDefault();
    const phone = watch("phone");
    const phoneAuthCode = watch("phoneAuthCode");
    try {
      const result = await postOwnerCheckSms({
        phone,
        phoneAuthCode,
      });
      console.log(result);
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
    } catch (error) {
      openModal({ message: modalMessages.phoneAuth.default });
    }
  };

  // ceo 정보 수정 api
  const patchOwnerInfo = async (password, phone) => {
    try {
      // URL의 쿼리 스트링 생성
      const params = new URLSearchParams();
      if (password) params.append("ownerPw", password);
      if (phone) params.append("phoneNum", phone);

      const url = `/api/owner/info?${params.toString()}`;
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        },
      );
      console.log(response);
      handleModalOpen(response.data.code, "patchOwner", openModal);
      // 정보 수정 성공여부
      setUpdateSuccess(true);
      return response.data;
    } catch (error) {
      console.error(error);
      openModal({ message: modalMessages.phoneAuth.default });
    }
  };

  // 수정 데이터 전송
  const onSubmit = async data => {
    if (data.password && !data.confirmPassword) {
      openModal({ message: "비밀번호 확인은 필수입니다." });
      return;
    }
    if (data.password !== data.confirmPassword) {
      openModal({ message: "비밀번호가 서로 일치하지 않습니다." });
      return;
    }

    if (hasChanges()) {
      // 전화번호가 변경된 경우에만 인증 여부를 체크
      if (data.phone !== initialValues.phone && !isPhoneVerified) {
        openModal({ message: "핸드폰 인증이 완료되지 않았습니다." });
        return;
      }

      // 로딩 상태 시작
      setLoading(true);

      // 변경 사항이 있고 인증이 완료되었으면 정보 수정 API 호출
      await patchOwnerInfo(data.password, data.phone);

      // 로딩 상태 종료 후 필드 초기화
      setLoading(false);
      setValue("password", "");
      setValue("confirmPassword", "");
    } else {
      openModal({ message: "변경된 내용이 없습니다." });
    }
  };

  // 회원탈퇴 모달
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <WrapStyle>
      {loading && <Loading />}
      <CeoCategories />
      <div className="inner">
        <h3>내 정보 관리</h3>
        <CeoInfoBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                readOnly
                defaultValue={watch("ownerEmail")} // 수정 불가
                {...register("ownerEmail")}
                className="readOnly"
              />
            </div>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                readOnly
                defaultValue={watch("ownerName")} // 수정 불가
                {...register("ownerName")}
                className="readOnly"
              />
            </div>
            <div className="form-group">
              <label>사업자등록번호</label>
              <input
                type="text"
                readOnly
                defaultValue={watch("businessNumber")} // 수정 불가
                {...register("businessNumber")}
                className="readOnly"
              />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>휴대폰</label>
              <div className="input-group">
                <input
                  type="text"
                  value={phone}
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                  {...register("phone")}
                  onChange={e => {
                    handleChangePhone(e);
                  }}
                  disabled={isPhoneVerified}
                  // 인증완료 시 비활성화
                />
                <div className="auth-code-btn">
                  <CeoButton
                    label="인증코드 발송"
                    onClick={e => {
                      handlPhoneClick(e);
                    }}
                  />
                </div>
              </div>
            </div>
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
            {isSmsSent && (
              <div className="form-group">
                <label>인증 코드</label>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="인증코드를 입력해주세요"
                    {...register("phoneAuthCode")}
                  />
                  <div className="auth-code-btn">
                    <CeoButton
                      label="확인"
                      onClick={e => {
                        handlePhoneAuthCodeClick(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
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
            <div className="modify-btn">
              <CeoButton label="수정하기" />
            </div>
          </form>
          <AlertModal
            isOpen={isModalOpen}
            onClose={closeModal}
            message={modalMessage}
          />
        </CeoInfoBox>
        <div className="delete-ceo">
          <button
            className="delete-btn"
            onClick={() => {
              handleOpenDeleteModal();
            }}
          >
            회원탈퇴
          </button>
        </div>
      </div>
      <PasswordCheckModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          handleCloseModal();
        }}
        onSuccess={() => {
          handlePasswordCheckSuccess();
        }}
        apiEndpoint="/api/owner/info"
        getRequestData={password => ({ password: password })}
        isCeo={true}
      />
      <CeoWithdrawModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
        ceoAccessToken={ceoAccessToken}
      />
    </WrapStyle>
  );
};

export default CeoInfo;

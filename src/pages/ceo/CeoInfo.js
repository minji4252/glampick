import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoButton } from "../../components/common/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage, modalMessages } from "./CeoSignup";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/common/DeleteModal";
import axios from "axios";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import useModal from "../../hooks/UseModal";
import PasswordCheckModal from "../../components/common/PasswordCheckModal";
import AlertModal from "../../components/common/AlertModal";
import Loading from "../../components/common/Loading";
import { postCheckSms, postSendSms } from "../../apis/userapi";
import { patchOwnerInfo } from "../../apis/ceoapi";
import { ceoValidationSchema } from "../../components/validation/ceoValidationSchema";
import CeoWithdrawModal from "../../components/ceo/CeoWithdrawModal";

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
      businessNumber: "",
      password: "", // 비밀번호
      confirmPassword: "", // 비밀번호 확인
      phone: "", // 핸드폰 번호
    },
    validationSchema: ceoValidationSchema,
  });

  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);
  // 핸드폰 인증코드 발송 여부 확인
  const [isSmsSent, setIsSmsSent] = useState(false);
  // 비밀번호 확인 입력창 모달
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // 회원탈퇴 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 로딩
  const [loading, setLoading] = useState(false);
  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

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
        const { ownerEmail, ownerName, businessNumber, phone } = response.data;

        setValue("ownerEmail", ownerEmail);
        setValue("ownerName", ownerName);
        setValue("businessNumber", businessNumber);
        setValue("phone", phone);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getOwnerInfo();
  }, [ceoAccessToken, setValue]);

  // 비밀번호 입력 확인 모달
  useEffect(() => {
    setIsPasswordModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
  };

  // 비밀번호 입력 성공 확인 함수
  const handlePasswordCheckSuccess = () => {
    // console.log("비밀번호 확인 성공");
    setIsPasswordModalOpen(false);
  };

  // 전화번호 자동 변경
  const handleChangePhone = e => {
    const phoneNumber = formatPhoneNumber(e.target.value);
    // console.log(phoneNumber);
    setValue("phone", phoneNumber);
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
      const result = await postSendSms({ userPhone: phone });
      console.log(result);
      handleModalOpen(result.data.code, "smsSend", openModal);
      // Sms 발송 성공
      setIsSmsSent(true);
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
      handleModalOpen(result.data.code, "phoneAuth", openModal);
      // setIsSmsSent(false);
    } catch (error) {
      openModal({ message: modalMessages.phoneAuth.default });
    }
  };

  // ceo 정보 수정 api
  const patchOwnerInfo = async (password, phone) => {
    try {
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
      return response.data;
    } catch (error) {
      console.error(error);
      openModal({ message: modalMessages.phoneAuth.default });
    }
  };

  // 수정 데이터 전송
  const onSubmit = data => {
    console.log("수정된 데이터:", data);
    patchOwnerInfo(data.password, data.phone);
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
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                  {...register("phone")}
                  onChange={e => {
                    handleChangePhone(e);
                  }}
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
            {errors.phoneAuthCode && (
              <ErrorMessage>{errors.phoneAuthCode.message}</ErrorMessage>
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

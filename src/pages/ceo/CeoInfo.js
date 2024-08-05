import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import { CeoButton } from "../../components/common/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./CeoSignup";
import { useState } from "react";
import DeleteModal from "../../components/common/DeleteModal";

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

const CeoInfo = () => {
  const defaultValues = {
    email: "ceo@test.com", // 기본 이메일 (수정 불가)
    name: "홍길동", // 기본 이름 (수정 불가)
    businessRegistrationNumber: "",
    password: "", // 비밀번호
    confirmPassword: "", // 비밀번호 확인
    phone: "", // 핸드폰 번호
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  // 회원탈퇴 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  // 폼 제출 처리
  const onSubmit = data => {
    console.log("수정된 데이터:", data);
    // 서버에 데이터 전송 또는 상태 업데이트 처리
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
      <CeoCategories />
      <div className="inner">
        <h3>CeoInfo</h3>
        <CeoInfoBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                readOnly
                defaultValue={defaultValues.email} // 수정 불가
                {...register("email")}
                className="readOnly"
              />
            </div>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                readOnly
                defaultValue={defaultValues.name} // 수정 불가
                {...register("name")}
                className="readOnly"
              />
            </div>
            <div className="form-group">
              <label>사업자등록번호</label>
              <input
                type="text"
                readOnly
                defaultValue={defaultValues.businessRegistrationNumber} // 수정 불가
                {...register("businessRegistrationNumber")}
                className="readOnly"
              />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  validate: value => {
                    // 비밀번호가 비어 있거나 유효하지 않으면 오류 메시지 반환
                    if (
                      value &&
                      (value.length < 8 ||
                        !/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
                          value,
                        ))
                    ) {
                      return "비밀번호는 최소 8자 이상이어야 하며, 영어, 숫자, 특수문자를 포함해야 합니다.";
                    }
                    return true;
                  },
                })}
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
                {...register("confirmPassword", {
                  validate: value => {
                    if (value && value !== watch("password")) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                    return true;
                  },
                })}
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
                  {...register("phone", {
                    validate: value => {
                      // 핸드폰 번호가 비어 있거나 유효하지 않으면 오류 메시지 반환
                      if (
                        value &&
                        !/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/.test(value)
                      ) {
                        return "유효한 전화번호를 입력하세요.";
                      }
                      return true;
                    },
                  })}
                  onChange={e => {
                    handleChangePhone(e);
                  }}
                />
                <div className="auth-code-btn">
                  <CeoButton label="인증코드 발송" />
                </div>
              </div>
            </div>
            <div className="modify-btn">
              <CeoButton label="수정하기" />
            </div>
          </form>
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
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          handleCloseDeleteModal();
        }}
      />
    </WrapStyle>
  );
};

export default CeoInfo;

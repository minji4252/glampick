import React from "react";
import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import { MainButton } from "../../components/common/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage, SignupWrapStyle } from "../ceo/CeoSignup";
import { TermsGroupStyle } from "../../styles/signupstyle";

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

// 폼의 초기값
const initState = {
  name: "",
  nickName: "",
  phone: "",
};

const SnsSignUpPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initState });

  const handlPhoneClick = () => {
    // 휴대폰 발송 로직
  };

  const handlePhoneAuthCodeClick = () => {
    // 휴대폰 인증코드 확인 로직
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

  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
  };

  return (
    <WrapStyle>
      <div className="container">
        <h2>회원가입</h2>
        <SignupWrapStyle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                  placeholder="이름을 입력해주세요"
                  {...register("name", {
                    required: "이름은 필수 항목입니다.",
                    minLength: {
                      value: 1,
                      message: "이름은 최소 1자 이상이어야 합니다.",
                    },
                    maxLength: {
                      value: 10,
                      message: "이름은 최대 10자까지 가능합니다.",
                    },
                    pattern: {
                      value: /^[가-힣]+$/,
                      message: "이름은 한글만 가능합니다.",
                    },
                })}
              />
            </div>
            {errors.name && 
              <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <div className="form-group">
              <label>닉네임</label>
              <input
                type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickName", {
                    required: "닉네임은 필수 항목입니다.",
                    minLength: {
                      value: 2,
                      message: "닉네임은 최소 2자 이상이어야 합니다.",
                    },
                    maxLength: {
                      value: 10,
                      message: "닉네임은 최대 10자까지 가능합니다.",
                    },
                    pattern: {
                      value: /^[a-zA-Z가-힣][a-zA-Z0-9가-힣]+$/,
                      message: "닉네임은 한글, 숫자, 대소문자만 가능합니다.",
                    },
                })}
              />
            </div>
            {errors.nickName && 
              <ErrorMessage>{errors.nickName.message}</ErrorMessage>}
            <div className="form-group">
              <label>휴대폰</label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="휴대폰번호를 정확히 입력해주세요"
                  {...register("phone", {
                    required: "휴대폰은 필수 항목입니다.",
                    pattern: {
                      value: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                      message: "유효한 전화번호를 입력하세요.",
                    },
                  })}
                  onChange={e => {
                    handleChangePhone(e);
                  }}
                />
                <div className="form-button">
                  <MainButton label="인증코드 발송" />
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
                    {...register("phoneAuthCode", {
                      required: "인증코드는 필수 항목입니다.",
                      pattern: {
                        value: /^[0-9]{5,6}$/, // 5자리 또는 6자리 숫자 허용
                        message: "인증코드가 형식에 맞지 않습니다.",
                      },
                    })}
                  />
                  <div className="form-button">
                    <MainButton label="확인" />
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
                  <MainButton label="회원가입" />
                </div>
              </form>
            </SignupWrapStyle>
          </div>
        
    </WrapStyle>
  );
};

export default SnsSignUpPage;

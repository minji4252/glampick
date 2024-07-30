import styled from "@emotion/styled";
import { MainButton } from "../../components/common/Button";
import { colorSystem, size } from "../../styles/color";
import { useForm } from "react-hook-form";

const CeoSignUpStyle = styled.div`
  position: relative;

  .container {
    display: flex;
    width: 760px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    /* 임시로 지정 */
    height: 1000px;
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

const SignupWrapStyle = styled.div`
  width: 100%;
  margin: 0 auto;

  form {
    width: 80%;
    margin: 0 auto;
  }

  .form-group {
    width: 100%;

    label {
      display: block;
      font-size: 1.1rem;
      margin-top: 20px;
      margin-bottom: 7px;
    }

    input {
      width: calc(100% - 150px - 10px);
      height: 40px;
      border: none;
      background-color: ${colorSystem.g100};
      padding: 10px;
      margin-bottom: 10px;
      font-size: 0.9rem;
      border-radius: 10px;
    }
  }

  .input-group {
    display: flex;
    justify-content: space-between;

    input {
      width: calc(100% - 150px - 10px);
      height: 40px;
      border: none;
      background-color: ${colorSystem.g100};
      padding: 10px;
      margin-bottom: 10px;
      font-size: 0.9rem;
      border-radius: 10px;
    }

    .form-button > button {
      width: 140px;
      height: 40px;
      font-size: 0.95rem;
    }
  }

  // 회원가입 버튼
  .ceosignup-button > button {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    margin-bottom: 100px;
    font-size: 1.2rem;
    ${size.mid} {
      font-size: 1.1rem;
      margin-bottom: 80px;
    }
  }
`;

// 에러메세지
const ErrorMessage = styled.span`
  display: block;
  color: ${colorSystem.error};
  font-size: 0.9rem;
`;

// 폼의 초기값
const initState = {
  ceoemail: "ceo@test.com",
  password: "asdf@1234",
  name: "사장님",
  businessRegistrationNumber: "",
  phone: "",
};

const CeoSignup = () => {
  // form 의 상태를 관리하는 기능
  // register : 각 항목의 데이터를 등록한다.
  // handleSubmit : 전송 이벤트 처리
  // formState : 폼의 데이터
  // setValue :  강제로 값을 셋팅 처리
  // formState : {errors}  폼에 형식에 맞지 않으면 에러출력
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initState });

  const handlEmailClick = () => {
    // 이메일 발송 로직
  };

  const handleEmailAuthCodeClick = () => {
    // 이메일 인증코드 확인 로직
  };

  const handleBusinessRegistrationNumberClick = () => {
    // 사업자등록번호 확인 로직
  };

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
    <CeoSignUpStyle>
      <div className="container">
        <h2>회원가입</h2>
        <SignupWrapStyle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>이메일</label>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="glampickceo@good.kr"
                  {...register("ceoemail", {
                    required: "이메일은 필수 항목입니다",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "메일 형식이 올바르지 않습니다.",
                    },
                  })}
                />
                <div className="form-button">
                  <MainButton label="인증코드 발송" />
                </div>
              </div>
            </div>
            {errors.ceoemail && (
              <ErrorMessage>{errors.ceoemail.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>인증 코드</label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  {...register("emailAuthCode", {
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
            {errors.emailAuthCode && (
              <ErrorMessage>{errors.emailAuthCode.message}</ErrorMessage>
            )}
            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  required: "비밀번호는 필수 항목입니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.",
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
                  required: "비밀번호 확인은 필수 항목입니다.",
                  validate: value =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
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
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <div className="form-group">
              <label>사업자등록번호</label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="사업자등록번호를 입력해주세요"
                  {...register("businessRegistrationNumber", {
                    required: "사업자등록번호는 필수 항목입니다.",
                    pattern: {
                      value: /^\d{3}-\d{2}-\d{5}$/,
                      message: "사업자등록번호가 형식에 맞지 않습니다.",
                    },
                  })}
                />
                <div className="form-button">
                  <MainButton label="확인" />
                </div>
              </div>
            </div>
            {errors.businessRegistrationNumber && (
              <ErrorMessage>
                {errors.businessRegistrationNumber.message}
              </ErrorMessage>
            )}
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
            <div className="ceosignup-button">
              <MainButton label="회원가입" />
            </div>
          </form>
        </SignupWrapStyle>
      </div>
    </CeoSignUpStyle>
  );
};

export default CeoSignup;

import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(1, "이름은 최소 1자 이상이어야 합니다.")
    .max(10, "이름은 최대 10자까지 가능합니다.")
    .matches(/^[가-힣]+$/, "이름은 한글만 가능합니다.")
    .required("이름은 필수 항목입니다."),
  userNickname: yup
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다.")
    .matches(
      /^[a-zA-Z가-힣][a-zA-Z0-9가-힣]+$/,
      "닉네임은 대소문자, 한글, 숫자만 가능합니다.",
    )
    .required("닉네임은 필수 항목입니다."),
  userPhone: yup
    .string()
    .matches(
      /^[0-9]{3}-?[0-9]{3,4}-?[0-9]{4}$/,
      "유효한 전화번호를 입력하세요.",
    )
    .required("휴대폰은 필수 항목입니다."),
  phoneAuthCode: yup
    .string()
    .matches(/^[0-9]{5,6}$/, "인증코드가 형식에 맞지 않습니다."),
  // .required("인증코드는 필수 항목입니다."),
});

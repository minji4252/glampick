import * as yup from "yup";

export const ceoInfoValidationSchema = yup.object().shape({
  password: yup.string().when("$isPasswordChanged", {
    is: true,
    then: yup
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.",
      ),
  }),
  confirmPassword: yup.string().when("$isPasswordChanged", {
    is: true,
    then: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  }),
  phone: yup.string().when("$isPhoneChanged", {
    is: true,
    then: yup
      .string()
      .matches(
        /^[0-9]{3}-?[0-9]{3,4}-?[0-9]{4}$/,
        "유효한 전화번호를 입력하세요.",
      ),
  }),
  phoneAuthCode: yup
    .string()
    .matches(/^[0-9]{5,6}$/, "인증코드가 형식에 맞지 않습니다."),
});

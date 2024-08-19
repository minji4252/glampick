import * as yup from "yup";

export const ceoInfoValidationSchema = yup.object().shape({
  password: yup
    .string()
    .nullable() // 비밀번호 필드 선택적 입력
    .notRequired()
    .test(
      "password-check",
      "비밀번호는 최소 8자 이상이어야 하며 영어, 숫자, 특수문자를 포함해야 합니다.",
      function (value) {
        if (value && value.length > 0) {
          return (
            value.length >= 8 &&
            /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)
          );
        }
        return true;
      },
    ),
  // .required("비밀번호는 필수 항목입니다."),
  confirmPassword: yup
    .string()
    .nullable()
    .notRequired()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  // .required("비밀번호 확인은 필수 항목입니다."),
  phone: yup
    .string()
    .matches(
      /^[0-9]{3}-?[0-9]{3,4}-?[0-9]{4}$/,
      "유효한 전화번호를 입력하세요.",
    ),
  // .required("휴대폰은 필수 항목입니다."),
  phoneAuthCode: yup
    .string()
    .matches(/^[0-9]{5,6}$/, "인증코드가 형식에 맞지 않습니다."),
  // .required("인증코드는 필수 항목입니다."),
});

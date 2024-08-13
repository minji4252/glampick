import * as yup from "yup";

export const ceoValidationSchema = yup.object().shape({
  ceoEmail: yup
    .string()
    .email("메일 형식이 올바르지 않습니다.")
    .required("이메일은 필수 항목입니다."),
  emailAuthCode: yup
    .string()
    .matches(/^[0-9]{5,6}$/, "인증코드가 형식에 맞지 않습니다.")
    .required("인증코드는 필수 항목입니다."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.",
    )
    .required("비밀번호는 필수 항목입니다."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수 항목입니다."),
  name: yup
    .string()
    .min(1, "이름은 최소 1자 이상이어야 합니다.")
    .max(10, "이름은 최대 10자까지 가능합니다.")
    .matches(/^[가-힣]+$/, "이름은 한글만 가능합니다.")
    .required("이름은 필수 항목입니다."),
  businessNumber: yup
    .string()
    .matches(/^\d{3}-?\d{2}-?\d{5}$/, "사업자등록번호가 형식에 맞지 않습니다.")
    .required("사업자등록번호는 필수 항목입니다."),
  businessRegistrationImg: yup
    .mixed()
    .required("사업자등록증 첨부는 필수 항목입니다."),
  phone: yup
    .string()
    .matches(
      /^[0-9]{3}-?[0-9]{3,4}-?[0-9]{4}$/,
      "유효한 전화번호를 입력하세요.",
    )
    .required("휴대폰은 필수 항목입니다."),
  phoneAuthCode: yup
    .string()
    .matches(/^[0-9]{5,6}$/, "인증코드가 형식에 맞지 않습니다.")
    .required("인증코드는 필수 항목입니다."),
});

import axios from "axios";

// 관리자 로그인 api 호출
export const postAdminSignin = async ({ adminId, adminPw }) => {
  try {
    const response = await axios.post(
      "http://192.168.0.208:8080/api/auth/admin/sign-in",
      {
        adminId: adminId,
        adminPw: adminPw,
      },
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

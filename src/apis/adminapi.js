import axios from "axios";

// 관리자 로그인 api 호출
export const postAdminSignin = async ({ adminId, adminPw }) => {
  try {
    const response = await axios.post(`/api/auth/admin/sign-in`, {
      adminId: adminId,
      adminPw: adminPw,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 승인 대기 중인 글램핑장 리스트
export const getAdminStoreList = async accessToken => {
  try {
    const response = await axios.get(`/api/admin/glamping-list/owner`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = response;
    if (data.code === "SU") {
      return data.list;
    } else {
      throw Error(data.message);
    }
  } catch (error) {
    console.error("에러: ", error);
    throw error;
  }
};

// 승인 대기 중인 사장님 회원가입 리스트
export const getAdminSignupList = async accessToken => {
  try {
    const response = await axios.get(`/api/admin/business/owner-list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = response;
    if (data.code === "SU") {
      return data.list;
    } else {
      throw Error(data.message);
    }
  } catch (error) {
    console.error("에러: ", error);
    throw error;
  }
};

// 대기 중인 사장님 탈퇴 리스트
export const getAdminExitList = async accessToken => {
  try {
    const response = await axios.get(`/api/admin/get-delete-list/owner`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = response;
    if (data.code === "SU") {
      return data.list;
    } else {
      throw Error(data.message);
    }
  } catch (error) {
    console.error("에러: ", error);
    throw error;
  }
};

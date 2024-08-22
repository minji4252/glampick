/* eslint-disable no-undef */
import axios from "axios";

// *** GlampingDetail.js 함수 ****

// 1. 글램핑디테일페이지 정보 불러오기
export const fetchGlampingData = async (
  glampId,
  startDate,
  endDate,
  accessToken,
) => {
  try {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};
    const response = await axios.get(
      `${process.env.PUBLIC_URL}/api/glamping/info?glampId=${glampId}&inDate=${startDate}&outDate=${endDate}`,
      { headers },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 2. 관심 글램핑장 하트 버튼
export const toggleLikeGlamping = async (glampId, accessToken) => {
  try {
    const res = await axios.get(
      `${process.env.PUBLIC_URL}/api/glamping/favorite?glampId=${glampId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data.resultValue;
  } catch (error) {
    console.error("Error toggling like status:", error);
    throw error;
  }
};

// *** RoomDetail.js 함수 ****

// 1. 방 이름 & 사진 정보 불러오기
export const fetchRoomImages = async glampId => {
  try {
    const response = await axios.get(
      `/api/glamping/info/moreRoomImages?glampId=${glampId}`,
    );
    if (response.data.code === "SU") {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

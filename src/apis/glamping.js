import axios from "axios";

// *** GlampingDetail.js 함수 ****

// 1. 글램핑디테일페이지 정보 불러오기
export const fetchGlampingData = async (
  glampId,
  startDate,
  endDate,
  statusId,
) => {
  try {
    const response = await axios.get(
      `api/glamping/info?glampId=${glampId}&inDate=${startDate}&outDate=${endDate}&status=${statusId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 2. 관심 글램핑장 하트 버튼
export const toggleLikeGlamping = async () => {
  try {
    const res = await axios.get(`/api/glamping/favorite`);
    return res.data.resultValue;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 3. 모두보기 클릭시 객실 정보 더 불러오기
export const fetchMoreRooms = async (glampId, startDate, endDate, statusId) => {
  try {
    const response = await axios.get(
      `api/glamping/info/moreRooms?glampId=${glampId}&inDate=${startDate}&outDate=${endDate}&status=${statusId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
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

import axios, { AxiosResponse } from "axios";

// 예약 수 데이터
export const getBookingData = async (
  token: string,
  startDayId: string,
  endDayId: string,
): Promise<any> => {
  try {
    const url = `/api/owner/poproom?startDayId=${startDayId}&endDayId=${endDayId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 매출 데이터
export const getRevenueData = async (
  token: string,
  startDayId: string,
  endDayId: string,
): Promise<any> => {
  try {
    const url = `/api/owner/revenue?startDayId=${startDayId}&endDayId=${endDayId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 취소율 데이터
export const getCancelData = async (
  token: string,
  startDayId: string,
  endDayId: string,
): Promise<any> => {
  try {
    const url = `/api/owner/glampingcancel?startDayId=${startDayId}&endDayId=${endDayId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

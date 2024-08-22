import axios from "axios";

// 인기
export const getPopularData = async () => {
  try {
    const response = await axios.get("/api/main");
    return response.data.popular;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 반려동물
export const getPetData = async () => {
  try {
    const response = await axios.get("/api/main");
    return response.data.petFriendly;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 산속
export const getMountainData = async () => {
  try {
    const response = await axios.get("/api/main");
    return response.data.mountainView;
  } catch (error) {
    console.error(error);
    return [];
  }
};

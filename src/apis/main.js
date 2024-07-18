import axios from "axios";

// 인기
export const getPopularData = async () => {
  try {
    const response = await axios.get("/api/main");
    return response.data.popular;
    // console.log("인기 top3");
    // console.log(popularArray);
    // setPopularData(popularArray);
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
    // console.log("반려동물 top3");
    // console.log(petArray);
    //   setPetData(petArray);
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

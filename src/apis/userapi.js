import axios from "axios";

export const postUserEmail = async data => {
  try {
    const reqData = "/api/auth/mail-send";
    const response = await axios.post(reqData, data);
    if (response.data.code === "SU") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log("error");
  }
};

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import useFetchAccessToken from "../utils/UserAccessToken";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const accessToken = useFetchAccessToken();
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userNickname: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (!accessToken) return;
        const response = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo({
          userEmail: response.data.userEmail,
          userNickname: response.data.userNickname,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

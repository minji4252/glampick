import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import useFetchAccessToken from "../utils/UserAccessToken";

interface UserInfo {
  userEmail: string;
  userNickname: string;
}

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const defaultUserContextValue: UserContextType = {
  userInfo: {
    userEmail: "",
    userNickname: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserInfo: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContextValue);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const accessToken = useFetchAccessToken();
  const [userInfo, setUserInfo] = useState<UserInfo>({
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

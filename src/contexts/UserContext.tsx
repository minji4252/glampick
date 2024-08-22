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
  getUser: () => Promise<void>; // 필수로 설정
}

const defaultUserContextValue: UserContextType = {
  userInfo: {
    userEmail: "",
    userNickname: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserInfo: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUser: async () => {}, // 빈 함수로 기본값 제공
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

  const getUser = async () => {
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

  useEffect(() => {
    if (accessToken) {
      getUser(); // 페이지 로딩 시 사용자 정보를 가져옵니다.
    }
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

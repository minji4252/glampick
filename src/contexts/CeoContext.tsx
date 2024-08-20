import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import useFetchCeoAccessToken from "../utils/CeoAccessToken";

interface CeoInfo {
  ownerEmail: string;
  ownerName: string;
}

interface CeoContextType {
  ceoInfo: CeoInfo;
  setCeoInfo: React.Dispatch<React.SetStateAction<CeoInfo>>;
}

const defaultCeoContextValue: CeoContextType = {
  ceoInfo: {
    ownerEmail: "",
    ownerName: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCeoInfo: () => {},
};

const CeoContext = createContext<CeoContextType>(defaultCeoContextValue);

export const useCeo = () => useContext(CeoContext);

export const CeoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const ceoAccessToken = useFetchCeoAccessToken();
  const [ceoInfo, setCeoInfo] = useState<CeoInfo>({
    ownerEmail: "",
    ownerName: "",
  });

  useEffect(() => {
    const getOwnerInfo = async () => {
      try {
        if (!ceoAccessToken) return;
        const response = await axios.get(`/api/owner/info`, {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        });
        setCeoInfo({
          ownerEmail: response.data.ownerEmail,
          ownerName: response.data.ownerName,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getOwnerInfo();
  }, [ceoAccessToken]);

  return (
    <CeoContext.Provider value={{ ceoInfo, setCeoInfo }}>
      {children}
    </CeoContext.Provider>
  );
};

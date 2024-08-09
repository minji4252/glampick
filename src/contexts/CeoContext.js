import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import useFetchCeoAccessToken from "../utils/CeoAccessToken";

const CeoContext = createContext();

export const useCeo = () => useContext(CeoContext);

export const CeoProvider = ({ children }) => {
  const ceoAccessToken = useFetchCeoAccessToken();
  const [ceoInfo, setCeoInfo] = useState({
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

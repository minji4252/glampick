import React, { useEffect, useState } from "react";
import { colorSystem } from "../../styles/color";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { adminAccessTokenState } from "../../atoms/loginState";
import axios from "axios";

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colorSystem.white};
  z-index: 99999;
  max-width: 500px;
  width: 100%;
  max-height: 600px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 20px;
`;

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0);
  font-size: 25px;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
`;

const AdminStoreModal = ({ isOpen, onClose, glampId }) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );

  const [glampInfo, setGlampInfo] = useState({
    glampName: "",
    ownerName: "",
    ownerPhone: "",
    businessNumber: "",
  });

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAdminAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAdminAccessToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminAccessToken();
  }, [setAdminAccessToken]);

  // 글램핑장 상세 정보
  useEffect(() => {
    if (!isOpen) return;

    const fetchGlampInfo = async () => {
      try {
        const response = await axios.get(
          `/api/admin/glamping/owner?glampId=${glampId}`,
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        // setOwnerInfo({
        //   ownerName: response.data.ownerName,
        //   ownerPhone: response.data.ownerPhone,
        //   businessNumber: response.data.businessNumber,
        //   businessPaperImage: response.data.businessPaperImage,
        // });
      } catch (error) {
        console.log("에러:", error);
      }
    };

    fetchGlampInfo();
  }, [isOpen, glampId, adminAccessToken]);

  // if (!isOpen || !store) return null;
  if (!isOpen) return null;

  return (
    <ModalStyle>
      <CloseButton onClick={onClose}>×</CloseButton>
      <div className="modal-header">{glampInfo.glampName}</div>
      <div className="modal-body">
        <p>
          <strong>사장님 이름:</strong> {glampInfo.ownerName}
        </p>
        <p>
          <strong>사업자등록번호:</strong> {glampInfo.businessNumber}
        </p>
        <p>
          <strong>지역:</strong> {glampInfo.region}
        </p>
        {/* 정보 추가 */}
      </div>
    </ModalStyle>
  );
};

export default AdminStoreModal;

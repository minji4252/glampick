import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import { useRecoilState } from "recoil";
import { adminAccessTokenState } from "../../atoms/loginState";
import axios from "axios";
import { AdminButton, DeleteButton } from "../common/Button";

const SignupModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SignupContent = styled.div`
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: calc(100% - 60%);
  height: calc(100% - 150px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    background: ${colorSystem.g200};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colorSystem.admin3};
    border-radius: 10px;
  }

  .signup-m-inner {
    .m-inner-title {
      display: flex;
      justify-content: center;
      margin: 5px 0 30px 0;
      h2 {
        font-size: 21px;
        font-weight: 600;
        color: ${colorSystem.admin};
        padding: 0 10px 5px 10px;
        border-bottom: 2px solid ${colorSystem.admin};
      }
    }
    .m-inner-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      font-size: 15px;
      h4 {
        font-size: 17px;
        font-weight: 500;
        margin-right: 10px;
      }
      .m-inner-inner {
        display: flex;
        flex-direction: row;
      }

      .signup-btn {
        display: flex;
        justify-content: center;
        margin-top: 60px;
      }
      button {
        width: 140px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
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

const AdminSignupModal = ({ isOpen, onClose, ownerId }) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );
  const [ownerInfo, setOwnerInfo] = useState({
    ownerName: "",
    ownerPhone: "",
    businessNumber: "",
    businessPaperImage: null,
  });

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAdminAccessToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAdminAccessToken(token);
          console.log("accessToken 있음");
        } else {
          console.log("accessToken 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminAccessToken();
  }, [setAdminAccessToken]);

  // 사장님 상세 정보
  useEffect(() => {
    if (!isOpen) return;

    const fetchOwnerInfo = async () => {
      try {
        const response = await axios.get(
          `/api/admin/business/owner?ownerId=${ownerId}`,
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        setOwnerInfo({
          ownerName: response.data.ownerName,
          ownerPhone: response.data.ownerPhone,
          businessNumber: response.data.businessNumber,
          businessPaperImage: response.data.businessPaperImage,
        });
      } catch (error) {
        console.log("Error fetching owner info:", error);
      }
    };

    fetchOwnerInfo();
  }, [isOpen, ownerId, adminAccessToken]);

  // 가입 승인
  const yesSignup = async () => {
    try {
      await axios.patch(
        `/api/admin/access/owner/sign-up?ownerId=${ownerId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      alert("가입 승인되었습니다.");
      onClose();
    } catch (error) {
      console.log("가입 승인 중 오류: ", error);
      alert("가입 승인 중 오류 발생");
    }
  };

  if (!isOpen) return null;

  return (
    <SignupModalStyle onClick={onClose}>
      <SignupContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <div className="signup-m-inner">
          <div className="m-inner-title">
            <h2>회원 가입 상세 정보</h2>
          </div>
          <div className="m-inner-content">
            <div className="m-inner-inner">
              <h4>사장님 이름: </h4>
              {ownerInfo.ownerName}
            </div>
            <div className="m-inner-inner">
              <h4>휴대폰 번호: </h4>
              {ownerInfo.ownerPhone}
            </div>
            <div className="m-inner-inner">
              <h4>사업자등록번호: </h4>
              {ownerInfo.businessNumber}
            </div>
            <div>
              <h4>사업자등록증: </h4>
              {ownerInfo.businessPaperImage && (
                <img
                  src={ownerInfo.businessPaperImage}
                  alt="사업자등록증"
                  style={{ width: "100%", borderRadius: "5px" }}
                />
              )}
            </div>
            <div className="signup-btn">
              <AdminButton
                label="가입 승인하기"
                onClick={yesSignup}
                className="signup-btn"
              ></AdminButton>
              <DeleteButton
                label="가입 거절하기"
                // onClick={noSignup}
                className="signup-btn"
              ></DeleteButton>
            </div>
          </div>
        </div>
      </SignupContent>
    </SignupModalStyle>
  );
};

export default AdminSignupModal;

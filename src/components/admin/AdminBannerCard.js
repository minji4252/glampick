import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { colorSystem } from "../../styles/color";
import { AdminButton } from "../common/Button";
import axios from "axios";
import { adminAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import { SERVER_URL } from "../../apis/config";

const AdminBannerCardStyle = styled.div`
  width: 100%;
  /* height: 300px; */
  display: flex;
  align-items: center;
  line-height: 1.4;
  border-radius: 20px;
  border: 1px solid ${colorSystem.admin};
  padding: 20px 30px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);

  .banner-card {
    .banner-num {
      margin-top: 15px;
      font-size: 17px;
      font-weight: 500;
      color: ${colorSystem.admin};
    }
    .banner-img {
      padding: 20px 0;
      width: 500px;
    }
  }
`;

const AdminBannerCard = ({ bannerId, createdAt, bannerUrl, onDelete }) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState(
    adminAccessTokenState,
  );

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

  // 배너 삭제하기
  const handleDelete = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/admin/banner/${bannerId}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      if (onDelete) onDelete(bannerId);
    } catch (error) {
      console.error("배너 삭제 오류: ", error);
    }
  };

  return (
    <AdminBannerCardStyle key={bannerId}>
      <div className="banner-card">
        <div className="banner-card-content">
          <AdminButton label="삭제하기" onClick={handleDelete} />
          <div className="banner-num">배너 {bannerId}</div>
          <div className="banner-date">등록일: {createdAt}</div>
        </div>
        <div>
          <img
            src={bannerUrl}
            alt={`배너 ${bannerId}`}
            className="banner-img"
          />
        </div>
      </div>
    </AdminBannerCardStyle>
  );
};

export default AdminBannerCard;

import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { colorSystem } from "../../styles/color";
import { AdminButton, DeleteButton } from "../common/Button";
import axios from "axios";
import { adminAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";

const AdminBannerCardStyle = styled.div`
  width: 1000px;
  /* height: 300px; */
  display: flex;
  align-items: center;
  line-height: 1.4;
  border-radius: 20px;
  border: 2px solid ${colorSystem.admin3};
  padding: 20px 20px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);

  .banner-card {
    .banner-card-content {
      margin-left: 15px;
    }
    .banner-num {
      margin-top: 15px;
      font-size: 17px;
      font-weight: 500;
      color: ${colorSystem.admin};
    }
    .banner-img {
      margin-top: 10px;
      width: 950px;
      height: 200px;
      object-fit: cover;
      border-radius: 32px;
    }
  }
`;

interface AdminBannerCardProps {
  bannerId: string;
  createdAt: string;
  bannerUrl: string;
  onDelete?: (bannerId: string) => void;
}

const AdminBannerCard: React.FC<AdminBannerCardProps> = ({
  bannerId,
  createdAt,
  bannerUrl,
  onDelete,
}) => {
  const [adminAccessToken, setAdminAccessToken] = useRecoilState<string | null>(
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
      await axios.delete(`/api/admin/banner?bannerId=${bannerId}`, {
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
          <DeleteButton label="삭제하기" onClick={handleDelete} />
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

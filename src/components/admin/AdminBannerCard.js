import styled from "@emotion/styled";
import React from "react";
import { colorSystem } from "../../styles/color";

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
const AdminBannerCard = ({ bannerId, createdAt, bannerUrl }) => {
  return (
    <AdminBannerCardStyle key={bannerId}>
      <div className="banner-card">
        <div className="banner-card-content">
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

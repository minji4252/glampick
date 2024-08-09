import styled from "@emotion/styled";
import React from "react";
import { colorSystem } from "../../styles/color";

const AdminStoreCardStyle = styled.div`
  width: 450px;
  height: 170px;
  display: flex;
  align-items: center;
  line-height: 1.4;
  border-radius: 20px;
  border: 1px solid ${colorSystem.admin};
  padding-left: 35px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  .store-card {
    .store-name {
      color: ${colorSystem.admin};
      font-size: 20px;
      font-weight: 700;
    }
    .store-region {
      font-size: 18px;
      color: ${colorSystem.g600};
    }
    .store-owner {
      margin-top: 10px;
      font-size: 17px;
    }
  }
`;
const AdminStoreCard = ({
  ownerId,
  glampId,
  ownerName,
  businessNumber,
  glampName,
  region,
  onClick,
}) => {
  return (
    <AdminStoreCardStyle onClick={() => onClick(glampId)}>
      <div className="store-card">
        <div className="store-name">{glampName}</div>
        <div className="store-region">{region}</div>
        <div className="store-owner">
          <p>사장님 이름: {ownerName}</p>
          <p>사업자등록번호: {businessNumber}</p>
        </div>
      </div>
    </AdminStoreCardStyle>
  );
};

export default AdminStoreCard;

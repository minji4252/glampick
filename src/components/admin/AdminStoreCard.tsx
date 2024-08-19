import styled from "@emotion/styled";
import React, { useState } from "react";
import { colorSystem } from "../../styles/color";
import { AdminButton } from "../common/Button";
import AdminSignupModal from "./AdminSignupModal";
import AdminStoreModal from "./AdminStoreModal";

const AdminStoreCardStyle = styled.div`
  width: 450px;
  height: 170px;
  display: flex;
  align-items: center;
  line-height: 1.4;
  border-radius: 20px;
  border: 2px solid ${colorSystem.admin3};
  padding: 0 35px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);

  .store-card {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    .store-name {
      color: ${colorSystem.admin};
      font-size: 20px;
      font-weight: 700;
    }
    .store-region {
      font-size: 16px;
      color: ${colorSystem.g600};
    }
    .store-owner {
      margin-top: 10px;
      font-size: 16px;
    }
    .store-right {
      button {
        width: 100px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
`;

interface AdminStoreCardProps {
  ownerId: string;
  glampId: number;
  ownerName: string;
  businessNumber: string;
  glampName: string;
  region: string;
  onApproval: (glampId: number) => void;
}

const AdminStoreCard: React.FC<AdminStoreCardProps> = ({
  ownerId,
  glampId,
  ownerName,
  businessNumber,
  glampName,
  region,
  onApproval,
}) => {
  // 모달 열 닫
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminStoreCardStyle>
        <div className="store-card">
          <div className="store-left">
            <div className="store-name">{glampName}</div>
            <div className="store-region">{region}</div>
            <div className="store-owner">
              <p>사장님 이름: {ownerName}</p>
              <p>사업자등록번호: {businessNumber}</p>
            </div>
          </div>
          <div className="store-right">
            <AdminButton label="상세보기" onClick={handleOpenModal} />
          </div>
        </div>
      </AdminStoreCardStyle>
      <AdminStoreModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        glampId={glampId}
        onApproval={onApproval}
      />
    </>
  );
};

export default AdminStoreCard;

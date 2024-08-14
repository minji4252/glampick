import React, { useState } from "react";
import { colorSystem } from "../../styles/color";
import { AdminButton } from "../common/Button";
import styled from "@emotion/styled";
import AdminSignupModal from "./AdminSignupModal";

const AdminSignupCardStyle = styled.div`
  width: 350px;
  height: 150px;
  display: flex;
  align-items: center;
  line-height: 1.4;
  border-radius: 20px;
  border: 2px solid ${colorSystem.admin3};
  padding-left: 35px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);

  .signup-card {
    display: flex;
    gap: 90px;
    .signup-left {
      flex-direction: column;
      gap: 20px;

      h4 {
        font-size: 15px;
        color: ${colorSystem.g500};
      }
      p {
        color: ${colorSystem.admin};
        font-size: 20px;
        font-weight: 700;
      }
    }
    .signup-right {
      button {
        cursor: pointer;
        width: 100px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
`;

interface AdminSignupCardProps {
  ownerId: string;
  ownerName: string;
  onApproval: () => void;
}

const AdminSignupCard: React.FC<AdminSignupCardProps> = ({
  ownerId,
  ownerName,
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
      <AdminSignupCardStyle>
        <div className="signup-card">
          <div className="signup-left">
            <h4>가입 대기 중</h4>
            <p>{ownerName}</p>
          </div>
          <div className="signup-right">
            <AdminButton label="상세보기" onClick={handleOpenModal} />
          </div>
        </div>
      </AdminSignupCardStyle>
      <AdminSignupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ownerId={ownerId}
        onApproval={onApproval}
      />
    </>
  );
};

export default AdminSignupCard;

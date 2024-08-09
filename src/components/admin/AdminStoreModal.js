import React from "react";
import { colorSystem } from "../../styles/color";
import styled from "@emotion/styled";

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

const AdminStoreModal = ({ isOpen, onClose, store }) => {
  if (!isOpen || !store) return null;

  return (
    <ModalStyle>
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          ×
        </span>
        <div className="modal-header">{store.glampName}</div>
        <div className="modal-body">
          <p>
            <strong>사장님 이름:</strong> {store.ownerName}
          </p>
          <p>
            <strong>사업자등록번호:</strong> {store.businessNumber}
          </p>
          <p>
            <strong>지역:</strong> {store.region}
          </p>
          {/* 정보 추가 */}
        </div>
      </div>
    </ModalStyle>
  );
};

export default AdminStoreModal;

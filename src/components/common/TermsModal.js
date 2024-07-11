import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import React from "react";

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
`;

const TermsModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <button className="close-btn" type="button" onClick={onClose}>
        <IoClose />
      </button>
      <ModalContent>
        <p>{message}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TermsModal;

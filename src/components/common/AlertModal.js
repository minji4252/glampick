import React from "react";
import { IoClose } from "react-icons/io5";
import { ModalBtn, ModalLine, ModalStyle } from "../../styles/modalstyle";
import { MainButton } from "./Button";

export const AlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <ModalStyle>
      <button className="close-btn" type="button" onClick={onClose}>
        <IoClose />
      </button>
      <ModalLine />
      <p>{message}</p>
      <ModalBtn>
        <MainButton label="확인" onClick={onClose} />
      </ModalBtn>
    </ModalStyle>
  );
};

export default AlertModal;

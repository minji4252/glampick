import React from "react";
import { IoClose } from "react-icons/io5";
import {
  ModalBtn,
  ModalLine,
  ModalStyle,
  ModalTop,
} from "../../styles/modalstyle";
import { MainButton } from "./Button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  // 모달 줄바꿈
  const formattedMessage = message.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <ModalStyle>
      <ModalTop>
        <h1>알림</h1>
        <button className="close-btn" type="button" onClick={onClose}>
          <IoClose />
        </button>
        <ModalLine />
      </ModalTop>
      <p>{formattedMessage}</p>
      <ModalBtn>
        <MainButton label="확인" onClick={onClose} />
      </ModalBtn>
    </ModalStyle>
  );
};

export default AlertModal;

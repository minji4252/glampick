import React from "react";
import { IoClose } from "react-icons/io5";
import {
  ModalBtn,
  ModalLine,
  ModalStyle,
  ModalTop,
} from "../../styles/modalstyle";
import { ActionButton, MainButton } from "./Button";

interface CheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const CheckModal: React.FC<CheckModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
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
        <MainButton label="예" onClick={onConfirm} />
        <ActionButton label="아니오" onClick={onClose} />
      </ModalBtn>
    </ModalStyle>
  );
};

export default CheckModal;

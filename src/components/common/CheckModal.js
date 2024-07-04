import { IoClose } from "react-icons/io5";
import { ModalBtn, ModalLine, ModalStyle } from "../../styles/modalstyle";
import { ActionButton, MainButton } from "./Button";

const CheckModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <ModalStyle>
        <button className="close-btn" type="button" onClick={onClose}>
          <IoClose />
        </button>
        <ModalLine />
        <p>{message}</p>
        <ModalBtn>
          <MainButton label="예" onClick={onConfirm} />
          <ActionButton label="아니오" onClick={onClose} />
        </ModalBtn>
      </ModalStyle>
    </>
  );
};

export default CheckModal;

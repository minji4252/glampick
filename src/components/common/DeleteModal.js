import styled from "@emotion/styled";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { ActionButton, DelectButton } from "../components/common/Button";
import { colorSystem } from "../styles/color";

const DeleteModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colorSystem.white};
  z-index: 99999;
  max-width: 260px;
  width: 260px;
  max-height: 330px;
  height: 330px;
  border-radius: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  .close-btn {
    background-color: transparent;
    border: 0px;
    position: absolute;
    width: 24px;
    top: 10px;
    right: 15px;
    cursor: pointer;
    max-width: 25px;
  }

  .close-btn svg {
    width: 100%;
    height: 25px;
    color: #777;
  }
`;
const DeleteIcon = styled.div`
  margin-top: 26px;
  width: 52px;
  height: 52px;
  background-color: ${colorSystem.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  svg {
    width: 28px;
    height: 28px;
    color: ${colorSystem.g150};
  }
`;
const DeleteText = styled.div`
  margin-top: 23px;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }

  p {
    margin-top: 26px;
    font-size: 0.85rem;
    line-height: 1.2rem;
  }
`;
const DeleteModalBtn = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 145px;
  }
`;

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <DeleteModalStyle>
      <button className="close-btn" type="button">
        <IoClose />
      </button>
      <DeleteIcon>
        <HiOutlineTrash />
      </DeleteIcon>
      <DeleteText>
        <h2>정말 탈퇴하시겠습니까?</h2>
        <p>
          탈퇴 버튼 선택 시, 계정은 <br /> 삭제되며 복구되지 않습니다.
        </p>
      </DeleteText>
      <DeleteModalBtn>
        <DelectButton label="탈퇴" onClick={onConfirm} />
        <ActionButton label="취소" onClick={onClose} />
      </DeleteModalBtn>
    </DeleteModalStyle>
  );
};

export default DeleteModal;
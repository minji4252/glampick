import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import { colorSystem } from "../../styles/color";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  max-width: 50%;
  height: 70%;
  max-height: 70%;
  overflow-y: auto;
  white-space: pre-line;
  /* 내용이 길 경우 스크롤 */
`;

export const ModalTitle = styled.div`
  font-size: 1.2rem;
  padding: 10px;
  color: ${colorSystem.g900};
  font-weight: 500;
  border-bottom: 1px solid ${colorSystem.g900};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

export const ModalText = styled.div`
  font-size: 0.9rem;
  padding: 10px;
  color: ${colorSystem.g800};
  line-height: 1.6;
`;

export const TermsModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton
          onClick={() => {
            onClose();
          }}
        >
          <IoClose />
        </CloseButton>
        <ModalText>{content}</ModalText>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default TermsModal;

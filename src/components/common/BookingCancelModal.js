import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import { DeleteButton } from "./Button";
import { useEffect } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
  text-align: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: ${colorSystem.g900};
`;

const ModalBody = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${colorSystem.g700};
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &.cancel {
    background: ${colorSystem.g200};
    color: ${colorSystem.g900};
  }

  &.confirm {
    background: ${colorSystem.error};
    color: white;
  }
`;

const BookingCancelModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // 모달이 닫힐 때 body의 overflow 스타일을 원래대로 되돌림
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>예약 취소</ModalHeader>
        <ModalBody>정말로 예약을 취소하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button
            className="cancel"
            onClick={() => {
              onClose();
            }}
          >
            취소
          </Button>
          <Button
            className="confirm"
            onClick={() => {
              onConfirm();
            }}
          >
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default BookingCancelModal;

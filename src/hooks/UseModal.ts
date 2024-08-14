import { useState } from "react";

// 타입 정의
interface ModalOptions {
  message: string;
  onCheck?: () => void;
}

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [checkAction, setCheckAction] = useState<(() => void) | null>(null);

  const openModal = ({ message, onCheck }: ModalOptions) => {
    setModalMessage(message);
    setCheckAction(() => onCheck ?? null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalMessage,
    checkAction,
    openModal,
    closeModal,
  };
};

export default useModal;

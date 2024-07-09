import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [CheckAction, setCheckAction] = useState(null);

  const openModal = ({ message, onCheck }) => {
    setModalMessage(message);
    setCheckAction(() => onCheck);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalMessage,
    CheckAction,
    openModal,
    closeModal,
  };
};

export default useModal;

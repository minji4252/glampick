import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CheckAction, setCheckAction] = useState(null);

  const openModal = ({ onCheck }) => {
    setCheckAction(() => onCheck);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    CheckAction,
    openModal,
    closeModal,
  };
};

export default useModal;

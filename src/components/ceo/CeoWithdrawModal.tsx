import axios from "axios";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ceoRoleState, isCeoLoginState } from "../../atoms/loginState";
import useModal from "../../hooks/UseModal";
import { ActionButton, DeleteButton } from "../common/Button";
import {
  DeleteIcon,
  DeleteModalBtn,
  DeleteModalStyle,
  DeleteText,
} from "../common/DeleteModal";
import { ModalOverlay } from "../common/ReviewImgModal";

interface CeoWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ceoAccessToken: string;
  glampId: number;
}

const CeoWithdrawModal: React.FC<CeoWithdrawModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  ceoAccessToken,
}) => {
  const [isCeoLogin, setIsCeoLogin] = useRecoilState(isCeoLoginState);
  const [ceoRole, setCeoRole] = useRecoilState(ceoRoleState);
  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await axios.patch(
        `/api/owner/withdraw`,
        {},
        {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        },
      );
      console.log(response);
      if (response.data.code === "SU") {
        console.log("회원 탈퇴 처리완료", response);
        onConfirm(); // 부모 컴포넌트에서 모달 닫기 처리를 하도록 호출
        localStorage.removeItem("ceoAccessToken");
        localStorage.removeItem("ceoRole");
        setIsCeoLogin(false);
        setCeoRole(null);
        navigate("/");
      } else if (response.data.code === "CD") {
        openModal({
          message: "현재 예약된 내역이 존재하므로 \n 탈퇴가 불가합니다. ",
          onCheck: "",
        });
      } else {
        openModal({
          message: "탈퇴처리 실패 \n 자세한 사항은 관리자에게 문의주세요",
          onCheck: "",
        });
      }
    } catch (error) {
      console.error("회원 탈퇴 오류", error);
    }
  };

  return (
    <ModalOverlay>
      <DeleteModalStyle>
        <button className="close-btn" type="button" onClick={onClose}>
          <IoClose />
        </button>
        <DeleteIcon>
          <HiOutlineTrash />
        </DeleteIcon>
        <DeleteText>
          <h2>정말 탈퇴하시겠습니까?</h2>
          <p>
            최종 탈퇴는 관리자 확인 후 처리되며
            <br /> 예약이 존재할 경우 탈퇴는 불가합니다.
          </p>
        </DeleteText>
        <DeleteModalBtn>
          <DeleteButton
            label="탈퇴"
            onClick={() => {
              handleDelete();
            }}
          />
          <ActionButton label="취소" onClick={onClose} />
        </DeleteModalBtn>
      </DeleteModalStyle>
    </ModalOverlay>
  );
};

export default CeoWithdrawModal;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ceoRoleState, isCeoLoginState } from "../../atoms/loginState";
import useModal from "../../hooks/UseModal";
import { ActionButton, DeleteButton, MainButton } from "../common/Button";
import {
  DeleteIcon,
  DeleteModalBtn,
  DeleteModalStyle,
  DeleteText,
} from "../common/DeleteModal";
import { IoIosNotifications } from "react-icons/io";
import { ModalOverlay } from "../common/ReviewImgModal";
import AlertModal from "../common/AlertModal";
import styled from "@emotion/styled";

// 탈퇴 처리 결과 메세지
const ResultMessage = styled.div`
  > h2 {
    margin-bottom: 20px;
  }
  font-size: 1rem;
  padding: 15px;
  margin-bottom: 10px;
  line-height: 1.5em;
`;

interface CeoWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ceoAccessToken: string;
  glampId: number;
  onAlert: (message: string) => void;
}

const CeoWithdrawModal: React.FC<CeoWithdrawModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  ceoAccessToken,
  onAlert,
}) => {
  const [isCeoLogin, setIsCeoLogin] = useRecoilState(isCeoLoginState);
  const [ceoRole, setCeoRole] = useRecoilState(ceoRoleState);
  const [resultMessage, setResultMessage] = useState(""); // 결과 메시지 상태
  const [showResult, setShowResult] = useState(false); // 결과 표시 여부 상태
  // Alert 모달 관련 상태와 함수
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 상태 초기화
      setResultMessage("");
      setShowResult(false);
    }
  }, [isOpen]);

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
        setResultMessage("탈퇴 신청이 완료되었습니다.");
        setTimeout(() => {
          localStorage.removeItem("ceoAccessToken");
          localStorage.removeItem("ownerRole");
          localStorage.removeItem("savedEmail");
          setIsCeoLogin(false);
          setCeoRole(null);
          navigate("/ceologin");
        }, 2000); // 3초 지연
      } else if (response.data.code === "CD") {
        setResultMessage("현재 예약된 내역이 존재하므로 \n 탈퇴가 불가합니다.");
      } else {
        setResultMessage(
          "탈퇴처리 실패 \n 자세한 사항은 관리자에게 문의주세요",
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        if (error.response?.data.code === "CD") {
          setResultMessage(error.response.data.message);
        }
        if (error.response?.data.code === "DBE") {
          setResultMessage(
            "서버오류로 탈퇴에 실패하였습니다 \n 관리자에게 문의주세요",
          );
        }
      } else {
        setResultMessage("탈퇴처리 실패 자세한 사항은 관리자에게 문의주세요");
      }
    }
    setShowResult(true); // 결과 메시지 표시 상태로 변경
  };

  return (
    <>
      <ModalOverlay>
        <DeleteModalStyle>
          <button className="close-btn" type="button" onClick={onClose}>
            <IoClose />
          </button>
          <DeleteIcon>
            {showResult ? (
              <IoIosNotifications
                style={{ color: "white", width: "38px", height: "38px" }}
              />
            ) : (
              <HiOutlineTrash />
            )}
          </DeleteIcon>
          <DeleteText>
            {showResult ? (
              <ResultMessage>
                <h2>탈퇴 처리 결과</h2>
                <div>{resultMessage}</div>
              </ResultMessage> // 탈퇴 결과 메시지 표시
            ) : (
              <>
                <h2>정말 탈퇴하시겠습니까?</h2>
                <p>
                  최종 탈퇴는 관리자 확인 후 처리되며
                  <br /> 예약이 존재할 경우 탈퇴는 불가합니다.
                </p>
              </>
            )}
          </DeleteText>
          <DeleteModalBtn>
            {showResult ? (
              <DeleteButton
                label="확인"
                onClick={onClose} // 결과 확인 후 모달 닫기
              />
            ) : (
              <>
                <DeleteButton
                  label="탈퇴"
                  onClick={handleDelete} // 탈퇴 요청 처리
                />
                <ActionButton label="취소" onClick={onClose} />
              </>
            )}
          </DeleteModalBtn>
        </DeleteModalStyle>
      </ModalOverlay>
      <AlertModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </>
  );
};

export default CeoWithdrawModal;

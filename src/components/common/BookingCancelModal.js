import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { colorSystem } from "../../styles/color";
import { ActionButton, DeleteButton } from "./Button";
import { getCookie } from "../../utils/cookie";

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
  border-radius: 20px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 350px;
  max-width: 100%;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 20px;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: ${colorSystem.g900};
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  > p {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1rem;
    font-weight: 400;
    color: ${colorSystem.g900};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const BookingCancelModal = ({
  isOpen,
  onClose,
  onConfirm,
  reservationId,
  comment,
}) => {
  const [accessToken, setAccessToken] = useState("");

  // 모달창 오픈시 스크롤 금지 컨트롤
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

  // 토큰 정보 불러오기
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);
        } else {
          console.log("쿠키에 access-Token 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccessToken();
  }, []);

  // 예약 취소 함수
  const handleConfirm = async e => {
    e.preventDefault();
    if (!accessToken) return;
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(
        `/api/user/book-cancel`,
        {
          reservationId: reservationId,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.data.code === "SU") {
        console.log("예약취소 성공", response);
        onConfirm();
      } else if (response.data.code === "NB") {
        console.log("존재하지 않는 예약내역입니다.");
      }
      return response;
    } catch (error) {
      console.log("예약취소 실패", error);
    }
  };

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>예약 취소</ModalHeader>
        <ModalBody>
          <p>정말 예약을 취소하시겠습니까?</p>
        </ModalBody>
        <ModalFooter>
          <ActionButton
            label="취소"
            className="cancel"
            onClick={() => {
              onClose();
            }}
          ></ActionButton>
          <DeleteButton
            label="확인"
            className="confirm"
            onClick={handleConfirm}
          >
            확인
          </DeleteButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default BookingCancelModal;

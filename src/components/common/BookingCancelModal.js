import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { colorSystem } from "../../styles/color";
import { ActionButton, DeleteButton } from "./Button";
import { getCookie } from "../../utils/cookie";
import { ModalLine } from "../../styles/modalstyle";

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
  z-index: 99999;
`;

const ModalContent = styled.div`
  background: white;
  padding-top: 15px;
  width: 250px;
  max-width: 100%;
  top: 50%;
  left: 50%;
  text-align: center;
  border-radius: 20px;
  border: 1px solid ${colorSystem.p100};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 15px;
 
  > h2{
  font-size: 0.9rem;
  color: ${colorSystem.g800};
}
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  > p {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 0.8rem;
    font-weight: 400;
    color: ${colorSystem.g800};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 15px;

  .cancel{
    > button{
    height: 2em;
  }
  }

  .confirm{
    > button{
    height: 2em;
  }
  }
`;

const BookingCancelModal = ({
  isOpen,
  onClose,
  onConfirm,
  reservationId,
  comment,
}) => {
  const [accessToken, setAccessToken] = useState("");
  // 예약 취소 성공 여부 상태 추가
  const [isSuccess, setIsSuccess] = useState(false);
  
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
        setIsSuccess(true); // 성공 상태 업데이트
        onConfirm();
      } else if (response.data.code === "NB") {
        console.log("존재하지 않는 예약내역입니다.");
      }
      return response;
    } catch (error) {
      console.log("예약취소 실패", error);
    }
  };
  // 예약 취소 성공 시 모달 닫기
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <h2>예약 취소</h2>
        <ModalLine/>
        <ModalBody>
          <p>정말 예약을 취소하시겠습니까?</p>
        </ModalBody>
        <ModalFooter>
          <div className="cancel">
          <ActionButton
            label="취소"
            onClick={() => {
              onClose();
            }}
          ></ActionButton>
          </div>
          <div className="confirm">
          <DeleteButton
            label="확인"
            onClick={handleConfirm}
          >
            확인
          </DeleteButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default BookingCancelModal;

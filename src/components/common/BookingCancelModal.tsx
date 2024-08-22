import styled from "@emotion/styled";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { colorSystem } from "../../styles/color";
import { ActionButton, DeleteButton } from "./Button";
import { ModalLine } from "../../styles/modalstyle";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../atoms/loginState";
import { FaCircleExclamation } from "react-icons/fa6";

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
  width: 400px;
  max-width: 100%;
  top: 50%;
  left: 50%;
  text-align: center;
  border-radius: 20px;
  border: 1px solid ${colorSystem.p100};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 15px;

  > h2 {
    font-size: 1.1rem;
    color: ${colorSystem.g800};
    margin-bottom: 5px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  .cancel-check {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    background-color: ${colorSystem.error};
    padding: 3px;
    border-radius: 5px;
    margin-bottom: 5px;

    > p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-align: left;
      padding: 3px 0px;
      font-size: 0.85rem;
      line-height: 1.2;
      font-weight: 400;
      color: white;
    }
    .icon {
      width: 23px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
    }
  }
  .check-txt {
    width: 85%;
    display: flex;
    justify-content: left;
    font-size: 0.9rem;
    margin: 10px 0px;
  }
`;

const CommentInput = styled.textarea`
  width: 85%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${colorSystem.g300};
  font-size: 0.85rem;
  resize: none;
  height: 80px;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 15px;

  .cancel {
    > button {
      height: 2em;
    }
  }

  .confirm {
    > button {
      height: 2em;
    }
  }
`;

interface BookingCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reservationId: string;
  comment?: string | undefined;
}

const BookingCancelModal: React.FC<BookingCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  reservationId,
}) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // 예약 취소 성공 여부 상태 추가
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

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

  // 예약 취소 함수
  const handleConfirm = async (e: FormEvent) => {
    // console.log("예약취소 확인");
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
      // console.log(response);
      if (response.data.code === "SU") {
        // console.log("예약취소 성공", response);
        setIsSuccess(true); // 성공 상태 업데이트
        onConfirm();
        // onBookingCancelled(reservationId, comment); // 예약 취소 시 호출
      } else if (response.data.code === "NB") {
        // console.log("존재하지 않는 예약내역입니다.");
      }
      return response;
    } catch (error) {
      // console.log("예약취소 실패", error);
    }
  };
  // 예약 취소 성공 시 페이지 새로고침
  useEffect(() => {
    if (isSuccess) {
      // 모달 닫기
      onClose();
      // 페이지 새로 고침
      // window.location.reload();
    }
  }, [isSuccess, onClose]);

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <h2>예약 취소</h2>
        <ModalLine />
        <ModalBody>
          <div className="cancel-check">
            <FaCircleExclamation className="icon" />
            <p>예약취소시에는 수수료가 발생될 수 있습니다.</p>
          </div>
          <div className="check-txt">취소 사유를 입력해주세요.</div>
          {/* <label>취소사유 : </label> */}
          <CommentInput
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="취소 사유를 입력하세요."
          />
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
            <DeleteButton label="확인" onClick={handleConfirm}></DeleteButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  ) : null;
};

export default BookingCancelModal;

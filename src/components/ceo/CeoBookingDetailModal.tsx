import React from "react";
import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import { ModalOverlay } from "../common/ReviewImgModal";

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  .modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    border-bottom: 1px solid ${colorSystem.g300};
    padding-bottom: 10px;

    > h2 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .close-btn {
      background-color: transparent;
      border: 0;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      svg {
        width: 23px;
        height: 23px;
        color: ${colorSystem.g800};
      }
    }
  }

  .modal-body {
    display: flex;
    gap: 10px;
    flex-direction: column;
    /* 객실 정보, 예약정보, 결제정보보 */
    .info-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 5px;
      margin-bottom: 5px;

      .info-header {
        color: ${colorSystem.p900};
        font-weight: 600;
        margin-bottom: 3px;
        font-size: 1rem;
      }

      .payment-datetime {
        margin-bottom: 2px;
        font-size: 0.9rem;
        color: ${colorSystem.g900};
      }

      .info {
        display: flex;
      }
      .label {
        display: flex;
        align-items: center;
        color: ${colorSystem.g600};
        font-size: 0.95rem;
        margin-right: 5px;
        font-weight: 500;
      }
      .value {
        display: flex;
        align-items: center;
        color: ${colorSystem.g900};
        font-size: 0.9rem;
        font-weight: 500;
        .add {
          margin-left: 5px;
          background-color: ${colorSystem.ceo700};
          color: white;
          font-size: 0.85rem;
          border-radius: 5px;
          padding: 2px 5px;
        }
      }
    }

    /* 이용 정보 */
    .stay-info-group {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.95rem;
      gap: 10px;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid ${colorSystem.g400};
      margin-bottom: 10px;
      position: relative; /* 정중앙에 세로줄을 그리기 위해 부모 요소를 기준으로 삼음 */

      /* 세로선 */
      &::after {
        content: "";
        position: absolute;
        top: 1%; /* 세로줄의 시작 위치 조정 */
        bottom: 1%; /* 세로줄의 끝 위치 조정 */
        left: 50%; /* 중앙에 위치시키기 위해 */
        transform: translateX(-50%);
        width: 1px;
        background-color: transparent;
        border-left: 1px dashed ${colorSystem.g400};
      }

      .stay-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 7px;

        > div {
          display: flex;
          justify-content: center;
        }
        > span {
          background-color: ${colorSystem.p300};
          color: white;
          border-radius: 5px;
          padding: 2px 5px;
          position: relative;
          z-index: 1;
        }
      }
    }
  }
`;

interface CeoBookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  detail: {
    roomName: string;
    checkInDate: string;
    checkOutDate: string;
    period: number;
    inputName: string;
    personnel: number;
    userPhone: string;
    createdAt: string;
    payAmount: number;
    pg: string;
  } | null;
}

const CeoBookingDetailModal: React.FC<CeoBookingDetailModalProps> = ({
  isOpen,
  onClose,
  detail,
}) => {
  if (!isOpen || !detail) return null;

  // 배경 클릭 시 모달 닫기 핸들러
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 전화번호에 - 추가
  const formatPhoneNumber = (phoneNumber: string) => {
    // 모든 비숫자 문자 제거
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    // 전화번호 길이가 맞는 경우만 포맷팅
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber; // 포맷팅할 수 없는 경우 원래 전화번호를 반환
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
          <h2>예약 상세 보기</h2>
        </div>
        <div className="modal-body">
          <div className="info-group">
            <div className="info-header">객실정보</div>
            <div className="value">{detail.roomName}</div>
          </div>
          <div className="stay-info-group">
            <div className="stay-info">
              <div className="date">체크인</div>
              <div>{moment(detail.checkInDate).format("YYYY.MM.DD")}</div>
            </div>
            <div className="stay-info">
              <span>{detail.period}박</span>
            </div>
            <div className="stay-info">
              <div className="date">체크아웃</div>
              <div>{moment(detail.checkOutDate).format("YYYY.MM.DD")}</div>
            </div>
          </div>
          <div className="info-group">
            <div className="info-header">예약정보</div>
            <div className="info">
              <div className="label">예약자 이름</div>
              <div className="value">
                {detail.inputName} |
                <div className="add">{detail.personnel}인</div>
              </div>
            </div>
            <div className="info">
              <div className="label">전화번호</div>
              <div className="value">{formatPhoneNumber(detail.userPhone)}</div>
            </div>
          </div>
          <div className="info-group">
            <div className="info-header">결제정보</div>
            <div className="payment-datetime">
              결제일시 {moment(detail.createdAt).format("YYYY.MM.DD HH:mm")}{" "}
            </div>
            <div className="info">
              <div className="label">객실 가격</div>
              <div className="value">{detail.payAmount.toLocaleString()}원</div>
            </div>
            <div className="info">
              <div className="label">결제 수단</div>
              <div className="value">{detail.pg}페이</div>
            </div>
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CeoBookingDetailModal;

import styled from "@emotion/styled";
import moment from "moment";
import { useState } from "react";
import { colorSystem } from "../../styles/color";
import CeoBookingDetailModal from "./CeoBookingDetailModal";

const CeoBookingDetailStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${colorSystem.g300};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  cursor: pointer;

  .booking-info {
    width: 60%;

    .guest-info {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      margin-bottom: 7px;
    }

    .guest-name {
      padding: 4px 0px;
    }

    .guest-number {
      padding: 4px 0px;
    }

    .stay-info {
      display: flex;
      gap: 5px;
      color: ${colorSystem.g700};

      .room-name {
        color: ${colorSystem.p800};
        font-weight: 500;
      }
    }

    .stay-night {
      color: ${colorSystem.p600};
      background-color: #eaf4ff;
      border: 2px solid ${colorSystem.p200};
      border-radius: 5px;
      padding: 4px 10px;
      margin-left: 5px;
    }
  }

  /* 총 결제 금액 */
  .total-amount {
    font-size: 1rem;
    font-weight: 600;
    color: ${colorSystem.p500};
  }
`;

// 예약 내역이 없을 시
const NoBookingMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  color: ${colorSystem.g800};
  margin: 10px 0px;
`;

export interface BookingDetail {
  inputName: string;
  personnel: number;
  roomName: string;
  payAmount: number;
  checkInDate: string;
  checkOutDate: string;
  userPhone: string;
  createdAt: string;
  pg: string;
  period: number;
}

interface CeoBookingDetailProps {
  bookingDetails: BookingDetail[];
}

const CeoBookingDetail: React.FC<CeoBookingDetailProps> = ({
  bookingDetails,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<BookingDetail | null>(
    null,
  );

  const handleOpenModal = (detail: BookingDetail) => {
    setSelectedDetail(detail); // 선택한 예약의 세부정보를 설정합니다.
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDetail(null); // 모달 닫을 때 선택된 세부정보를 초기화합니다.
  };

  return (
    <div>
      {bookingDetails.length === 0 ? (
        <NoBookingMessage>예약 내역이 없습니다.</NoBookingMessage>
      ) : (
        bookingDetails.map((detail, index) => (
          <CeoBookingDetailStyle
            key={index}
            onClick={() => handleOpenModal(detail)}
          >
            <div className="booking-info">
              <div className="guest-info">
                <div className="guest-name">{detail.inputName}님 |</div>
                <div className="guest-number">{detail.personnel}인</div>
              </div>
              <div className="stay-info">
                <div>
                  {moment(detail.checkInDate).format("MM.DD")} -{" "}
                  {moment(detail.checkOutDate).format("MM.DD")} |
                </div>
                <div className="room-name">{detail.roomName}</div>
              </div>
            </div>
            <div className="total-amount">
              <div>{detail.payAmount.toLocaleString()}원</div>
            </div>
          </CeoBookingDetailStyle>
        ))
      )}

      <CeoBookingDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        detail={selectedDetail}
      />
    </div>
  );
};

export default CeoBookingDetail;

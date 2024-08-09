import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

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

interface BookingDetail {
  inputName: string;
  personnel: number;
  roomName: string;
  payAmount: number;
  checkInDate: string;
  checkOutDate: string;
}

interface CeoBookingDetailProps {
  bookingDetails: BookingDetail[];
}
const CeoBookingDetail: React.FC = () => {
  const [ceoAccessToken] = useRecoilState(ceoAccessTokenState);
  const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 예약 상세 내역 불러오기
    const getOwnerBook = async (date: Date) => {
      if (!ceoAccessToken) return;

      const formattedDate = moment(date).format("YYYY-MM-DD");

      try {
        const response = await axios.get(
          `/api/owner/book?date=${formattedDate}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${ceoAccessToken}`,
            },
          },
        );
        if (response.data.code === "SU") {
          setBookingDetails(response.data.complete || []);
          console.log(response);
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const today = new Date();
    getOwnerBook(today);
  }, [ceoAccessToken]);

  return (
    <>
      {bookingDetails.map((detail, index) => (
        <CeoBookingDetailStyle key={index}>
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
              <div>{detail.roomName}</div>
            </div>
          </div>
          <div className="total-amount">
            <div>{detail.payAmount.toLocaleString()}원</div>
          </div>
        </CeoBookingDetailStyle>
      ))}
    </>
  );
};

export default CeoBookingDetail;

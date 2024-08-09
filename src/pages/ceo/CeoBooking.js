import styled from "@emotion/styled";
import { colorSystem, size } from "../../styles/color";
import CeoCategories from "../../components/ceo/CeoCategories";
import CeoBookingDetail from "../../components/ceo/CeoBookingDetail";
import BookingCalendar from "../../components/calendar/BookingCalendar";
import { useState } from "react";
import axios from "axios";
import { ceoAccessTokenState } from "../../atoms/loginState";
import { useRecoilState } from "recoil";
import moment from "moment";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }
  h3 {
    width: 100%;
    margin-top: 50px;
    margin-left: 120px;
    margin-bottom: 65px;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colorSystem.g900};
  }

  @media all and (max-width: 1910px) {
    display: flex;
    .inner {
      margin-left: 82px;
    }
  }

  ${size.mid} {
    flex-direction: column;
    h3 {
      margin-top: 250px;
    }
  }

  .wrap {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 100%;
    /* height: 1000px; */
    margin-bottom: 50px;
    justify-content: space-between;
    gap: 20px;

    /* 캘린더 */
    .calendar {
      width: 80%;
      margin: 0 auto;
      /* border-radius: 20px;
      background-color: white;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); */
    }

    /* 예약보기 */
    .booking-detail {
      width: 80%;
      margin: 0 auto;
      border-radius: 20px;
      background-color: aliceblue;

      .selected-date {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        > p {
          font-size: 1.2rem;
          font-weight: 700;
          color: ${colorSystem.g900};
        }
      }
      /* 예약 현황 */
      .booking-status {
        width: 100%;
        padding: 30px;
      }

      /* 매출 현황 */
      .sales-status {
        width: 100%;
        padding: 30px;

        .total-sales {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background-color: white;
          border-radius: 10px;
          border: 1px solid ${colorSystem.g500};
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

          > span {
            font-size: 1rem;
            font-weight: 600;
            color: ${colorSystem.g900};
          }

          > div {
            font-size: 1rem;
            font-weight: 700;
            color: ${colorSystem.error};
          }
        }
      }
    }
  }
`;

const CeoBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [ceoAccessToken, setCeoAccessToken] =
    useRecoilState(ceoAccessTokenState);

  const handleDateSelect = async date => {
    setSelectedDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");

    // 예약 상세 정보를 가져오는 API 호출
    try {
      const response = await axios.get(
        `/api/owner/book?date=${formattedDate}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ceoAccessToken}`,
          },
        },
      );
      console.log(response);
      setBookingDetails(response.data.countList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WrapStyle>
      <CeoCategories />
      <div className="inner">
        <h3>예약 관리</h3>
        <div className="wrap">
          {/* 캘린더 */}
          <div className="calendar">
            <BookingCalendar onDateSelect={handleDateSelect} />
          </div>
          {/* 예약 보기 */}
          <div className="booking-detail">
            {/* 선택 날짜 */}
            <div className="selected-date">
              <p>8월 1일</p>
            </div>
            {/* 예약 현황 */}
            <div className="booking-status">
              <CeoBookingDetail />
              <CeoBookingDetail />
              <CeoBookingDetail />
              <CeoBookingDetail />
              <CeoBookingDetail />
              <CeoBookingDetail />
              <CeoBookingDetail />
            </div>
            {/* 매출 현황 */}
            <div className="sales-status">
              <div className="total-sales">
                <span>총 매출</span>
                <div>264,000원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapStyle>
  );
};

export default CeoBooking;

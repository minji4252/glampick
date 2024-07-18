import styled from "@emotion/styled";
import { colorSystem, size } from "../styles/color";
import payImg from "../images/payImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  WrapStyle,
  PayLeft,
  PayRoomImg,
  PayMiddle,
  PayRoomInfo,
  PayRoomContent,
  PayRight,
  VerticalLine,
  PriceInfo,
  UnderLine,
  PriceTotal,
} from "../styles/PaymentCardStyle";

const PaymentCard = ({
  glampName,
  inDate,
  outDate,
  checkInTime,
  checkOutTime,
  people,
  roomName,
  // roomPrice,
  roomMainImage,
  roomId,
  glampId,
}) => {
  const [reservationInfo, setReservationInfo] = useState({
    roomPrice: 0,
    extraChargePrice: 0,
    payAmount: 0,
  });

  useEffect(() => {
    const fetchReservationInfo = async () => {
      // eslint-disable-next-line no-undef
      const apiUrl = `${process.env.PUBLIC_URL}/api/book/reservation?roomId=${roomId}&personnel=${people}&glampId=${glampId}`;
      try {
        const response = await axios.get(apiUrl);
        console.log("response11", response);
        setReservationInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservationInfo();
  }, [glampId, roomId]);

  const formatTime = time => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const formatDate = date => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const [year, month, day] = date.split("-");
    const parsedDate = new Date(year, month - 1, day);
    const dayOfWeek = days[parsedDate.getDay()];

    return `${month}.${day} (${dayOfWeek})`;
  };

  // const formattedPrice = Number(roomPrice).toLocaleString("ko-KR");

  const formattedRoomPrice = Number(reservationInfo.roomPrice).toLocaleString(
    "ko-KR",
  );
  const formattedExtraChargePrice = Number(
    reservationInfo.extraChargePrice,
  ).toLocaleString("ko-KR");
  const formattedPayAmount = Number(reservationInfo.payAmount).toLocaleString(
    "ko-KR",
  );

  return (
    <WrapStyle>
      <div className="pay-left">
        <PayLeft>
          <PayRoomImg>
            <div
              className="pay-img"
              style={{
                // eslint-disable-next-line no-undef
                backgroundImage: `url(${process.env.PUBLIC_URL}/${roomMainImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </PayRoomImg>
        </PayLeft>

        <PayMiddle>
          <PayRoomInfo>
            <h3>{glampName}</h3>
            <PayRoomContent>
              <div className="pay-room-item">
                <span>객실</span>
                <p>{roomName}</p>
              </div>
              <div className="pay-room-item">
                <span>일정</span>
                <h4>
                  {formatDate(inDate)} {formatTime(checkInTime)} ~{" "}
                  {formatDate(outDate)} {formatTime(checkOutTime)}
                </h4>
              </div>
              <div className="pay-room-item">
                <span>인원</span>
                <p>{people}인</p>
              </div>
            </PayRoomContent>
          </PayRoomInfo>
        </PayMiddle>
      </div>
      <PayRight>
        <VerticalLine />
        <div className="pay-right">
          <PriceInfo>
            <h3>결제정보</h3>
            <div className="price-item">
              <p>객실 가격</p>
              <span>{formattedRoomPrice}원</span>
            </div>
            <div className="price-item">
              <p>인원 추가비용</p>
              <span>+ {formattedExtraChargePrice}원</span>
            </div>
          </PriceInfo>
          <UnderLine />
          <PriceTotal>
            <div className="price-item">
              <p>총 결제 금액</p>
              <span>{formattedPayAmount}원</span>
            </div>
          </PriceTotal>
        </div>
      </PayRight>
    </WrapStyle>
  );
};

export default PaymentCard;

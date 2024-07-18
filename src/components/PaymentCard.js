import {
  PayLeft,
  PayMiddle,
  PayRight,
  PayRoomContent,
  PayRoomImg,
  PayRoomInfo,
  PriceInfo,
  PriceTotal,
  UnderLine,
  VerticalLine,
  WrapStyle,
} from "../styles/PaymentCardStyle";

const PaymentCard = ({
  glampName,
  inDate,
  outDate,
  checkInTime,
  checkOutTime,
  people,
  roomName,
  roomMainImage,
  formatRoomPrice,
  formatExtraPrice,
  formatPayAmount,
}) => {
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

  return (
    <WrapStyle>
      <div className="pay-left">
        <PayLeft>
          <PayRoomImg>
            <div
              className="pay-img"
              style={{
                // eslint-disable-next-line no-undef
                backgroundImage: `url(${process.env.PUBLIC_URL}${roomMainImage})`,
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
              <span>{formatRoomPrice}원</span>
            </div>
            <div className="price-item">
              <p>인원 추가비용</p>
              <span>+ {formatExtraPrice}원</span>
            </div>
          </PriceInfo>
          <UnderLine />
          <PriceTotal>
            <div className="price-item">
              <p>총 결제 금액</p>
              <span>{formatPayAmount}원</span>
            </div>
          </PriceTotal>
        </div>
      </PayRight>
    </WrapStyle>
  );
};

export default PaymentCard;

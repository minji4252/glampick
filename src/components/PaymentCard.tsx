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

interface PaymentCardProps {
  glampName: string;
  inDate: string;
  outDate: string;
  checkInTime: string;
  checkOutTime: string;
  people: number;
  roomName: string;
  roomMainImage: string;
  formatRoomPrice: string;
  formatExtraPrice: string;
  formatPayAmount: string;
  stayDuration: number;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
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
  stayDuration,
}) => {
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: string): string => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const [year, month, day] = date.split("-");
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
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
              style={
                {
                  // eslint-disable-next-line no-undef
                  backgroundImage: `url(${process.env.PUBLIC_URL}${roomMainImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                } as React.CSSProperties
              }
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
                <h5>
                  {formatDate(inDate)} {formatTime(checkInTime)} ~{" "}
                  {formatDate(outDate)} {formatTime(checkOutTime)}
                </h5>
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
            <div className="price-item payment-item">
              <p>
                총 {stayDuration}박 {stayDuration + 1}일 일정
              </p>
            </div>
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

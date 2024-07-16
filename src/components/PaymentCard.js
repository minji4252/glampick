import styled from "@emotion/styled";
import { colorSystem, size } from "../styles/color";
import payImg from "../images/payImg.png";

const WrapStyle = styled.div`
  min-width: 390px;
  max-width: 1040px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${colorSystem.primary};

  display: flex;

  h3 {
    font-size: 1.25em;
    font-weight: 800;
    color: ${colorSystem.g900};
  }

  .pay-left {
    display: flex;
    max-width: 755px;
    width: 100%;

    ${size.mid} {
      flex-direction: column;
    }
  }

  ${size.mid95} {
    flex-direction: column;
  }
`;

// 왼쪽
const PayLeft = styled.div`
  padding: 25px;
  max-width: 400px;
  width: 100%;
  display: flex;

  ${size.mid} {
    max-width: 750px;
  }
`;
const PayRoomImg = styled.div`
  height: 100%;
  width: 100%;
  .pay-img {
    border-radius: 10px;

    /* background: url(${payImg}) no-repeat center; */
    background-size: cover;
    width: 100%;
    height: 190px;
  }
`;

// 가운데
const PayMiddle = styled.div`
  padding: 25px 25px 25px 5px;

  ${size.mid} {
    padding: 0 0 25px 25px;
  }
`;
const PayRoomInfo = styled.div`
  h3 {
    margin-top: 20px;

    ${size.mid} {
      margin-top: 0px;
    }
  }
`;
const PayRoomContent = styled.div`
  margin-top: 65px;

  .pay-room-item {
    display: flex;
    gap: 10px;
    line-height: 1.6rem;

    span {
      color: ${colorSystem.g300};
      font-weight: 500;
      width: 50px;
    }

    p {
      font-weight: 500;
    }
  }

  ${size.mid} {
    margin-top: 25px;
  }
`;

// 오른쪽
const PayRight = styled.div`
  width: 100%;
  max-width: 285px;
  display: flex;

  .pay-right {
    padding: 40px 40px 40px 0;
    width: 100%;

    ${size.mid95} {
      padding: 25px 40px 40px 0;
    }
  }

  .price-item {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    ${size.mid95} {
      justify-content: flex-start;
      gap: 20px;
    }
  }

  ${size.mid95} {
    flex-direction: column;
    max-width: 100%;
    margin-left: 25px;
  }
`;

const VerticalLine = styled.div`
  height: 92%;
  width: 1px;
  border: 1px dashed ${colorSystem.g300};
  margin: 10px 40px 10px 0;

  ${size.mid95} {
    width: 93%;
    height: 1px;
    margin: 0;
  }
`;
const PriceInfo = styled.div`
  p {
    color: ${colorSystem.g400};
  }

  span {
    font-weight: 600;
  }
`;
const UnderLine = styled.div`
  border-bottom: 1px solid ${colorSystem.g200};
  margin-top: 45px;
  ${size.mid95} {
    max-width: 200px;
    margin-top: 20px;
  }
`;
const PriceTotal = styled.div`
  p {
    font-weight: 600;
  }

  span {
    font-size: 1.3rem;
    font-weight: 800;
    color: ${colorSystem.error};
  }
`;

const PaymentCard = ({
  glampName,
  checkInTime,
  checkOutTime,
  roomNumPeople,
  roomMaxPeople,
  roomName,
  roomPrice,
  roomMainImage,
}) => {
  const formatTime = time => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const formattedPrice = Number(roomPrice).toLocaleString("ko-KR");

  return (
    <WrapStyle>
      <div className="pay-left">
        <PayLeft>
          <PayRoomImg>
            <div
              className="pay-img"
              style={{
                backgroundImage: `url(${roomMainImage})`,
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
                <p>
                  06.26 (수) {formatTime(checkInTime)} ~ 06.27 (목){" "}
                  {formatTime(checkOutTime)}
                </p>
              </div>
              <div className="pay-room-item">
                <span>기준인원</span>
                <p>
                  {roomNumPeople}인, 최대 {roomMaxPeople}인
                </p>
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
              <span>{formattedPrice}원</span>
            </div>
          </PriceInfo>
          <UnderLine />
          <PriceTotal>
            <div className="price-item">
              <p>총 결제 금액</p>
              <span>{formattedPrice}원</span>
            </div>
          </PriceTotal>
        </div>
      </PayRight>
    </WrapStyle>
  );
};

export default PaymentCard;

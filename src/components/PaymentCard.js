import styled from "@emotion/styled";
import { colorSystem } from "../styles/color";
import payImg from "../images/payImg.png";

const WrapStyle = styled.div`
  max-width: 1040px;
  height: 240px;
  border-radius: 10px;
  border: 1px solid ${colorSystem.primary};

  display: flex;

  h3 {
    font-size: 1.25em;
    font-weight: 800;
    color: ${colorSystem.g900};
  }
`;

const PayLeft = styled.div`
  padding: 25px;

  max-width: 750px;
  width: 100%;
  display: flex;
  gap: 35px;
`;
const PayRoomImg = styled.div`
  height: 100%;
  max-width: 350px;
  width: 100%;
  .pay-img {
    background: url(${payImg}) no-repeat center;
    background-size: cover;
    width: 100%;
    max-height: 208px;
    height: 100%;
  }
`;
const PayRoomInfo = styled.div`
  h3 {
    margin-top: 20px;
  }
`;
const PayRoomContent = styled.div`
  margin-top: 65px;

  .pay-room-item {
    display: flex;
    gap: 10px;
    line-height: 1.3rem;

    span {
      color: ${colorSystem.g300};
      font-weight: 500;
      width: 50px;
    }

    p {
      font-weight: 500;
    }
  }
`;

const PayRight = styled.div`
  padding: 40px;
  width: 100%;
  max-width: 290px;

  .price-item {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
`;

const VerticalLine = styled.div`
  height: 92%;
  width: 1px;
  border: 1px dashed ${colorSystem.g300};
  margin: 10px 0;
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

const PaymentCard = () => {
  return (
    <WrapStyle>
      <PayLeft>
        <PayRoomImg>
          <div className="pay-img" />
        </PayRoomImg>
        <PayRoomInfo>
          <h3>어쩌구 그린 글램핑</h3>
          <PayRoomContent>
            <div className="pay-room-item">
              <span>객실</span>
              <p>그린 502호</p>
            </div>
            <div className="pay-room-item">
              <span>일정</span>
              <p>06.26 (수) 15:00 ~ 06.27 (목) 11:00 (1박)</p>
            </div>
            <div className="pay-room-item">
              <span>기준인원</span>
              <p>2인, 최대 4인</p>
            </div>
          </PayRoomContent>
        </PayRoomInfo>
      </PayLeft>
      <VerticalLine />
      <PayRight>
        <PriceInfo>
          <h3>결제정보</h3>
          <div className="price-item">
            <p>객실 가격</p>
            <span>85,000원</span>
          </div>
        </PriceInfo>
        <UnderLine />
        <PriceTotal>
          <div className="price-item">
            <p>총 결제 금액</p>
            <span>85,000원</span>
          </div>
        </PriceTotal>
      </PayRight>
    </WrapStyle>
  );
};

export default PaymentCard;

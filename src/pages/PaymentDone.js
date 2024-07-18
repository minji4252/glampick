import styled from "@emotion/styled";
import PaymentCard from "../components/PaymentCard";
import { ActionButton, MainButton } from "../components/common/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { colorSystem, size } from "../styles/color";
import { Link, useLocation, useNavigate } from "react-router-dom";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  h2 {
    font-weight: 700;
    color: ${colorSystem.g900};
  }
`;

const CompletedStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .payment-end-title {
    margin-top: 45px;
    margin-left: 15px;
    font-size: 1.4rem;
    display: flex;
    gap: 15px;
    color: ${colorSystem.g900};

    h1 {
      font-weight: 700;
    }

    button {
      background-color: transparent;
      border: 0px;
      cursor: pointer;
    }

    svg {
      width: 30px;
      height: 23px;
    }
  }

  .payment-end-txt {
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }

    p {
      font-size: 1rem;
      font-weight: 600;
      color: ${colorSystem.g300};
    }
  }
`;

const InfoStyle = styled.div`
  width: 100%;
  .payment-end-room-info {
    h2 {
      margin-left: 130px;
      font-size: 1.15rem;
      margin-bottom: 25px;
      width: 100%;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 21%;
  margin-top: 130px;
  margin-bottom: 100px;

  a {
    width: 100%;
    max-width: 290px;
  }

  button {
    max-width: 290px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
  }

  ${size.mid} {
    gap: 50px;
  }
`;

const PaymentDone = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  const location = useLocation();
  const glampName = location.state.glampName;
  const inDate = location.state.inDate;
  const outDate = location.state.outDate;
  const checkInTime = location.state.checkInTime;
  const checkOutTime = location.state.checkOutTime;
  const people = location.state.people;
  // const roomNumPeople = location.state.roomNumPeople;
  // const roomMaxPeople = location.state.roomMaxPeople;
  const roomName = location.state.roomName;
  const roomPrice = location.state.roomPrice;
  const roomMainImage = location.state.roomMainImage;

  return (
    <WrapStyle>
      <div className="inner">
        <CompletedStyle>
          <div className="payment-end-title">
            <button onClick={onClickBtn}>
              <FaArrowLeft />
            </button>
            <h1>결제 완료</h1>
          </div>
          <div className="payment-end-txt">
            <h2>예약이 완료되었습니다</h2>
            <p>완료된 예약 내역은 마이페이지에서 확인하실 수 있습니다</p>
          </div>
        </CompletedStyle>
        <InfoStyle>
          <div className="payment-end-room-info">
            <h2>예약 완료된 글램핑</h2>
            <PaymentCard
              glampName={glampName}
              inDate={inDate}
              outDate={outDate}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              people={people}
              // roomNumPeople={roomNumPeople}
              // roomMaxPeople={roomMaxPeople}
              roomName={roomName}
              roomPrice={roomPrice}
              roomMainImage={roomMainImage}
            />
          </div>
          <ButtonGroup>
            <Link to="/bookingdetail">
              <MainButton label="예약 내역 확인하기" />
            </Link>
            <Link to="/">
              <ActionButton label="메인 화면으로 돌아가기" />
            </Link>
          </ButtonGroup>
        </InfoStyle>
      </div>
    </WrapStyle>
  );
};

export default PaymentDone;

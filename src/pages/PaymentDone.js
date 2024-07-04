import styled from "@emotion/styled";
import PaymentCard from "../components/PaymentCard";
import { ActionButton, MainButton } from "../components/common/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { colorSystem } from "../styles/color";
import { Link } from "react-router-dom";

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
  .payment-end-room-info {
    h2 {
      margin-left: 10px;
      font-size: 1.15rem;
      margin-bottom: 25px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 170px;
  margin-top: 130px;
  margin-bottom: 100px;

  > button {
    max-width: 290px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
  }
`;

const PaymentDone = () => {
  return (
    <WrapStyle>
      <div className="inner">
        <CompletedStyle>
          <div className="payment-end-title">
            <FaArrowLeft />
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
            <PaymentCard />
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

import styled from "@emotion/styled";
import PaymentCard from "../components/PaymentCard";
import { MainButton } from "../components/common/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { colorSystem } from "../styles/color";
import { useState } from "react";
import kakaopay from "../images/kakaopay.png";
import tosspay from "../images/tosspay.png";
import { Link } from "react-router-dom";

const WrapStyle = styled.div`
  .inner {
    flex-direction: column;
  }

  h2 {
    font-weight: 700;
    color: ${colorSystem.g900};
    font-size: 1.15rem;
    margin-bottom: 25px;
  }
`;
const InfoStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;

  .payment-title {
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

  .payment-room-info {
    h2 {
      margin-left: 10px;
    }
  }
`;

const PaymentFormStyle = styled.form`
  width: 100%;
  margin-top: 50px;
  margin-left: 25px;
`;
const ReservationInfo = styled.div``;
const InputGroup = styled.div`
  display: flex;
  gap: 70px;
  max-width: 770px;
  width: 100%;
`;

const ReservationInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  label {
    font-weight: 600;
    color: ${colorSystem.g700};
  }

  Input {
    height: 50px;
    border: 0px;
    background-color: ${colorSystem.g150};
    border-radius: 8px;
    padding: 10px;
    padding-left: 20px;
  }

  Input::placeholder {
    color: ${colorSystem.g300};
  }

  p {
    color: ${colorSystem.g300};
    font-size: 0.8rem;
    margin-top: 3px;
    margin-left: 5px;
  }
`;

const UnderLine = styled.div`
  border-bottom: 1px solid ${colorSystem.g150};
  margin: 30px 0;
`;
const PaymentMethod = styled.div`
  .next-check {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
`;

const PaymentTypeList = styled.div`
  display: flex;
  gap: 5px;

  .payment-type {
    max-width: 150px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    border: 1.8px solid ${colorSystem.g200};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    border-color: #b7d5f6;
    background-color: #d2e3fb;
  }

  .kakao > img {
    width: 95px;
    height: 40px;
  }

  .toss > img {
    width: 90px;
    height: 17px;
  }
`;

const PayButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .agree-box {
    max-width: 290px;
    width: 100%;
    display: flex;
    gap: 10px;
    background-color: ${colorSystem.g150};
    padding: 10px;
    border-radius: 8px;

    > span {
      font-weight: 700;
    }
  }

  button {
    margin-top: 20px;
    margin-bottom: 100px;
    max-width: 290px;
    width: 100%;
    border-radius: 10px;
    height: 50px;
    font-size: 1rem;
  }
`;

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentClick = paymentType => {
    setSelectedPayment(paymentType);
  };

  return (
    <WrapStyle>
      <div className="inner">
        <InfoStyle>
          <div className="payment-title">
            <FaArrowLeft />
            <h1>예약 및 결제</h1>
          </div>
          <div className="payment-room-info">
            <h2>픽한 글램핑</h2>
            <PaymentCard />
          </div>
        </InfoStyle>
        <PaymentFormStyle>
          <ReservationInfo>
            <h2>예약자 정보</h2>
            <InputGroup>
              <ReservationInput>
                <label htmlFor="name">예약자 이름</label>
                <input
                  type="text"
                  id="name"
                  className="name-input"
                  autoComplete="off"
                />
              </ReservationInput>
              <ReservationInput>
                <label htmlFor="cellphone">휴대폰 번호</label>
                <input
                  type="text"
                  id="cellphone"
                  autoComplete="off"
                  placeholder="010-1234-5678"
                />
                <p>
                  입력하신 휴대폰 번호는 숙소에 제공되는 목적으로 수집됩니다.
                </p>
              </ReservationInput>
            </InputGroup>
          </ReservationInfo>
          <UnderLine />
          <PaymentMethod>
            <h2>결제 수단</h2>
            <PaymentTypeList>
              <div
                className={`payment-type ${selectedPayment === "kakao" ? "kakao active" : "kakao"}`}
                onClick={() => handlePaymentClick("kakao")}
              >
                <img alt="kakaopay" src={kakaopay} />
              </div>
              <div
                className={`payment-type ${selectedPayment === "toss" ? "toss active" : "toss"}`}
                onClick={() => handlePaymentClick("toss")}
              >
                <div className="toss-img" />
                <img alt="tosspay" src={tosspay} />
              </div>
            </PaymentTypeList>
            <div className="next-check">
              <input type="checkbox" />
              <p>이 결제 수단을 다음에도 사용</p>
            </div>
          </PaymentMethod>

          <PayButton>
            <div className="agree-box">
              <input type="checkbox" />
              <span>약관 전체동의</span>
            </div>
            <Link to="/paymentcompleted">
              <MainButton label="85,000원 결제하기" />
            </Link>
          </PayButton>
        </PaymentFormStyle>
      </div>
    </WrapStyle>
  );
};

export default PaymentPage;

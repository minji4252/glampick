import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentCard from "../components/PaymentCard";
import AlertModal from "../components/common/AlertModal";
import { MainButton } from "../components/common/Button";
import useModal from "../hooks/UseModal";
import kakaopay from "../images/kakaopay.png";
import tosspay from "../images/tosspay.png";
import {
  InfoStyle,
  InputGroup,
  PayButton,
  PaymentFormStyle,
  PaymentMethod,
  PaymentTypeList,
  ReservationInfo,
  ReservationInput,
  UnderLine,
  WrapStyle,
} from "../styles/PaymentPageStyle";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [userName, setUserName] = useState("");
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  const handlePaymentClick = paymentType => {
    setSelectedPayment(paymentType);
  };

  const location = useLocation();
  const glampName = location.state.glampName;
  console.log("glampName", glampName);
  const checkInTime = location.state.checkInTime;
  console.log("checkInTime", checkInTime);
  const checkOutTime = location.state.checkOutTime;
  console.log("checkOutTime", checkOutTime);
  const roomNumPeople = location.state.roomNumPeople;
  console.log("roomNumPeople", roomNumPeople);
  const roomMaxPeople = location.state.roomMaxPeople;
  console.log("roomMaxPeople", roomMaxPeople);
  const roomName = location.state.roomName;
  console.log("roomName", roomName);
  const roomPrice = location.state.roomPrice;
  console.log("roomPrice", roomPrice);
  const roomMainImage = location.state.roomMainImage;
  console.log("roomMainImage", roomMainImage);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!userName) {
      openModal({
        message: "이름을 입력해주세요",
      });
      return;
    }

    if (!selectedPayment) {
      openModal({
        message: "결제수단을 선택해주세요",
      });
      return;
    }

    navigate("/paymentcompleted", {
      state: {
        glampName,
        checkInTime,
        checkOutTime,
        roomNumPeople,
        roomMaxPeople,
        roomName,
        roomPrice,
        roomMainImage,
      },
    });
  };

  return (
    <WrapStyle>
      <div className="inner">
        <InfoStyle>
          <div className="payment-title">
            <button onClick={onClickBtn}>
              <FaArrowLeft />
            </button>
            <h1>예약 및 결제</h1>
          </div>
          <div className="payment-room-info">
            <h2>픽한 글램핑</h2>
            <PaymentCard
              glampName={glampName}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              roomNumPeople={roomNumPeople}
              roomMaxPeople={roomMaxPeople}
              roomName={roomName}
              roomPrice={roomPrice}
              roomMainImage={roomMainImage}
            />
          </div>
        </InfoStyle>
        <PaymentFormStyle onSubmit={handleSubmit}>
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
                  value={userName}
                  onChange={e => {
                    setUserName(e.target.value);
                  }}
                />
                {!userName && (
                  <p className="error-message">이름이 입력되지 않았습니다</p>
                )}
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
                  입력하신 휴대폰 번호는 숙소에 제공되는 목적으로 수집됩니다
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
              <label htmlFor="check1" className="check-label">
                <input type="checkbox" id="check1" />
                <span className="checkbox-icon"></span>
                <p>이 결제 수단을 다음에도 사용</p>
              </label>
            </div>
          </PaymentMethod>

          <PayButton>
            <div className="agree-box">
              <label htmlFor="check2" className="check-label">
                <input type="checkbox" id="check2" />
                <span className="checkbox-icon"></span>
                <span>약관 전체동의</span>
              </label>
            </div>
            <MainButton
              label={`${roomPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 결제하기`}
              onClick={e => {
                handleSubmit(e);
              }}
            />
          </PayButton>
        </PaymentFormStyle>
      </div>
      <AlertModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </WrapStyle>
  );
};

export default PaymentPage;

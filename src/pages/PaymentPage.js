import { useEffect, useState } from "react";
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
import $ from "jquery";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [userName, setUserName] = useState("");
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  const [nameValid, setNameValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const namePattern = /^[가-힣]{1,10}$/;

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

    // 이름 유효성 검사 체크
    if (!namePattern.test(userName)) {
      setErrorMessage("이름은 1~10자 사이 한글만 가능합니다.");
      return;
    }

    // const Payment = (effect, deps) => {
    //   useEffect(() => {
    //     const jquery = document.createElement("script");
    //     jquery.src = "https://cdn.iamport.kr/v1/iamport.js";
    //     const iamport = document.createElement("script");
    //     iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js";
    //     document.head.appendChild(jquery);
    //     document.head.appendChild(iamport);
    //     return () => {
    //       document.head.removeChild(jquery);
    //       document.head.removeChild(iamport);
    //     };
    //   }, []);
    //   return;
    // };

    // 카카오페이
    var IMP = window.IMP;
    IMP.init("imp10657444");
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(), //주문번호
        name: "GOOTTFLEX", //상품명
        amount: $(".amountValue").val(), //가격
        buyer_email: $(".sessionuserID").val(), //구매자 이메일
        buyer_name: "buyer_name", //구매자 이름
        buyer_tel: "hp", //전화번호
        buyer_addr: "addr", //주소
        buyer_postcode: "123-456", //우편번호
      },
      function (data) {
        if (data.success) {
          var msg = "결제 완료";
          msg += "고유ID : " + data.imp_uid; //아임포트 uid는 실제 결제 시 결제 고유번호를 서버와 비교해서 결제처리하는데 필요없긴함.
          msg += "// 상점 거래ID : " + data.merchant_uid;
          msg += "// 결제 금액 : " + data.paid_amount;
          msg += "// 카드 승인번호 : " + data.apply_num;

          $.ajax({
            type: "post",
            url: "/paySuccess",
            data: { ID: data.buyer_email, amount: data.paid_amount },
          });
        } else {
          alert("결제실패");
          // var msg = "결제 실패";
          // msg += "에러 내용" + rsp.error_msg;
        }
        alert(msg);
        document.location.href = "/paymentcompleted";
      },
    );

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
                  placeholder="이름을 입력하세요"
                  value={userName}
                  onChange={e => {
                    setUserName(e.target.value);
                    setNameValid(namePattern.test(e.target.value));
                  }}
                />
                {!nameValid && (
                  <p className="error-message">
                    이름이 형식에 맞지 않습니다 (1~10자 사이 한글만 가능)
                  </p>
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
              label={`${Number(roomPrice).toLocaleString("ko-KR")}원 결제하기`}
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

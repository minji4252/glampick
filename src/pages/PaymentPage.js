import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import TermsModal from "../components/common/TermsModal";
import { kakaopayMethod } from "../apis/payment";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [userName, setUserName] = useState("");
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();
  const [nameValid, setNameValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [reservationInfo, setReservationInfo] = useState({
    roomPrice: 0,
    extraChargePrice: 0,
    payAmount: 0,
  });

  const TERMS_TEXT = `[ 이용규칙 ]

최대 인원 초과 시 입실이 불가합니다.

정원 기준 요금 외 인원 추가 요금을 포함하여 조식, 침구, 침대 등의 추가 요금은 예약 시 옵션으로 선택하여 선결제하실 수 있습니다. 선결제 하지 않거나 예약 시 옵션에 포함되지 않은 추가 비용이 있을 시 이는 현장결제 대상입니다.

제공 이미지는 배정된 객실과 다를 수 있습니다.

제공 정보는 숙소의 사정에 따라 변경될 수 있습니다.

미성년자는 보호자 동반 시 투숙이 가능합니다.

반려동물은 숙소 규정에 따라 출입이 제한되오니 숙소별 상세정보를 꼭 확인해 주세요. 

[ 취소 / 환불규정 ]

글램픽에서 판매되는 글램핑장은 예약/결제 후 1시간 이내에는 무료취소 가능합니다. (단, 체크인 시간 경과 시 취소불가)

숙소 사정에 의해 취소 발생 시 100% 환불이 가능합니다.

예약 상품 별 숙소 정보에 기재된 취소, 환불 규정을 반드시 확인 후 이용해주시기 바랍니다.

취소, 변경 불가 상품은 규정과 상관없이 취소, 변경이 불가합니다.
`;

  //결제 시 사용할 변수
  //글램핑 아이디
  const { glampId } = useParams();
  // 객실 아이디
  const roomId = searchParams.get("roomId");
  // 입실날짜
  const inDate = searchParams.get("inDate") || getDefaultDate(0);
  // 퇴실날짜
  const outDate = searchParams.get("outDate") || getDefaultDate(1);
  // 인원
  const people = searchParams.get("people") || 2;

  //유저정보
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    userPhone: "",
  });

  // 기본값 설정 함수
  const getDefaultDate = daysToAdd => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = getCookie("access-Token");
        if (token) {
          setAccessToken(token);
        } else {
          console.log("엑세스 토큰 없음");
        }
      } catch (error) {
        console.log("엑세스 토큰 가져오는 중 에러", error);
      }
    };
    fetchAccessToken();
  }, []);

  // 유저 정보 불러오기
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!accessToken) return;
        const response = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo({
          userPhone: response.data.userPhone,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [accessToken]);

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

  const formatRoomPrice = Number(reservationInfo.roomPrice).toLocaleString(
    "ko-KR",
  );
  const formatExtraPrice = Number(
    reservationInfo.extraChargePrice,
  ).toLocaleString("ko-KR");
  const formatPayAmount = Number(reservationInfo.payAmount).toLocaleString(
    "ko-KR",
  );

  const formatPhone = phoneNumber => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

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
  const checkInTime = location.state.checkInTime;
  const checkOutTime = location.state.checkOutTime;
  const roomName = location.state.roomName;
  const roomPrice = location.state.roomPrice;
  const roomMainImage = location.state.roomMainImage;

  const kakaopayMethod = (amount, buyerName) => {
    var IMP = window.IMP;
    IMP.init("imp10657444");
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "card",
        merchant_uid: "GPK_" + new Date().getTime(),
        name: glampName + " 결제",
        amount: amount,
        buyer_name: buyerName,
      },
      async function (data) {
        let completed = false;
        let msg;
        if (data.success) {
          msg = "결제 완료";
          msg += "// 결제 수단 : Kakao";
          msg += "// 상점 거래ID : " + data.merchant_uid;
          msg += "// 결제 금액 : " + data.paid_amount;
          msg += "// 구매자 이름 : " + data.buyer_name;
          console.log("msg", msg);
          completed = true;
          try {
            await axios.post(
              "/api/book",
              {
                glampId: glampId,
                roomId: roomId,
                personnel: people,
                inputName: userName,
                checkInDate: inDate,
                checkOutDate: outDate,
                pg: selectedPayment,
                payAmount: roomPrice,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error");
        }

        if (completed) {
          navigate("/paymentcompleted", {
            state: {
              glampName,
              inDate,
              outDate,
              checkInTime,
              checkOutTime,
              people,
              roomName,
              roomPrice,
              roomMainImage,
              formatRoomPrice,
              formatExtraPrice,
              formatPayAmount,
            },
          });
        } else {
          openModal({
            message: "결제에 실패하였습니다. 다시 시도해 주세요.",
          });
        }
      },
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!userName) {
      openModal({
        message: "이름을 입력해주세요",
      });
      return;
    }

    if (!namePattern.test(userName)) {
      openModal({
        message: "이름은 1~10자 사이 한글만 가능합니다",
      });
      return;
    }

    if (!selectedPayment) {
      openModal({
        message: "결제수단을 선택해주세요",
      });
      return;
    }

    if (!agreeToTerms) {
      openModal({
        message: "이용약관 동의가 필요합니다",
      });
      return;
    }

    // 이름 유효성 검사 체크
    if (!namePattern.test(userName)) {
      setErrorMessage("이름은 1~10자 사이 한글만 가능합니다");
      return;
    }

    kakaopayMethod(reservationInfo.payAmount, userName);
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
              inDate={inDate}
              outDate={outDate}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              people={people}
              roomName={roomName}
              roomPrice={roomPrice}
              roomMainImage={roomMainImage}
              formatRoomPrice={formatRoomPrice}
              formatExtraPrice={formatExtraPrice}
              formatPayAmount={formatPayAmount}
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
                  className="cellphone"
                  type="tel"
                  id="cellphone"
                  autoComplete="off"
                  value={formatPhone(userInfo.userPhone)}
                  readOnly
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
            {/* <div className="next-check">
              <label htmlFor="check1" className="check-label">
                <input
                  type="checkbox"
                  id="check1"
                  checked={savePaymentMethod}
                  onChange={e => setSavePaymentMethod(e.target.checked)}
                />
                <span className="checkbox-icon"></span>
                <p>이 결제 수단을 다음에도 사용</p>
              </label>
            </div> */}
          </PaymentMethod>

          <PayButton>
            <div className="agree-box">
              <label htmlFor="check2" className="check-label">
                <input
                  type="checkbox"
                  id="check2"
                  checked={agreeToTerms}
                  onChange={e => setAgreeToTerms(e.target.checked)}
                />
                <span className="checkbox-icon"></span>
                <span>이용약관 동의</span>
                <p
                  onClick={() => {
                    setIsTermsModalOpen(true);
                  }}
                >
                  약관보기 &gt;
                </p>
                <TermsModal
                  isOpen={isTermsModalOpen}
                  onClose={() => setIsTermsModalOpen(false)}
                  title="숙소 이용규칙 및 취소/환불규정 동의"
                  content={TERMS_TEXT}
                />
              </label>
            </div>
            <MainButton
              label={`${formatPayAmount}원 결제하기`}
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

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClampingImage from "../images/main-list-1.png";
import { colorSystem } from "../styles/color";
import { MainButton } from "./common/Button";
import CreateReviewModal from "./common/CreateReviewModal";
import BookingCancelModal from "./common/BookingCancelModal";
import moment from "moment";
import "moment/locale/ko";

export const FormContents = styled.div`
  width: 100%;
  height: 278px;
  /* margin-top: 13px; */
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 65px; */
  .top-contents {
    width: 100%;
    height: 25%;
    padding: 14px 20px;
    border-bottom: 2px solid ${colorSystem.g200};
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .reserv-number {
    font-size: 0.9rem;
    color: ${colorSystem.g800};
  }
  .bottom-contents {
    width: 100%;
    height: 75%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  p {
    display: flex;
    font-size: 0.85rem;
    color: ${colorSystem.g700};
    margin-left: 5px;
  }
  .glampingdetail-link {
    width: 100%;
    display: flex;
    gap: 20px;
  }
  .reserv-info-img {
    width: 140px;
    height: 110px;
    background: url(${ClampingImage}) no-repeat center;
    border-radius: 20px;
  }
  .reserv-info-txt {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: ${colorSystem.g900};
  }
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  .room-type {
    font-size: 1.1rem;
  }
  .date-used {
    font-size: 0.9rem;
  }
  .check-time {
    font-size: 0.9rem;
  }
  /* 예약취소 작성 버튼 */
  .cancel-btn {
    width: 40px;
    height: 35px;
    /* 높이 같지 않을 시 글자 위치가 달라짐 */
    font-size: 0.85rem;
    font-weight: 500;
    color: ${colorSystem.error};
    justify-content: flex-end;
    margin-left: auto;
    border: none;
    background-color: none;
    cursor: pointer;
    display: block;
  }
  /* 후기 작성 버튼 */
  .review-btn {
    display: flex;
    justify-content: flex-end;
    > button {
      width: 80px;
      height: 35px;
      font-size: 0.8rem;
      background-color: white;
      color: ${colorSystem.g800};
      border: 1.5px solid ${colorSystem.p700};
      &:hover {
        background-color: ${colorSystem.p700};
        color: white;
      }
    }
  }
  /* 빈공간 채우기 */
  .empty-space {
    width: 40px;
    height: 35px;
    justify-content: flex-end;
    margin-left: auto;
  }

  /* 취소사유 */
  .cancelled-info {
    display: flex;
    width: 100%;
    height: 35px;
    justify-content: flex-start;
    align-items: center;
    > p {
      margin-left: 3px;
      color: ${colorSystem.error};
    }
  }
`;
export const BookingDetailForm = ({
  booking,
  upcoming,
  isCompleted,
  isCancelled,
  glampId,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [roomMainImage, setRoomMainImage] = useState(null);
  const [reviewWritten, setReviewWritten] = useState(false);

  useEffect(() => {
    setRoomMainImage("pic/glamping/1/glamp/glamping1.jpg");
    setReviewWritten(booking.reviewWritten);
  }, [booking]);
  // 한국어 locale 설정
  moment.locale("ko");

  // 예약 생성일 형식 변환 함수
  const formatCreatedAt = () => {
    // 예약 생성일을 moment 객체로 파싱
    const createdAtMoment = moment(booking.createdAt);
    // 날짜
    const formattedDate = createdAtMoment.format("YYYY.MM.DD");
    // 요일
    const dayOfWeek = createdAtMoment.format("(ddd)");
    return `${formattedDate} ${dayOfWeek}`;
  };

  // 시간을 변환하는 함수
  const formatTime = timeString => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  // 예약날짜 형태 변환
  // 예약취소 모달
  const handleOpenBookCancelModdal = () => {
    setIsCancelModalOpen(true);
  };
  const handleCloseBookCancelModdal = () => {
    setIsCancelModalOpen(false);
  };
  // 후기작성 모달
  const handleOpenCreateReviewModal = () => {
    setIsReviewModalOpen(true);
  };
  const handleCloseCreateReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  // 예약 취소 성공 시 모달 닫기
  const handleBookingCancelSuccess = () => {
    setIsCancelModalOpen(false);
  };
  if (!booking) return null;

  // 후기작성 버튼 표시여부
  const [canWriteReview, setCanWriteReview] = useState(0);
  // booking.status === 1 && !reviewWritten;
  // console.log(booking.status);
  useEffect(() => {
    setCanWriteReview(booking.status);
  }, [booking]);

  return (
    <FormContents>
      <div className="top-contents">
        <h2>{formatCreatedAt()} </h2>
        {(upcoming || isCompleted || isCancelled) && (
          <div className="reserv-number">예약번호: {booking.bookId}</div>
        )}
      </div>
      <div className="bottom-contents">
        <p>숙소</p>
        <div className="reserv-info">
          <Link to={`/places/${glampId}`} className="glampingdetail-link">
            <div
              className="reserv-info-img"
              style={{
                backgroundImage: `url(${booking.glampImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="reserv-info-txt">
              <h4>{booking.glampName}</h4>
              <div className="room-type">{booking.roomName}</div>
              <div className="date-used">
                {booking.checkInDate} ~ {booking.checkOutDate} | 1박
              </div>
              <div className="check-time">
                체크인 {formatTime(booking.checkInTime)} | 체크아웃{" "}
                {formatTime(booking.checkOutTime)}
              </div>
            </div>
          </Link>
        </div>
        {upcoming ? (
          <div
            className="cancel-btn"
            onClick={() => {
              handleOpenBookCancelModdal();
            }}
          >
            취소
          </div>
        ) : isCompleted && !canWriteReview ? (
          <div className="review-btn">
            <MainButton
              label="후기작성"
              onClick={() => {
                handleOpenCreateReviewModal();
              }}
            />
          </div>
        ) : isCancelled ? (
          <div className="cancelled-info">
            <p>취소 사유: {booking.comment}</p>
          </div>
        ) : (
          <div className="empty-space"></div>
        )}
      </div>
      <CreateReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          handleCloseCreateReviewModal();
        }}
        reservationId={booking.reservationId}
        reviewStarPoint={5}
        glampName={booking.glampName}
        roomName={booking.roomName}
        checkInDate={booking.checkInDate}
        checkOutDate={booking.checkOutDate}
        setCanWriteReview={setCanWriteReview}
      />
      <BookingCancelModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          handleCloseBookCancelModdal();
        }}
        onConfirm={handleBookingCancelSuccess} // 예약 취소 성공 시 모달 닫기
        reservationId={booking.reservationId}
      />
    </FormContents>
  );
};
export default BookingDetailForm;

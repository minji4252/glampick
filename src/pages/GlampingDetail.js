import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import AlertModal from "../components/common/AlertModal";
import { ActionButton, MainButton } from "../components/common/Button";
import useModal from "../hooks/UseModal";
import GlampingDetailStyle, {
  InfoGroup,
  OptionItems,
  ReviewAll,
  ReviewContent,
  ReviewSwiper,
  ReviewTitle,
  RoomCard,
  RoomCardBooking,
  RoomCardLeft,
  RoomCardRight,
  RoomInfo,
  RoomInfomation,
  RoomIntro,
  RoomLocation,
  RoomOption,
  RoomPic,
  RoomProperty,
  RoomReview,
  RoomSelect,
  RoomSelectTitle,
  RoomTitle,
  SwiperEndStyle,
  UnderLine,
} from "../styles/GlampingDetailStyle";
// 리뷰- 스와이퍼 관련
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SERVER_URL } from "../apis/config";

const GlampingDetail = () => {
  const [glampingData, setGlampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { openModal, closeModal, isModalOpen, modalMessage } = useModal();

  useEffect(() => {
    const fetchGlampingData = async () => {
      try {
        const glampId = 1;
        const statusId = 0;
        const response = await axios.get(
          `/api/glamping/info?glampId=${glampId}&status=${statusId}`,
        );
        const data = response.data;
        setGlampingData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGlampingData();
  }, []);

  const toggleLike = async () => {
    try {
      const res = await axios.get(`/api/glamping/favorite`);
      if (res.data.resultValue === 1) {
        setIsLiked(true);
        openModal({ message: "관심 글램핑장 목록에 추가되었습니다" });
      } else if (res.data.resultValue === 0) {
        setIsLiked(false);
        openModal({ message: "관심 글램핑장 목록에서 삭제되었습니다" });
      }
      openModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (!glampingData) return null;

  const {
    glampName,
    starPointAvg,
    glampLocation,
    glampIntro,
    infoBasic,
    infoParking,
    infoNotice,
    countReviewUsers,
    reviewItems,
    roomItems,
  } = glampingData;

  const formatTime = time => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const changeOfLine = text => {
    return text
      .split("\r\n")
      .map(line => {
        return line.trim().length > 0
          ? `<span style="font-size: 23px;">·</span> ${line.replace(/^- /, "").trim()}`
          : "";
      })
      .join("<br>");
  };

  const getServiceClassName = service => {
    switch (service) {
      case "바베큐":
        return "option-barbecue";
      case "와이파이":
        return "option-wifi";
      case "수영장":
        return "option-swim";
      case "반려동물 동반":
        return "option-pet";
      case "마운틴뷰":
        return "option-mountain";
      case "오션뷰":
        return "option-ocean";
      case "개별화장실":
        return "option-toilet";
      default:
        return "";
    }
  };

  return (
    <GlampingDetailStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div className="main-img" />
          </RoomPic>
          <RoomTitle>
            <span>{glampName}</span>
            <button onClick={toggleLike}>
              {isLiked ? <GoHeartFill /> : <GoHeart />}
            </button>
          </RoomTitle>
          <RoomReview>
            <ReviewTitle>
              <FaStar />
              <div className="review-score">{starPointAvg}</div>
              <div className="review-evaluat">{countReviewUsers}명 평가</div>
              <Link to="/review">
                <button>리뷰보기</button>
              </Link>
            </ReviewTitle>
            <ReviewSwiper>
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <div>
                  {reviewItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <p>{item.content}</p>
                      <h5>{item.userName}</h5>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              <SwiperEndStyle />
              <Link to="/review">
                <div className="review-all">
                  <button>
                    전체보기
                    <IoIosArrowForward />
                  </button>
                </div>
              </Link>
            </ReviewSwiper>
          </RoomReview>
          <RoomOption>
            <UnderLine />
            <h3 className="option-title">테마</h3>
            <OptionItems>
              <div className="option-item">
                {glampingData.roomService.map((service, index) => (
                  <div key={index} className={getServiceClassName(service)} />
                ))}
              </div>
            </OptionItems>
          </RoomOption>
        </RoomProperty>

        <RoomSelect>
          <UnderLine />
          <RoomSelectTitle>
            <h3>객실선택</h3>
          </RoomSelectTitle>
          {roomItems.map((room, index) => (
            <RoomCard key={index}>
              <RoomCardLeft>
                <Link to={`/roomdetail/${room.roomId}`}>
                  <div className="roomcard-img">
                    <img
                      src={`/glamping/${room.glampId}/room/${room.roomId}/abc.png`}
                      alt="Room"
                    />
                    <span>사진 더보기</span>
                  </div>
                </Link>
              </RoomCardLeft>
              <RoomCardRight>
                <span>{room.roomName}</span>
                <RoomCardBooking>
                  <p>입실 {formatTime(room.checkInTime)}</p>
                  <p>퇴실 {formatTime(room.checkOutTime)}</p>
                  <span>
                    {room.roomPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                  <Link to="/payment">
                    <MainButton label="객실 예약" />
                  </Link>
                </RoomCardBooking>
                <div className="roomcard-txt">
                  <div className="txt-top">
                    <span>객실정보</span>
                    <p>
                      기준 {room.roomNumPeople}인 ~ 최대 {room.roomMaxPeople}인
                      (유료)
                    </p>
                  </div>
                  <div>
                    <span>추가정보</span>
                    <p>{room.roomServices.join(", ")}</p>
                  </div>
                </div>
              </RoomCardRight>
            </RoomCard>
          ))}
          <div className="view-all">
            <ActionButton label="모두 보기" />
          </div>
        </RoomSelect>

        <RoomInfo>
          <RoomIntro>
            <UnderLine />
            <h3>숙소 소개</h3>
            <RiDoubleQuotesL />
            <p>{glampIntro}</p>
            <div>
              <RiDoubleQuotesR />
            </div>
          </RoomIntro>
          <RoomInfomation>
            <UnderLine />
            <h3>숙소 이용정보</h3>
            <InfoGroup>
              <div className="info-item">
                <span>기본정보</span>
                <div
                  dangerouslySetInnerHTML={{ __html: changeOfLine(infoBasic) }}
                />
              </div>
              <div className="info-item">
                <span>주차장정보</span>
                <div>
                  <h4>{infoParking}</h4>
                </div>
              </div>
              <div className="info-item">
                <span>유의사항</span>
                <div>
                  <h4>{infoNotice}</h4>
                </div>
              </div>
            </InfoGroup>
          </RoomInfomation>
          <RoomLocation>
            <UnderLine />
            <h3>위치</h3>
            <p></p>
            <div className="location-info">
              <span>{glampLocation}</span>
              <div>
                <h4>산사원 차량 15분</h4>
                <h4>산정호수 차량 10분</h4>
                <h4>아트밸리 차량 20분</h4>
              </div>
            </div>
            <UnderLine />
          </RoomLocation>
        </RoomInfo>
      </div>
      <AlertModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </GlampingDetailStyle>
  );
};

export default GlampingDetail;

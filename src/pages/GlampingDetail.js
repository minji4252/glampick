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
  ReviewContent,
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
  UnderLine,
} from "../styles/GlampingDetailStyle";

const GlampingDetail = () => {
  const [glampingData, setGlampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { openModal, closeModal } = useModal();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchGlampingData = async () => {
      try {
        const glampId = 1;
        const statusId = 0;
        const response = await axios.get(
          `http://192.168.0.30:8080/api/glamping/info?glampId=${glampId}&status=${statusId}`,
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
        setAlertMessage("관심 글램핑장 목록에 추가되었습니다");
      } else if (res.data.resultValue === 0) {
        setIsLiked(false);
        setAlertMessage("관심 글램핑장 목록에서 삭제되었습니다");
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
  } = glampingData;

  const { roomItems, roomName, checkInTime, checkOutTime, roomPrice } =
    glampingData;

  const formatTime = time => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
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
            <ReviewContent>
              <div className="review-content">
                {reviewItems.map((item, index) => (
                  <div className="review-content-item" key={index}>
                    <p>{item.content}</p>
                    <h5>{item.userName}</h5>
                  </div>
                ))}
              </div>
              <div className="review-more">
                <button>더보기</button>
                <IoIosArrowForward />
              </div>
            </ReviewContent>
          </RoomReview>
          <RoomOption>
            <UnderLine />
            <h3 className="option-title">테마</h3>
            <OptionItems>
              <div className="option-item">
                <div className="option-pet" />
                <div className="option-ocean" />
                <div className="option-wifi" />
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
                    {/* <img src={room.pic} alt="Room" /> */}
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
                <div>
                  <h4>{infoBasic} </h4>
                  <h4>{infoBasic} </h4>
                  <h4>{infoBasic} </h4>
                  <h4>{infoBasic} </h4>
                </div>
              </div>
              <div className="info-item">
                <span>주차장정보</span>
                <div>
                  <h4>{infoParking}</h4>
                  <h4>{infoParking}</h4>
                </div>
              </div>
              <div className="info-item">
                <span>유의사항</span>
                <div>
                  <h4>{infoNotice}</h4>
                  <h4>{infoNotice}</h4>
                  <h4>{infoNotice}</h4>
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
      {/* <AlertModal
        isOpen={openModal}
        onClose={closeModal}
        message={alertMessage}
      /> */}
    </GlampingDetailStyle>
  );
};

export default GlampingDetail;

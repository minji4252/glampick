import { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
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
  RoomSoldOutCard,
  RoomTitle,
  SwiperEndStyle,
  UnderLine,
} from "../styles/GlampingDetailStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { animateScroll as scroll } from "react-scroll";
import {
  fetchGlampingData,
  toggleLikeGlamping,
  fetchMoreRooms,
} from "../apis/glamping";
import CheckModal from "../components/common/CheckModal";

const GlampingDetail = ({ isLogin }) => {
  const [glampingData, setGlampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [roomMainImage, setRoomMainImage] = useState(null);
  const [roomImage, setRoomImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialRoomItems, setInitialRoomItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 추가: 모달 타입 상태 추가

  // 임시데이터(삭제예정)
  const glamp_Id = 1;
  const statusId = 0;
  const startDate = "2024-06-10";
  const endDate = "2024-06-15";

  const roomSelectRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 글램핑디테일페이지 정보 불러오기
    const fetchData = async () => {
      try {
        const data = await fetchGlampingData(
          glamp_Id,
          startDate,
          endDate,
          statusId,
        );
        setGlampingData(data);
        setInitialRoomItems(data.roomItems.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (glampingData && glampingData.roomItems.length > 0) {
      setRoomMainImage(
        `pic/glamping/${glampingData.glampId}/glamp/${glampingData.glampImage}`,
      );
      console.log(
        "1번",
        `pic/glamping/${glampingData.glampId}/glamp/${glampingData.glampImage}`,
      );
      setRoomImage(
        `pic/glamping/${glampingData.glampId}/room/${glampingData.roomItems[0].roomId}/${glampingData.roomItems[0].pic}`,
      );
      console.log(
        "2번",
        `pic/glamping/${glampingData.glampId}/room/${glampingData.roomItems[0].roomId}/${glampingData.roomItems[0].pic}`,
      );
    }
  }, [glampingData]);

  const toggleLike = async () => {
    try {
      // 2. 관심 글램핑장 하트 버튼
      const resultValue = await toggleLikeGlamping();
      if (resultValue === 1) {
        setIsLiked(true);
        setModalMessage("관심 글램핑장 목록에 추가되었습니다");
        setModalType("alert");
      } else if (resultValue === 0) {
        setIsLiked(false);
        setModalMessage("관심 글램핑장 목록에서 삭제되었습니다");
        setModalType("alert");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoreView = async () => {
    const statusId = 1;

    try {
      // 3. 모두보기 클릭시 객실 정보 더 불러오기
      const data = await fetchMoreRooms(glampId, startDate, endDate, statusId);
      setGlampingData(prevData => ({
        ...prevData,
        roomItems: [...prevData.roomItems, ...data.roomItems],
      }));
      setIsExpanded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCollapseView = () => {
    setGlampingData(prevData => ({
      ...prevData,
      roomItems: initialRoomItems,
    }));
    setIsExpanded(false);
    scroll.scrollTo(roomSelectRef.current.offsetTop, {
      duration: 500,
      smooth: true,
    });
  };

  const handleReservationClick = () => {
    if (!isLogin) {
      setModalMessage(
        `로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?`,
      );
      setModalType("check");
      setShowLoginModal(true);
    } else {
      console.log("잉?", glampingData.glampName, roomItems.checkInTime);
      // 로그인된 경우 예약 페이지로 이동
      navigate("/payment", {
        state: {
          glampName: glampingData.glampName,
          checkInTime: roomItems.checkInTime,
          checkOutTime: roomItems.checkOutTime,
          roomNumPeople: roomItems.roomNumPeople,
          roomMaxPeople: roomItems.roomMaxPeople,
          roomName: roomItems.roomName,
          roomPrice: roomItems.roomPrice,
          roomMainImage: roomMainImage,
        },
      });
    }
  };

  const handleLoginConfirm = () => {
    // "예"를 선택한 경우 로그인 페이지로 이동
    navigate("/login");
    setShowLoginModal(false); // CheckModal을 닫음
  };

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

  if (!glampingData) return null;

  const {
    glampId,
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
  return (
    <GlampingDetailStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div
              className="main-img"
              style={{
                backgroundImage: `url(${roomMainImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
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

        <RoomSelect ref={roomSelectRef}>
          <UnderLine />
          <RoomSelectTitle>
            <h3>객실선택</h3>
          </RoomSelectTitle>
          <RoomSoldOutCard>
            <FaRegCalendar />
            <h5>선택한 날짜의 객실은 매진되었어요</h5>
            <p>검색창에서 날짜나 인원을 다시 설정해 보세요.</p>
          </RoomSoldOutCard>
          {roomItems.map((room, index) => (
            <RoomCard key={index}>
              <RoomCardLeft>
                <Link to={`/roomdetail`}>
                  {/* <Link to={`/roomdetail/${room.roomId}`}> */}
                  <div
                    className="roomcard-img"
                    style={{
                      backgroundImage: `url(${roomImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <Link
                      to={`/roomdetail`}
                      state={{ glampName: glampingData.glampName }}
                    >
                      <span>사진 더보기</span>
                    </Link>
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
                  {/* <Link
                    to={`/payment`}
                    state={{
                      glampName: glampingData.glampName,
                      checkInTime: room.checkInTime,
                      checkOutTime: room.checkOutTime,
                      roomNumPeople: room.roomNumPeople,
                      roomMaxPeople: room.roomMaxPeople,
                      roomName: room.roomName,
                      roomPrice: room.roomPrice,
                      roomMainImage: roomMainImage,
                    }}
                  > */}
                  <MainButton
                    label="객실 예약"
                    onClick={handleReservationClick}
                  />
                  {/* </Link> */}
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
            {isExpanded ? (
              <ActionButton label="접기" onClick={handleCollapseView} />
            ) : (
              <ActionButton label="모두 보기" onClick={handleMoreView} />
            )}
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
            </div>
            <UnderLine />
          </RoomLocation>
        </RoomInfo>
      </div>
      {showLoginModal && modalType === "check" && (
        <CheckModal
          isOpen={true}
          onClose={() => setShowLoginModal(false)}
          onConfirm={handleLoginConfirm}
          message={modalMessage}
        />
      )}
      {modalType === "alert" && (
        <AlertModal
          isOpen={true}
          onClose={() => setModalType("")}
          message={modalMessage}
        />
      )}
    </GlampingDetailStyle>
  );
};

export default GlampingDetail;

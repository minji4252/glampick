import { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa6";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AlertModal from "../components/common/AlertModal";
import { ActionButton, MainButton } from "../components/common/Button";
import GlampingDetailStyle, {
  InfoGroup,
  OptionItems,
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
import axios from "axios";

const GlampingDetail = ({ isLogin }) => {
  const [glampingData, setGlampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [roomMainImage, setRoomMainImage] = useState(null);
  const [roomImages, setRoomImages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialRoomItems, setInitialRoomItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // const { glampId } = useParams();
  const [searchParams] = useSearchParams();
  const inDate = searchParams.get("inDate");
  const outDate = searchParams.get("outDate");
  const people = searchParams.get("people");

  // 임시데이터(삭제예정)
  // const glamp_Id = 1;
  const statusId = 0;

  const roomSelectRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 글램핑디테일페이지 정보 불러오기
    const fetchData = async () => {
      try {
        const data = await fetchGlampingData(
          glampId,
          inDate,
          outDate,
          statusId,
        );
        setGlampingData(data);
        setInitialRoomItems(data.roomItems.slice(0, 5));
        setRoomMainImage(`${data.glampImage}`);
        const roomImageUrls = data.roomItems.map(room => `${room.pic}`);
        setRoomImages(roomImageUrls);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessTokenFromCookie = getCookie("access-Token");
        if (accessTokenFromCookie) {
          setAccessToken(accessTokenFromCookie);
        } else {
          console.log("쿠키에 access-Token 없음");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccessToken();
  }, []);

  // 로컬 스토리지에서 관심목록 상태 초기화
  useEffect(() => {
    if (isLogin) {
      const likedStatus = localStorage.getItem("likedStatus");
      if (likedStatus) {
        setIsLiked(JSON.parse(likedStatus));
      }
    } else {
      setIsLiked(false); // 로그인하지 않은 경우 빈 상태로 설정
    }
  }, [isLogin]);

  const toggleLike = async () => {
    if (!accessToken) {
      setModalMessage(
        `로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?`,
      );
      setModalType("check");
      setShowLoginModal(true);
      return;
    }
    try {
      const resultValue = await toggleLikeGlamping(glampId, accessToken);
      if (resultValue === 0) {
        setIsLiked(true);
        localStorage.setItem("likedStatus", true);
        setModalMessage("관심 글램핑장 목록에 추가되었습니다");
        setModalType("alert");
      } else if (resultValue === 1) {
        setIsLiked(false);
        localStorage.setItem("likedStatus", false);
        setModalMessage("관심 글램핑장 목록에서 삭제되었습니다");
        setModalType("alert");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoreView = async () => {
    const statusId = 1;

    try {
      // 3. 모두보기 클릭시 객실 정보 더 불러오기
      const data = await fetchMoreRooms(glampId, inDate, outDate, statusId);
      setGlampingData(prevData => ({
        ...prevData,
        roomItems: [...prevData.roomItems, ...data.roomItems],
      }));
      setIsExpanded(true);
      const roomImageUrls = data.roomItems.map(room => `${room.pic}`);
      setRoomImages(prevImages => [...prevImages, ...roomImageUrls]);
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

  const handleReservationClick = room => {
    if (!isLogin) {
      setModalMessage(
        `로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?`,
      );
      setModalType("check");
      setShowLoginModal(true);
    } else {
      navigate("/payment", {
        state: {
          glampName: glampingData.glampName,
          checkInTime: room.checkInTime,
          checkOutTime: room.checkOutTime,
          roomNumPeople: room.roomNumPeople,
          roomMaxPeople: room.roomMaxPeople,
          roomName: room.roomName,
          roomPrice: room.roomPrice,
          roomMainImage: roomMainImage,
        },
      });
    }
  };

  const handleLoginConfirm = () => {
    navigate("/login");
    setShowLoginModal(false);
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

  //별점 단위
  const formattedStarPoint = Number(starPointAvg).toFixed(1);

  const allRoomsSoldOut = roomItems.every(room => !room.reservationAvailable);

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
              <div className="review-score">{formattedStarPoint}</div>
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

          {allRoomsSoldOut ? (
            <RoomSoldOutCard>
              <FaRegCalendar />
              <h5>선택한 날짜의 객실은 매진되었어요</h5>
              <p>검색창에서 날짜나 인원을 다시 설정해 보세요.</p>
            </RoomSoldOutCard>
          ) : (
            roomItems.map((room, index) => (
              <RoomCard key={index}>
                <RoomCardLeft>
                  <Link
                    to={`/roomdetail`}
                    state={{ glampName: glampingData.glampName }}
                  >
                    {/* <Link to={`/roomdetail/${room.roomId}`}> */}
                    <div
                      className="roomcard-img"
                      style={{
                        backgroundImage: `url(${roomImages[index]})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <span>사진 더보기</span>
                    </div>
                  </Link>
                </RoomCardLeft>
                <RoomCardRight>
                  <span>{room.roomName}</span>
                  <RoomCardBooking>
                    <p>입실 {formatTime(room.checkInTime)}</p>
                    <p>퇴실 {formatTime(room.checkOutTime)}</p>

                    {room.reservationAvailable ? (
                      <>
                        <MainButton
                          label="객실 예약"
                          onClick={() => handleReservationClick(room)}
                        />
                        <span>
                          {Number(room.roomPrice).toLocaleString("ko-KR")}원
                        </span>
                      </>
                    ) : (
                      <div className="sold-out-style">
                        <ActionButton label="예약 마감" />
                        <span>
                          {Number(room.roomPrice).toLocaleString("ko-KR")}원
                        </span>
                      </div>
                    )}
                  </RoomCardBooking>
                  <div className="roomcard-txt">
                    <div className="txt-top">
                      <span>객실정보</span>
                      <p>
                        기준 {room.roomNumPeople}인 ~ 최대 {room.roomMaxPeople}
                        인 (유료)
                      </p>
                    </div>
                    <div>
                      <span>추가정보</span>
                      <p>{room.roomServices.join(", ")}</p>
                    </div>
                  </div>
                </RoomCardRight>
              </RoomCard>
            ))
          )}

          {roomItems.length >= 5 && (
            <div className="view-all">
              {isExpanded ? (
                <ActionButton label="접기" onClick={handleCollapseView} />
              ) : (
                <ActionButton label="모두 보기" onClick={handleMoreView} />
              )}
            </div>
          )}
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

// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
function getCookie(name) {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]*)`);
  return cookieValue ? cookieValue.pop() : "";
}

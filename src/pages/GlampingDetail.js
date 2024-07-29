/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchGlampingData, toggleLikeGlamping } from "../apis/glamping";
import AlertModal from "../components/common/AlertModal";
import { ActionButton, MainButton } from "../components/common/Button";
import CheckModal from "../components/common/CheckModal";
import emptyheart from "../images/icon/heart-empty.png";
import fillheart from "../images/icon/heart-fill.png";
import { FaLocationDot } from "react-icons/fa6";

import GlampingDetailStyle, {
  InfoGroup,
  OptionItems,
  ReviewSwiper,
  ReviewTitle,
  RoomAround,
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
import { getCookie } from "../utils/cookie";

const GlampingDetail = ({ isLogin }) => {
  const [glampingData, setGlampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [roomMainImage, setRoomMainImage] = useState(null);
  const [roomImages, setRoomImages] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [visibleRoomsCount, setVisibleRoomsCount] = useState(5);
  const roomSelectRef = useRef(null);
  const roomLocationRef = useRef(null);
  const mapElement = useRef(null);

  // 기본값 설정 함수
  const getDefaultDate = daysToAdd => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };

  const { glampId } = useParams();
  const [searchParams] = useSearchParams();

  // 날짜 값 설정, 값이 없으면 기본값 사용
  const inDate = searchParams.get("inDate") || getDefaultDate(0);
  const outDate = searchParams.get("outDate") || getDefaultDate(1);
  const people = searchParams.get("people") || 2;
  const navigate = useNavigate();

  // 1. 글램핑디테일페이지 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGlampingData(
          glampId,
          inDate,
          outDate,
          accessToken,
        );
        setGlampingData(data);
        setRoomMainImage(`${data.glampImage}`);
        const roomImageUrls = data.roomItems.map(room => `${room.pic}`);
        setRoomImages(roomImageUrls);
        setIsLiked(data.isFav === 1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [glampId, inDate, outDate, accessToken]);

  // 지도 초기화
  useEffect(() => {
    if (glampingData && mapElement.current) {
      naver.maps.Service.geocode(
        {
          address: glampingData.glampLocation,
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return console.log("error");
          }

          const result = response.v2.addresses[0];
          const latLng = new naver.maps.LatLng(result.y, result.x);

          const map = new naver.maps.Map(mapElement.current, {
            center: latLng,
            zoom: 10,
          });

          new naver.maps.Marker({
            position: latLng,
            map: map,
          });
        },
      );
    }
  }, [glampingData]);

  // 토큰정보 불러오기
  useEffect(() => {
    const fetchAccessToken = () => {
      try {
        const token = localStorage.getItem("accessToken");
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

  // 2. 관심목록 추가 취소 기능
  const toggleLike = async () => {
    if (!accessToken) {
      setModalMessage(
        `로그인이 필요한 서비스입니다. \n 로그인 페이지로 이동하시겠습니까?`,
      );
      setModalType("check");
      setShowLoginModal(true);
      return;
    }

    try {
      const resultValue = await toggleLikeGlamping(glampId, accessToken);
      if (resultValue === 0) {
        setIsLiked(true);
        setModalMessage("관심 글램핑장 목록에 추가되었습니다");
        setModalType("alert");
      } else if (resultValue === 1) {
        setIsLiked(false);
        setModalMessage("관심 글램핑장 목록에서 삭제되었습니다");
        setModalType("alert");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservationClick = room => {
    if (!isLogin) {
      setModalMessage(
        `로그인이 필요한 서비스입니다. \n 로그인 페이지로 이동하시겠습니까?`,
      );
      setModalType("check");
      setShowLoginModal(true);
    } else {
      navigate(
        `/payment/${glampId}?roomId=${room.roomId}&inDate=${inDate}&outDate=${outDate}&people=${people}`,
        {
          state: {
            glampName: glampingData.glampName,
            checkInTime: room.checkInTime,
            checkOutTime: room.checkOutTime,
            roomName: room.roomName,
            roomMainImage: roomMainImage,
          },
        },
      );
    }
  };

  const handleRoomAroundClick = () => {
    roomLocationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoginConfirm = () => {
    navigate("/login");
    setShowLoginModal(false);
  };

  const formatTime = time => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const getTheme = theme => {
    switch (theme) {
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
      case "개별 화장실":
        return "option-toilet";
      default:
        return "";
    }
  };

  if (!glampingData) return null;

  const {
    glampName,
    starPointAvg,
    glampLocation,
    glampIntro,
    infoBasic,
    traffic,
    infoNotice,
    countReviewUsers,
    reviewItems,
    roomItems,
  } = glampingData;

  //별점 단위
  const formattedStarPoint = Number(starPointAvg).toFixed(1);

  //위치 첫줄
  const trafficFirstLine = traffic.split("\n")[0];

  const LinkToReview = () => {
    navigate(`/review/${glampId}`, {
      state: {
        starPoint: formattedStarPoint,
        glampName: glampName,
        countReview: countReviewUsers,
      },
    });
  };

  // 더보기
  const showMoreRooms = () => {
    setVisibleRoomsCount(prevCount => prevCount + 5);
  };

  // 접기
  const showLessRooms = () => {
    setVisibleRoomsCount(5);
    const scrollPosition =
      roomSelectRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  // 모든 객실 품절
  const isAllSoldOut = roomItems.every(room => !room.reservationAvailable);

  return (
    <GlampingDetailStyle>
      <div className="inner">
        <RoomProperty>
          <RoomPic>
            <div
              className="main-img"
              style={{
                // eslint-disable-next-line no-undef
                backgroundImage: `url(${process.env.PUBLIC_URL}${roomMainImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </RoomPic>
          <RoomTitle>
            <span>{glampName}</span>
            <button onClick={toggleLike}>
              {isLiked ? (
                <div style={{ backgroundImage: `url(${fillheart})` }} />
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${emptyheart})`,
                  }}
                />
              )}
            </button>
          </RoomTitle>
          <RoomAround onClick={handleRoomAroundClick}>
            <FaLocationDot />
            {trafficFirstLine}거리
            <IoIosArrowForward />
          </RoomAround>
          <RoomReview>
            <ReviewTitle>
              <FaStar />
              <div className="review-score">{formattedStarPoint}</div>
              <div className="review-evaluat">{countReviewUsers}명 평가</div>
              {/* <button onClick={() => LinkToReview()}>리뷰보기</button> */}
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
                      <h2>{item.content}</h2>
                      <h5>{item.userNickName}</h5>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              <SwiperEndStyle />
              <div className="review-all">
                <button onClick={() => LinkToReview()}>
                  전체보기
                  <IoIosArrowForward />
                </button>
              </div>
            </ReviewSwiper>
          </RoomReview>
          <RoomOption>
            <UnderLine />
            <h3 className="option-title">객실옵션</h3>
            <OptionItems>
              <div className="option-item">
                {glampingData.roomService.map((service, index) => (
                  <div key={index} className={getTheme(service)} />
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

          {isAllSoldOut ? (
            <RoomSoldOutCard>
              <FaRegCalendar />
              <span>
                {inDate} - {outDate}
              </span>
              <h5>선택한 날짜의 객실은 매진되었어요</h5>
              <p>검색창에서 날짜나 인원을 다시 설정해 보세요.</p>
            </RoomSoldOutCard>
          ) : (
            roomItems.slice(0, visibleRoomsCount).map((room, index) => (
              <RoomCard key={index}>
                <RoomCardLeft>
                  <Link
                    to={`/roomdetail/${glampId}`}
                    state={{ glampName: glampingData.glampName }}
                  >
                    <div
                      className="roomcard-img"
                      style={{
                        // eslint-disable-next-line no-undef
                        backgroundImage: `url(${process.env.PUBLIC_URL}${roomImages[index]})`,
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

          <div className="view-all">
            {visibleRoomsCount < roomItems.length ? (
              <div className="show-more">
                <ActionButton label="더보기" onClick={showMoreRooms} />
              </div>
            ) : (
              roomItems.length > 5 && (
                <div className="show-less">
                  <ActionButton label="접기" onClick={showLessRooms} />
                </div>
              )
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
                <h4> {infoBasic}</h4>
              </div>
              <div className="info-item">
                <span>유의사항</span>
                <h4>{infoNotice}</h4>
              </div>
            </InfoGroup>
          </RoomInfomation>
          <RoomLocation ref={roomLocationRef}>
            <UnderLine />
            <h3>위치</h3>
            <div className="location-map" ref={mapElement} />
            <div className="location-info">
              <span>{glampLocation}</span>
              <div>
                <h4>{traffic}</h4>
              </div>
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

import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaLocationDot, FaRegCalendar } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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

import { useRecoilState } from "recoil";
import { accessTokenState } from "../atoms/loginState";
import Loading from "../components/common/Loading";
import SearchCalendar from "../components/search/SearchCalendar";
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
  StickyOptionStyle,
  SwiperEndStyle,
  UnderLine,
} from "../styles/GlampingDetailStyle";

const GlampingDetail = ({ isLogin, isCeoLogin }) => {
  const [glampingData, setGlampingData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [roomMainImage, setRoomMainImage] = useState(null);
  const [roomImages, setRoomImages] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [visibleRoomsCount, setVisibleRoomsCount] = useState(5);
  const roomSelectRef = useRef(null);
  const roomLocationRef = useRef(null);
  const mapElement = useRef(null);

  const { glampId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // 기본값 설정 함수
  const getDefaultDate = daysToAdd => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };

  // 날짜 값 설정, 값이 없으면 기본값 사용
  const inDate = searchParams.get("inDate") || getDefaultDate(0);
  const outDate = searchParams.get("outDate") || getDefaultDate(1);
  const people = searchParams.get("people") || 2;
  const navigate = useNavigate();

  // 리모컨 변수
  const [selectedDate, setSelectedDate] = useState([inDate, outDate]);

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

        // 사장님이 탈퇴한 경우 페이지가 보이지 않도록 처리
        if (data.activateStatus === 0 || data.activateStatus === -1) {
          navigate("/404");
          return;
        }
        setGlampingData(data);
        setRoomMainImage(`${data.glampImage}`);
        const roomImageUrls = data.roomItems.map(room => `${room.pic}`);
        setRoomImages(roomImageUrls);
        setIsLiked(data.isFav === 1);
        setIsDataLoaded(true);

        const savedScrollPosition = sessionStorage.getItem("scrollPosition");
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }, 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [glampId, inDate, outDate, accessToken]);

  // 네이버 지도 초기화
  // useEffect(() => {
  //   if (glampingData && mapElement.current) {
  //     // eslint-disable-next-line no-undef
  //     naver.maps.Service.geocode(
  //       {
  //         address: glampingData.glampLocation,
  //       },
  //       function (status, response) {
  //         // eslint-disable-next-line no-undef
  //         if (status !== naver.maps.Service.Status.OK) {
  //           return console.log("error");
  //         }

  //         const result = response.v2.addresses[0];
  //         // eslint-disable-next-line no-undef
  //         const latLng = new naver.maps.LatLng(result.y, result.x);

  //         // eslint-disable-next-line no-undef
  //         const map = new naver.maps.Map(mapElement.current, {
  //           center: latLng,
  //           zoom: 10,
  //         });

  //         // eslint-disable-next-line no-undef
  //         new naver.maps.Marker({
  //           position: latLng,
  //           map: map,
  //         });
  //       },
  //     );
  //   }
  // }, [glampingData]);

  // 카카오지도 초기화
  useEffect(() => {
    if (glampingData && mapElement.current) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=26916ed03c17b9a581f507ef46581291&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const { kakao } = window;
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(
            glampingData.glampLocation,
            (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const { x, y } = result[0];
                const latLng = new kakao.maps.LatLng(y, x);

                const map = new kakao.maps.Map(mapElement.current, {
                  center: latLng,
                  level: 3,
                });
                new kakao.maps.Marker({
                  position: latLng,
                  map: map,
                });
              } else {
                console.error("주소 검색 실패", status);
              }
            },
          );
        });
      };
      document.head.appendChild(script);
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
            roomPrice: room.roomPrice,
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

  if (!isDataLoaded) {
    return <Loading />;
  }

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
    const scrollPosition =
      roomSelectRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
    setVisibleRoomsCount(5);
  };

  // 모든 객실 품절
  const isAllSoldOut = roomItems.every(room => !room.reservationAvailable);

  // 주소 복사 기능
  const handleCopyLocation = () => {
    navigator.clipboard.writeText(glampLocation).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handelClickDetail = (path, state) => {
    // console.log("scrollY : ", window.scrollY);
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(path, { state });
  };
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
            {!isCeoLogin && (
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
            )}
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
                  <div
                  // to={`/roomdetail/${glampId}`}
                  // state={{ glampName: glampingData.glampName }}
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
                      onClick={() =>
                        handelClickDetail(`/roomdetail/${glampId}`, {
                          glampName: glampingData.glampName,
                        })
                      }
                    >
                      <span>사진 더보기</span>
                    </div>
                  </div>
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
                          <em>/1박</em>
                        </span>
                      </>
                    ) : (
                      <div className="sold-out-style">
                        <ActionButton label="예약 마감" />
                        <span>
                          {Number(room.roomPrice).toLocaleString("ko-KR")}원
                          <em>/1박</em>
                        </span>
                      </div>
                    )}
                  </RoomCardBooking>
                  <div className="roomcard-txt">
                    <div className="txt-top">
                      <span>객실정보</span>
                      <p>
                        기준 {room.roomNumPeople}인 ~ 최대 {room.roomMaxPeople}
                        {/* 임시 */}인 (유료), 1인당 추가 요금 10000원
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
                <span>[기본정보]</span>
                <h4> {infoBasic}</h4>
              </div>
              <div className="info-item info-notice">
                <span>[유의사항]</span>
                <h4>{infoNotice}</h4>
              </div>
            </InfoGroup>
          </RoomInfomation>
          <RoomLocation ref={roomLocationRef}>
            <UnderLine />
            <h3>위치</h3>
            <div className="location-map" ref={mapElement} />
            <div className="location-info">
              <span>
                {glampLocation}
                <TbCopy onClick={handleCopyLocation} />
                {copySuccess && <span>복사완료!</span>}
              </span>
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
      <StickyOptionStyle>
        <div className="sticky-date">
          <label htmlFor="date">날짜</label>
          <SearchCalendar
            selectedDate={selectedDate}
            setSelectedDate={dates => {
              setSelectedDate(dates);
              setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                inDate: formatDate(new Date(dates[0])),
                outDate: formatDate(new Date(dates[1])),
              });
            }}
            minDate={new Date()}
          />
        </div>
        <div className="sticky-people">
          <label htmlFor="member">인원</label>
          <div className="search-member">
            <input
              type="number"
              min="2"
              max="6"
              value={people}
              onChange={e => {
                setSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  people: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <FcCalendar />
      </StickyOptionStyle>
    </GlampingDetailStyle>
  );
};

export default GlampingDetail;

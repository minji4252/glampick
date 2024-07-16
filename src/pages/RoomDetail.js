import React, { useState, useRef, useEffect } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/detailswiper.css";
import { IoIosArrowDown } from "react-icons/io";
import {
  WrapStyle,
  TitleStyle,
  ListStyle,
  ListButton,
  LargeSwiper,
  SmallSwiper,
} from "../styles/RoomDetailStyle";
import { fetchRoomImages } from "../apis/glamping";
import { useLocation, useNavigate } from "react-router-dom";

const RoomDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClick, setClick] = useState(false);
  const largeSwiperRef = useRef(null);
  const smallSwiperRef = useRef(null);
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const glampName = location.state.glampName;

  useEffect(() => {
    const getRoomImages = async () => {
      try {
        // 임시
        const glampId = 1;
        const data = await fetchRoomImages(glampId);
        setRoomData(data.moreRoomImages);
      } catch (error) {
        console.log(error);
      }
    };

    getRoomImages();
  }, []);

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  const syncSwipers = swiper => {
    if (swiper === largeSwiperRef.current && smallSwiperRef.current) {
      smallSwiperRef.current.slideTo(swiper.activeIndex);
    } else if (swiper === smallSwiperRef.current && largeSwiperRef.current) {
      largeSwiperRef.current.slideTo(swiper.activeIndex);
    }
  };

  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <WrapStyle>
      <div className="inner">
        <TitleStyle>
          <button onClick={onClickBtn}>
            <MdOutlineArrowBackIos />
          </button>
          <h1>{glampName}</h1>
        </TitleStyle>
        <ListStyle>
          <ul style={{ flexWrap: isClick ? "wrap" : "nowrap" }}>
            {Object.keys(roomData).map((roomName, index) => (
              <li
                key={index}
                className={currentTab === index ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {roomName}
              </li>
            ))}
          </ul>
          <ListButton onClick={() => setClick(e => !e)}>
            <span className={isClick ? "moreview moreclick" : "moreview"}>
              <IoIosArrowDown />
            </span>
          </ListButton>
        </ListStyle>
        <LargeSwiper>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            onSwiper={swiper => (largeSwiperRef.current = swiper)}
            onSlideChange={swiper => syncSwipers(swiper)}
          >
            {roomData[Object.keys(roomData)[currentTab]]?.map(
              (image, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      // 임시
                      backgroundImage: `url(pic/glamping/1/room/1/${image})`,
                      // background: `url(glamping/${glampId}/room/${roomId}/${image}) no-repeat center center`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      width: "70%",
                      height: "550px",
                    }}
                  ></div>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </LargeSwiper>
        <SmallSwiper>
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={70}
            pagination={{ type: "fraction" }}
            navigation={true}
            virtual
            onSwiper={swiper => (smallSwiperRef.current = swiper)}
            onSlideChange={swiper => syncSwipers(swiper)}
          >
            {roomData[Object.keys(roomData)[currentTab]]?.map(
              (image, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <div
                    style={{
                      backgroundImage: `url(pic/glamping/1/room/1/${image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </SmallSwiper>
      </div>
    </WrapStyle>
  );
};

export default RoomDetail;

import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { colorSystem } from "../styles/color";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/detailswiper.css";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";

const RoomDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClick, setClick] = useState(false);
  const [roomData, setRoomData] = useState({});
  const largeSwiperRef = useRef(null);
  const smallSwiperRef = useRef(null);

  const fetchRoomImages = async () => {
    try {
      const response = await axios.get(
        "/api/glamping/info/moreRoomImages?glampId=1",
      );
      if (response.data.code === "SU") {
        return response.data.moreRoomImages;
      } else {
        throw new Error("API 응답 오류");
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      return {};
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    const loadRoomImages = async () => {
      const data = await fetchRoomImages();
      setRoomData(data);
      if (Object.keys(data).length > 0) {
        setCurrentTab(0);
        setSlides(data[Object.keys(data)[0]]);
      }
    };

    loadRoomImages();
  }, []);

  const setSlides = images => {
    return images.map((image, index) => (
      <img
        key={index}
        src={`/path/to/images/${image}`}
        alt={`Room ${index + 1}`}
      />
    ));
  };

  const selectMenuHandler = index => {
    const roomNames = Object.keys(roomData);
    const selectedRoom = roomNames[index];
    setCurrentTab(index);
    setSlides(roomData[selectedRoom]);
  };

  const syncSwipers = swiper => {
    if (swiper === largeSwiperRef.current && smallSwiperRef.current) {
      smallSwiperRef.current.slideTo(swiper.activeIndex);
    } else if (swiper === smallSwiperRef.current && largeSwiperRef.current) {
      largeSwiperRef.current.slideTo(swiper.activeIndex);
    }
  };

  const WrapStyle = styled.div`
    .inner {
      flex-direction: column;
    }
    margin-bottom: 50px;
  `;

  const TitleStyle = styled.div`
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    svg {
      position: absolute;
      left: 0;
      font-size: 1.2rem;
      color: ${colorSystem.g900};
      cursor: pointer;
    }
    h1 {
      font-size: 1.2rem;
      font-weight: 700;
      color: ${colorSystem.g800};
    }
  `;

  const ListStyle = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;

    ul {
      display: flex;
      width: 100%;
      gap: 6px 8px;
      margin-bottom: 20px;
      justify-content: flex-start;
      overflow-x: auto;
      overscroll-behavior: none;
      flex-wrap: nowrap;

      ::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    li {
      border: 1px solid ${colorSystem.g200};
      font-weight: 600;
      color: ${colorSystem.g900};
      font-size: 0.9rem;
      list-style: none;
      padding: 8px 20px;
      border-radius: 100px;
      cursor: pointer;
      flex: 0 0 auto;
      max-width: 210px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .focused {
      background-color: ${colorSystem.primary};
      color: ${colorSystem.white};
    }
  `;

  const ListButton = styled.div`
    max-height: 32px;
    min-height: 32px;
    min-width: 32px;
    max-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    cursor: pointer;
    background-color: ${colorSystem.white};
    border-radius: 999px;
    border-width: 2px;
    border: 1px solid ${colorSystem.g200};

    &::before {
      width: 20px;
      min-height: 32px;
      content: "";
      position: absolute;
      left: -21px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0.43%,
        rgb(255, 255, 255) 100%
      );
    }

    svg {
      font-size: 1.2rem;
      color: ${colorSystem.p500};
      padding-top: 2px;
    }

    .moreview {
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
    }

    .moreclick {
      transform: rotate(180deg);
      transition: transform 0.3s ease-in-out;
    }
  `;

  const LargeSwiper = styled.div`
    width: 100%;
    max-height: 550px;
    height: 100%;

    .swiper {
      max-height: 550px;
      width: 100%;
      height: 100%;
    }

    .swiper-slide img {
      width: 70%;
    }

    .swiper-slide-prev {
      width: 100%;
      height: 100%;
      background-color: ${colorSystem.background};
    }
    .swiper-slide-active {
      width: 100%;
      height: 100%;
      background-color: ${colorSystem.background};
    }

    .swiper-slide-next {
      width: 100%;
      height: 100%;
      background-color: ${colorSystem.background};
    }

    .swiper-wrapper {
      position: relative;
      overflow: visible;
    }

    .swiper-button-prev {
      position: absolute;
      left: 6%;
    }

    .swiper-button-next {
      position: absolute;
      right: 6%;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      color: ${colorSystem.p300};
      font-size: 30px;
      font-weight: 800;
    }
  `;

  const SmallSwiper = styled.div`
    height: 180px;
    margin-bottom: 20px;
    .swiper {
      width: 100%;
      height: 100%;
      max-width: 320px;
    }

    .swiper-wrapper {
      display: flex;
      align-items: center;
    }

    .swiper-slide img {
      max-width: 85px;
    }

    .swiper-slide-prev img {
      border-radius: 12px;
      width: 60px;
      height: 60px;
    }

    .swiper-slide-active img {
      border-radius: 12px;
      width: 85px;
      height: 85px;
      border: 4px solid ${colorSystem.p500};
    }

    .swiper-slide-next img {
      border-radius: 12px;
      width: 60px;
      height: 60px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      color: ${colorSystem.p300};
      font-size: 20px;
      font-weight: 800;
      display: none;
    }

    .swiper-button-prev {
      width: 60px;
      height: 60px;
      left: 0;
      top: 82px;
      border-radius: 12px;
    }

    .swiper-button-next {
      width: 60px;
      height: 60px;
      right: 0;
      top: 82px;
      border-radius: 12px;
    }

    .swiper-pagination {
      color: ${colorSystem.primary};
      font-weight: 600;
    }
  `;

  return (
    <WrapStyle>
      <div className="inner">
        <TitleStyle>
          <MdOutlineArrowBackIos />
          <h1>뉴욕스카이</h1>
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
          <ListButton
            onClick={() => {
              setClick(e => !e);
            }}
          >
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
            {roomData[Object.keys(roomData)[currentTab]] &&
              roomData[Object.keys(roomData)[currentTab]].map(
                (image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`/path/to/images/${image}`}
                      alt={`Room ${index + 1}`}
                    />
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
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            virtual
            onSwiper={swiper => (smallSwiperRef.current = swiper)}
            onSlideChange={swiper => syncSwipers(swiper)}
          >
            {roomData[Object.keys(roomData)[currentTab]] &&
              roomData[Object.keys(roomData)[currentTab]].map(
                (image, index) => (
                  <SwiperSlide key={index} virtualIndex={index}>
                    <img
                      src={`/path/to/images/${image}`}
                      alt={`Room ${index + 1}`}
                    />
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

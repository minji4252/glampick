import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { colorSystem } from "../styles/color";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/detailswiper.css";

import room1 from "../images/room1.jpg";
import room2 from "../images/room2.jpg";
import room3 from "../images/room3.jpg";
import room4 from "../images/room4.jpg";
import room5 from "../images/room5.jpg";
import room6 from "../images/room6.jpg";
import room7 from "../images/room7.jpg";
import room8 from "../images/room8.jpg";
import room9 from "../images/room9.jpg";
import room10 from "../images/room10.jpg";
import room11 from "../images/room11.jpg";
import room12 from "../images/room12.jpg";
import room13 from "../images/room13.jpg";
import room14 from "../images/room14.jpg";
import room15 from "../images/room15.jpg";
import room16 from "../images/room16.jpg";
import room17 from "../images/room17.jpg";
import room18 from "../images/room18.jpg";
import room19 from "../images/room19.jpg";
import room20 from "../images/room20.jpg";
import { IoIosArrowDown } from "react-icons/io";

const RoomDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClick, setClick] = useState(false);
  const largeSwiperRef = useRef(null);
  const smallSwiperRef = useRef(null);

  const menuArr = [
    {
      name: "오픈특가",
      images: [room1, room2, room3, room4, room5, room6],
    },
    {
      name: "센트럴파크 룸 (에어컨, 냉장고)",
      images: [room7, room8, room9, room10, room11, room12],
    },
    {
      name: "엠파이어 룸 (에어컨, 캠프파이어)",
      images: [room13, room14, room15, room16, room17, room18],
    },
    {
      name: "메트로폴리탄 룸 (에어컨, 냉장고)",
      images: [room19, room20, room1, room2, room3, room4],
    },
    {
      name: "오픈특가(바베큐 제공, 에어컨)",
      images: [room5, room6, room7, room8, room9, room10],
    },
    {
      name: "센트럴파크 룸 (에어컨, 냉장고)",
      images: [room11, room12, room13, room14, room15, room16],
    },
    {
      name: "엠파이어 룸 (에어컨, 캠프파이어)",
      images: [room17, room18, room19, room20, room1, room2],
    },
    {
      name: "메트로폴리탄 룸 (에어컨, 냉장고)",
      images: [room3, room4, room5, room6, room7, room8],
    },
  ];

  const [slides, setSlides] = useState(
    menuArr[0].images.map((image, index) => (
      <img key={index} src={image} alt={`Room ${index + 1}`} />
    )),
  );

  const selectMenuHandler = index => {
    setCurrentTab(index);
    setSlides(
      menuArr[index].images.map((image, i) => (
        <img key={index} src={image} alt={`Room ${i + 1}`} />
      )),
    );
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
            {menuArr.map((ele, index) => (
              <li
                key={index}
                className={currentTab === index ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {ele.name}
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
            {slides.map((slideContent, index) => (
              <SwiperSlide key={index}>{slideContent}</SwiperSlide>
            ))}
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
            {slides.map((slideContent, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                {slideContent}
              </SwiperSlide>
            ))}
          </Swiper>
        </SmallSwiper>
      </div>
    </WrapStyle>
  );
};

export default RoomDetail;

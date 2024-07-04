/* eslint-disable react/jsx-key */

import styled from "@emotion/styled";
import { colorSystem } from "../styles/color";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/swiper.css";
import room1 from "../images/Rectangle 90.png";
import room2 from "../images/Rectangle 91.png";
import room3 from "../images/Rectangle 92.png";
import room4 from "../images/Rectangle 93.png";
import room5 from "../images/Rectangle 94.png";
import room6 from "../images/Rectangle 95.png";
import { useState } from "react";

const RoomDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "오픈특가(바베큐 제공, 에어컨...)", content: "오픈특가 룸" },
    { name: "센트럴파크 룸 (에어컨, 냉장고...)", content: "센트럴파크 룸" },
    { name: "엠파이어 룸 (에어컨, 캠프파이...)", content: "엠파이어 룸" },
    { name: "메트로폴리탄 룸 (에어컨, 냉장...)", content: "메트로폴리탄 룸" },
  ];

  const [slides, setSlides] = useState([
    <img src={room1} alt="Room 1" />,
    <img src={room2} alt="Room 2" />,
    <img src={room3} alt="Room 3" />,
    <img src={room4} alt="Room 4" />,
    <img src={room5} alt="Room 5" />,
    <img src={room6} alt="Room 6" />,
  ]);

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  const WrapStyle = styled.div`
    .inner {
      flex-direction: column;
    }

    margin-bottom: 50px;
  `;

  const TitleStyle = styled.div`
    margin-top: 20px;
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
      color: ${colorSystem.g900};
    }
  `;

  const ListStyle = styled.div`
    width: 100%;

    > div {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      justify-content: flex-start;
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
    }

    .focused {
      background-color: ${colorSystem.primary};
      color: ${colorSystem.white};
    }
  `;

  const LargeSwiper = styled.div`
    width: 100%;
    height: 660px;
    background-color: ${colorSystem.background};

    .swiper {
      max-width: 70% !important;
      max-height: 100% !important;
      height: 100% !important;
      margin: 0 auto !important;
    }

    .swiper-slide-prev {
      width: 100% !important;
      height: 100% !important;
    }
    .swiper-slide-active {
      width: 100% !important;
      height: 100% !important;
    }

    .swiper-slide-next {
      width: 100% !important;
      height: 100% !important;
    }

    .swiper-wrapper {
      position: relative;
      overflow: visible !important;
    }

    .swiper-button-next {
      position: absolute;
      /* right: -50px; */
      /* background-color: pink; */
      /* right: -20px; */
      /* z-index: 99999; */
    }

    .swiper-button-prev::after {
      color: yellow;
      font-size: 50px;
    }

    .swiper-button-next::after {
      color: yellow;
      font-size: 50px;
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
          <div>
            {menuArr.map((ele, index) => {
              return (
                <li
                  key={index}
                  className={
                    currentTab === index ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectMenuHandler(index)}
                >
                  {ele.name}
                </li>
              );
            })}
          </div>
        </ListStyle>
        <LargeSwiper>
          <h1>{menuArr[currentTab].content}</h1>

          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {slides.map((slideContent, index) => (
              <SwiperSlide key={index}>{slideContent}</SwiperSlide>
            ))}
          </Swiper>
        </LargeSwiper>
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
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </WrapStyle>
  );
};

export default RoomDetail;

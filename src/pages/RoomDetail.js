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
import { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

const RoomDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClick, setClick] = useState(false);
  const largeSwiperRef = useRef(null);
  const smallSwiperRef = useRef(null);

  const menuArr = [
    { name: "오픈특가", content: "오픈특가 룸" },
    { name: "센트럴파크 룸 (에어컨, 냉장고)", content: "센트럴파크 룸" },
    { name: "엠파이어 룸 (에어컨, 캠프파이어)", content: "엠파이어 룸" },
    { name: "메트로폴리탄 룸 (에어컨, 냉장고)", content: "메트로폴리탄 룸" },
    { name: "오픈특가(바베큐 제공, 에어컨)", content: "오픈특가 룸" },
    { name: "센트럴파크 룸 (에어컨, 냉장고)", content: "센트럴파크 룸" },
    { name: "엠파이어 룸 (에어컨, 캠프파이어)", content: "엠파이어 룸" },
    { name: "메트로폴리탄 룸 (에어컨, 냉장고)", content: "메트로폴리탄 룸" },
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
    max-width: 600px;
    /* 임시 */
    height: 180px;
    margin-bottom: 20px;
    .swiper {
      width: 100%;
      height: 100%;
      max-width: 700px;
    }

    .swiper-wrapper {
      display: flex;
      align-items: center;
    }

    .swiper-slide img {
      max-width: 85px;
    }

    .swiper-slide-prev img {
      width: 60px;
      height: 60px;
    }

    .swiper-slide-active img {
      width: 85px;
      height: 85px;
    }

    .swiper-slide-next img {
      width: 60px;
      height: 60px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      color: ${colorSystem.p300};
      font-size: 20px;
      font-weight: 800;
    }

    .swiper-pagination {
      color: ${colorSystem.primary};
      font-weight: 600;
      /* font-size: 1rem; */
    }
  `;

  return (
    <WrapStyle>
      <div className="inner">
        <h1>{menuArr[currentTab].content}</h1>
        <TitleStyle>
          <MdOutlineArrowBackIos />
          <h1>뉴욕스카이</h1>
        </TitleStyle>
        <ListStyle>
          <ul style={{ flexWrap: isClick ? "wrap" : "nowrap" }}>
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

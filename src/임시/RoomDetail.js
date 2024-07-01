/* eslint-disable react/jsx-key */
import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiper.css";
import room1 from "../images/Rectangle 90.png";
import room2 from "../images/Rectangle 91.png";
import room3 from "../images/Rectangle 92.png";
import room4 from "../images/Rectangle 93.png";
import room5 from "../images/Rectangle 94.png";
import room6 from "../images/Rectangle 95.png";

export default function App() {
  const [slides, setSlides] = useState([
    <img src={room1} alt="Room 1" />,
    <img src={room2} alt="Room 2" />,
    <img src={room3} alt="Room 3" />,
    <img src={room4} alt="Room 4" />,
    <img src={room5} alt="Room 5" />,
    <img src={room6} alt="Room 6" />,
  ]);

  return (
    <>
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
    </>
  );
}

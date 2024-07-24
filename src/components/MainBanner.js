import styled from "@emotion/styled";
import React from "react";
import "../styles/mainbanner.css";
import SwiperImg from "../images/pic.jpg";
import SwiperImg2 from "../images/review2.png";
import SwiperImg3 from "../images/review3.png";
import SwiperImg4 from "../images/Rectangle 90.png";
import SwiperImg5 from "../images/Rectangle 95.png";

const MainBanner = () => {
  return (
    <div>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src={SwiperImg} className="swiper-img" />
          </div>
          <div className="swiper-slide">
            <img src={SwiperImg2} className="swiper-img" />
          </div>
          <div className="swiper-slide">
            <img src={SwiperImg3} className="swiper-img" />
          </div>
          <div className="swiper-slide">
            <img src={SwiperImg4} className="swiper-img" />
          </div>
          <div className="swiper-slide">
            <img src={SwiperImg5} className="swiper-img" />
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </div>

      {/* Swiper JS */}
      {/* <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script> */}

      {/* <script>
    var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  </script> */}
    </div>
  );
};

export default MainBanner;

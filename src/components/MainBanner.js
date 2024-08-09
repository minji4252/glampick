import React, { useEffect, useState } from "react";
import "../styles/mainbanner.css";
import axios from "axios";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SERVER_URL } from "../apis/config";

const MainBanner = () => {
  const [banners, setBanners] = useState([]);

  // 배너 리스트 가져오기
  useEffect(() => {
    const getBanners = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/main/banner`);
        // const response = await axios.get("/api/main/banner");
        setBanners(response.data.list);
      } catch (error) {
        console.error("배너 데이터 겟 오류:", error);
      }
    };
    getBanners();
  }, []);

  return (
    <div className="main-banner">
      {banners.length > 0 && (
        <Swiper
          modules={[Autoplay, Navigation]}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {banners.map(banner => (
            <SwiperSlide key={banner.bannerId}>
              <img
                // src={banner.bannerUrl}
                src={`${SERVER_URL}${banner.bannerUrl}`}
                className="swiper-img"
                alt={`ㅂㅐ너 ${banner.bannerId}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MainBanner;

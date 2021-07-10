import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import "./style.css";
import { Image } from "antd";
import "antd/dist/antd.css";
// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import { useSelector } from "react-redux";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

export default function SliderDetail() {
  let dataRoomCurrent = useSelector((state) => state.room.roomsDetail);
  let src = dataRoomCurrent.image || [];

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        className="mySwiper"
      >
        {src.map((item) => (
          <SwiperSlide>
            <Image src={item} alt="slider" />
          </SwiperSlide>
        ))}
        {src.map((item) => (
          <SwiperSlide>
            <Image src={item} alt="slider" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

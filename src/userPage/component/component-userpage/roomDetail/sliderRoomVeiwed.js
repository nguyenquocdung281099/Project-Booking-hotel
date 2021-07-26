import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { KEY_ROOM_VEIWED } from "../../../const/const";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

export default function SliderRoomVeiwed() {
  const data = JSON.parse(sessionStorage.getItem(KEY_ROOM_VEIWED)) || [];

  return (
    <div className=" slider ">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {data.length !== 0 &&
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className=" mr-2 pr-2 veiwed-slide-item">
                <img src={item.image[0]} alt="slider item" />
                <div className="veiwed-slide-name">
                  <h2>
                    <Link to={`/detailRooms/${item.id}`}>
                      Room name :{item.name}
                    </Link>
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

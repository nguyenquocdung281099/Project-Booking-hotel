import Slider from "react-slick";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { KEY_ROOM_VEIWED } from "../../../const/const";

export default function SliderRoomVeiwed() {
  const settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  const data = JSON.parse(sessionStorage.getItem(KEY_ROOM_VEIWED)) || [];

  return (
    <div className=" slider ">
      <Slider {...settings}>
        {data.length !== 0 &&
          data.map((item) => (
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
          ))}
      </Slider>
    </div>
  );
}

import Slider from "react-slick";
import "./stylecomponent.css";
export default function MultipleItemsSlider() {
  const settings = {
    speed: 500,
    slidesToShow: 4,
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
          // centerMode: true,
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

  let src = [
    "https://live.staticflickr.com/65535/51278968114_0f9ddbb8dc_b.jpg",
    "https://live.staticflickr.com/65535/51277498752_80c27b8c90_b.jpg",
    "https://live.staticflickr.com/65535/51277498762_d09554531c_b.jpg",
    "https://live.staticflickr.com/65535/51278968114_0f9ddbb8dc_b.jpg",
    "https://live.staticflickr.com/65535/51277498752_80c27b8c90_b.jpg",
    "https://live.staticflickr.com/65535/51277498762_d09554531c_b.jpg",
    "https://live.staticflickr.com/65535/51278968114_0f9ddbb8dc_b.jpg",
    "https://live.staticflickr.com/65535/51277498752_80c27b8c90_b.jpg",
    "https://live.staticflickr.com/65535/51277498762_d09554531c_b.jpg",
  ];
  let data = src.map((item, index) => <SliderItem url={item} key={index} />);
  return (
    <div className=" slider ">
      <Slider {...settings}>{data}</Slider>
    </div>
  );
}

function SliderItem(props) {
  return (
    <div className="slider_item mr-2">
      <img src={props.url} alt="slider item" className="mr-2" />
    </div>
  );
}

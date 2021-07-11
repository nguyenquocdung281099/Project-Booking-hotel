import "./style.css";
import { Link } from "react-router-dom";
import { Image } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getroom, setLoading } from "../../../../redux/action";
import AOS from "aos";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { KEY_ROOM_BOOKING } from "../../../const/const";
AOS.init({
  duration: 1200,
});
export default function CardRoomsList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.room);
  console.log("data", data);
  const filter = data.filter;
  const type = data.type;
  const pagi =
    Object.keys(data.pagi).length === 0
      ? {
          _page: 1,
          _limit: 5,
          _totalRows: 20,
        }
      : data.pagi;
  useEffect(() => {
    dispatch(getroom({ _page: pagi._page, _limit: pagi._limit }));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(getroom({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    dispatch(setLoading(true));
  }, [filter, dispatch, pagi._page, pagi._limit]);

  function handleChangePagi(page, pagesize) {
    dispatch(getroom({ ...filter, _page: page, _limit: pagi._limit }));
    window.screenY = 0;
  }
  return (
    <div className="col-12 col-lg-8">
      {data.loading && (
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {Object.keys(data).length !== 0 &&
        data.rooms.map((item, index) => {
          let indexType = type.findIndex(
            (itemType) => itemType.id === item.idtyperoom
          );
          return (
            <CardRoomsItem
              item={item}
              key={`roomsitem-${index}`}
              type={type[indexType].name}
            />
          );
        })}
      <Pagination
        defaultCurrent={pagi._page}
        total={pagi._totalRows}
        pageSize={pagi._limit}
        onChange={handleChangePagi}
      />
    </div>
  );
}

function CardRoomsItem(props) {
  const { image, name, pricePerday, id, description, rating } = props.item;
  let star = [];

  for (let index = 0; index < 5; index++) {
    if (index < rating) {
      star[star.length] = <i class="fas fa-star"></i>;
    } else {
      star[star.length] = <i class="far fa-star"></i>;
    }
  }
  return (
    <div class="card d-flex flex-row" data-aos="fade-up">
      <div className="img">
        <Image src={image[3]} alt="imageRoom" />
      </div>
      <div class="card-body">
        <h4 class="card-nameRoom">Room : {name}</h4>
        <h5 class="card-NameType">Type Room : {props.type}</h5>
        <h5 class="card-Price">{pricePerday}$ Price/day </h5>
        {star}
        <p class="card-text">{description}</p>
        <Link to={`/detailRooms/${id}`}>Detail</Link>
        <Link
          to="/Booking"
          onClick={() => {
            localStorage.setItem(KEY_ROOM_BOOKING, JSON.stringify(props.item));
          }}
        >
          Booking
        </Link>
      </div>
    </div>
  );
}

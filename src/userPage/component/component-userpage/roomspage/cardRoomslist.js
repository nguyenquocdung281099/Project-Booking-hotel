import "./style.css";
import { Link } from "react-router-dom";
import { Image } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getroom, setLoading } from "../../../../redux/action";
import AOS from "aos";
import "antd/dist/antd.css";
import { Pagination } from "antd";
AOS.init({
  duration: 1200,
});
export default function CardRoomsList() {
  const data = useSelector((state) => state.room);
  const filter = data.filter;
  const dispatch = useDispatch();
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
  }, []);
  useEffect(() => {
    dispatch(getroom({ ...filter, _page: pagi._page, _limit: pagi._limit }));
    dispatch(setLoading(true));
  }, [filter]);

  function handleChangePagi(page, pagesize) {
    dispatch(getroom({ ...filter, _page: page, _limit: pagi._limit }));
    window.screenY = 0;
  }
  const loading = data.loading;
  return (
    <div className="col-8">

      {loading && (
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
      {data.rooms.map((item, index) => {
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
    <div class="card d-flex flex-row " data-aos="fade-up">
      <div className="img">
        <Image src={image[0]} alt="imageRoom" />
      </div>
      <div class="card-body">
        <h4 class="card-nameRoom">Room : {name}</h4>
        <h5 class="card-NameType">Type Room : {props.type}</h5>
        <h5 class="card-Price">{pricePerday}$ Price/day </h5>
        {star}
        <p class="card-text">{description}</p>
        <h3></h3>
        <Link to={`/detailRooms/${id}`}>Detail</Link>
      </div>
    </div>
  );
}

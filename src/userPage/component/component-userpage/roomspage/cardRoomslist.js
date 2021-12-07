import "./style.css";
import { Link } from "react-router-dom";
import { Image, Spin } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getroom, setLoading } from "../../../../redux/action";
import AOS from "aos";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { KEY_ROOM_BOOKING } from "../../../const/const";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
AOS.init({
  duration: 1200,
});
export default function CardRoomsList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.room);
  const filter = data.filter;
  const filterSearchRoom = data.filterSearchRoom;
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getroom());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(getroom({ ...filter, page: data.rooms.meta.page, limit: data.rooms.meta.limit }));
  }, [filter, dispatch]);
  console.log(data.rooms.meta);
  function handleChangePagi(page, pagesize) {
    dispatch(getroom({ ...filter, page: page, limit: 5 }));
  }
  return (
    <div className="col-12 col-lg-8">
      {data.loading ? (
        <Spin />
      ) : !isEmpty(data.rooms.data) ? (
        data.rooms.data.map((item, index) => {
          return (
            <CardRoomsItem item={item} key={`roomsitem-${index}`} type={item.idtyperoom.name} />
          );
        })
      ) : (
        <>
          {t("there are ")}
          {0}
          {t("qualified rooms")}
        </>
      )}
      {Object.keys(filterSearchRoom).length !== 0 && (
        <p>
          {t("there are ")}
          {data.rooms.meta.total}
          {t("qualified rooms")}
        </p>
      )}
      <Pagination
        defaultCurrent={data.rooms.meta.page || 10}
        total={data.rooms.meta.total || 10}
        pageSize={data.rooms.meta.limit || 10}
        onChange={handleChangePagi}
      />
    </div>
  );
}

function CardRoomsItem(props) {
  const { t } = useTranslation();
  const { image, name, pricePerday, id, description, rating, number, _id } = props.item;
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
        <h4 class="card-nameRoom">
          {t("Room")} : {name}
        </h4>
        <h5 class="card-NameType">
          {t("Type Room")} : {props.type}
        </h5>
        <h5 class="card-Price">
          {pricePerday}$ {t("Price/day")}{" "}
        </h5>
        <h5 class="card-Price">
          {number} {t("person/room")}{" "}
        </h5>
        {star}
        <p class="card-text">{description}</p>
        <Link to={`/detailRooms/${_id}`}>{t("Detail")}</Link>
        <Link
          to="/Booking"
          onClick={() => {
            sessionStorage.setItem(KEY_ROOM_BOOKING, JSON.stringify(props.item));
          }}
        >
          {t("Booking")}
        </Link>
      </div>
    </div>
  );
}

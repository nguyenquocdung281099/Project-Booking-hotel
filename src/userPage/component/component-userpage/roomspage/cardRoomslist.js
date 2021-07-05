import "./style.css";
import { Link } from "react-router-dom";
import { Image } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getroom } from "../../../../redux/action";
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
  }, [filter]);

  function handleChangePagi(page, pagesize) {
    dispatch(getroom({ ...filter, _page: page, _limit: pagi._limit }));
    window.screenY = 0;
  }
  return (
    <div className="col-8">
      {data.rooms.map((item, index) => (
        <CardRoomsItem item={item} key={`roomsitem-${index}`} />
      ))}
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
  return (
    <div class="card d-flex flex-row " data-aos="fade-up">
      <div className="img">
        {/* <Image src={props.item.image[0]} alt="imageRoom" /> */}
        <div className="img-action"></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">Room : {props.item.name}</h4>

        <p class="card-text">{props.item.description}</p>
        <h3></h3>
        <Link to={`/detailRooms/${props.item.id}`}>Detail</Link>
      </div>
    </div>
  );
}

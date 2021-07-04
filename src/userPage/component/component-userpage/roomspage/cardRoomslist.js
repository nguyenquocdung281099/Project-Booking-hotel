import "./style.css";
import { Link } from "react-router-dom";
import { Image } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettyperoom } from "../../../../redux/action";
import AOS from "aos";

AOS.init({
  duration: 1200,
});
export default function CardRoomsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettyperoom());
  }, [dispatch]);
  const data = useSelector((state) => state.RoomReducer.type);
  let datas = data.map((item, index) => (
    <CardRoomsItem item={item} key={`roomsitem-${index}`} />
  ));

  return <div>{datas}</div>;
}

function CardRoomsItem(props) {
  return (
    <div class="card d-flex flex-row" data-aos="fade-up">
      <div className="img">
        <Image src={props.item.image[0]} alt="imageRoom" />
        <div className="img-action"></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">{props.item.name}</h4>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link to={`/detailRooms/${props.item.id}`}>Detail</Link>
      </div>
    </div>
  );
}

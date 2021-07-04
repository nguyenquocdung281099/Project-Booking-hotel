import "./style.css";
import { Link } from "react-router-dom";
import { Image } from "antd";
import "antd/dist/antd.css";

export default function CardRoomsList() {
  return (
    <div class="card d-flex flex-row">
      <div className="img">
        <Image
          src="https://live.staticflickr.com/65535/51278968289_42d887795c_o.jpg"
          alt="imageRoom"
        />
        <div className="img-action"></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">Card title</h4>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link to="/detailRooms/">Detail</Link>
      </div>
    </div>
  );
}

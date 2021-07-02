import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettyperoom } from "../../../redux/action";
import Button from "../share/button";
import "./share.css";

export default function OffersBlock() {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.RoomReducer.type);
  useEffect(() => {
    dispatch(gettyperoom());
  }, []);
  let data = type.map((item, key) => {
    if (key > 2) {
      return (
        <OffersBlockItem name={item.name} pricePerday={item.pricePerday} />
      );
    }
    return "";
  });
  return <div className="Offers__block row mt-5">{data}</div>;
}

function OffersBlockItem(props) {
  return (
    <div className="OffersBlockItem col-12 col-lg-6 col-xl-4">
      <div className="Special__Offers--price">
        ${props.pricePerday} <br />
        PER DAY
      </div>
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col header_tab">{props.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Flight Ticket</th>
          </tr>
          <tr>
            <th scope="row ">Restaurant ( Lunch / Dinner )</th>
          </tr>
          <tr>
            <th scope="row">Music Concert</th>
          </tr>
          <tr>
            <th scope="row">Airport Pick-up</th>
          </tr>
          <tr>
            <th scope="row">Sport Activities</th>
          </tr>
          <tr>
            <th scope="row pt-2">
              <Button url="/room" content="BOOK NOW" />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

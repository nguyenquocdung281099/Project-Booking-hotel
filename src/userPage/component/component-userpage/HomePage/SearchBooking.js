import "./stylecomponent.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchRoom, getBookingRoom } from "../../../../redux/action";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useRouteMatch } from "react-router-dom";

export default function SearchBooking() {
  const { t } = useTranslation();
  const [dateInfor, setdataInfor] = useState({
    checkin: "",
    checkout: "",
    guest: 2,
  });
  console.log(dateInfor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatch(getBookingRoom({})));
  }, []);

  const bookingRoomFetch = useSelector((state) => state.booking.booking);
  // ? lay id cac phong da dc booking
  const idRoomNotEmpty = getRoomEmpty(dateInfor, bookingRoomFetch);
  // ? set len filter
  function handleBtnReservation() {
    dispatch(
      filterSearchRoom({
        id_ne: idRoomNotEmpty,
        number_gte: parseInt(dateInfor.guest) - 1,
      })
    );
  }

  const url = useRouteMatch();
  return (
    <div className="search__booking mt-5 fade-left row">
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkin">{t("Checkin")}</label>
        <input
          type="date"
          id="checkin"
          value={dateInfor.checkin}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, checkin: e.target.value });
          }}
        />
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkout">{t("Checkout")}</label>
        <input
          type="date"
          id="checkout"
          value={dateInfor.checkout}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, checkout: e.target.value });
          }}
        />
        ;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="guest">{t("guest")}</label>
        <select
          id="guest"
          value={dateInfor.guest}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, guest: e.target.value });
          }}
        >
          <option value="2" selected>
            2
          </option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="form-input search__room--input col-12 col-lg-6 col-xl-3 mb-2">
        <Link
          to={url.path !== "/room" && "/room"}
          onClick={() => {
            handleBtnReservation();
          }}
        >
          {t(" MAKE A RESERVATION")}{" "}
        </Link>
      </div>
    </div>
  );
}

const setDateBooked = (booking) => {
  let holidays = [];
  holidays[holidays.length] = parseInt(Date.parse(booking.dateStart));
  while (holidays[holidays.length - 1] < Date.parse(booking.dateEnd)) {
    holidays[holidays.length] =
      parseInt(holidays[holidays.length - 1]) + 86400000;
  }
  return holidays;
};

function getRoomEmpty(dateInfor, bookingRoomFetch) {
  let data = [];
  const idRoomNotEmpty = [];

  if (dateInfor.checkin === "" || dateInfor.checkout === "") {
  } else {
    const checkIn = parseInt(Date.parse(dateInfor.checkin) - 25200000);
    const checkOut = parseInt(Date.parse(dateInfor.checkout) - 25200000);

    bookingRoomFetch.forEach((element) => {
      const date = setDateBooked(element);
      data.push({ id: element.idroom, date: date });
    });

    data.forEach((item) => {
      item.date.forEach((dateItem) => {
        if (dateItem <= checkOut && dateItem >= checkIn) {
          idRoomNotEmpty.findIndex((idempty) => idempty === item.id) === -1 &&
            idRoomNotEmpty.push(item.id);
          return;
        }
      });
    });
    return idRoomNotEmpty;
  }
}

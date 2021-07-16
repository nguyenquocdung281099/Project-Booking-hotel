import "./style.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import { KEY_ROOM_BOOKING } from "../../const/const";
import {
  getbooking,
  getBookingRoom,
  getpromo,
  setBooking,
} from "../../../redux/action/index";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

export default function BookingPage() {
  const infRoom = JSON.parse(sessionStorage.getItem(KEY_ROOM_BOOKING)) || [];

  const { t } = useTranslation();
  const users = useSelector((state) => state.user.user);
  const [booking, setBookings] = useState({
    idUser: users.id,
    dateStart: undefined,
    dateEnd: undefined,
    paymethod: {
      idpaymethod: 2,
      status: false,
    },
    codeDiscount: undefined,
    totalCost: 0,
    status: "NEW",
    idroom: infRoom.id,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setBookings({ ...booking, idUser: users.id });
  }, [users]);

  // get discount code

  const bookingRoomFetch = useSelector((state) => state.booking.booking);
  const holidays = setDateBooked(bookingRoomFetch);
  const promo = useSelector((state) => state.promo.promo);

  useEffect(() => {
    dispatch(getpromo());
    dispatch(getBookingRoom({ idroom: infRoom.id, status: "NEW" }));
  }, [dispatch]);

  const handlePayment = (e) => {
    e.preventDefault();
    let isComplete = true;
    const dateStartMs = Date.parse(booking.dateStart);
    const dateEndMs = Date.parse(booking.dateEnd);

    if (booking.dateStart === undefined || booking.dateEnd === undefined) {
      alert("you need choose day");
    }

    holidays.forEach((element) => {
      if (element > dateStartMs && element < dateEndMs) {
        isComplete = false;
      }
    });

    if (isComplete === false) {
      alert("you need choose day");
    } else {
      const totalDay =
        (dateEndMs - dateStartMs) / 86400000 === 0
          ? 1
          : (dateEndMs - dateStartMs) / 86400000;
      let discount;
      promo.forEach((item) => {
        if (booking.codeDiscount === item.code) {
          discount = parseInt(item.discount);
        } else discount = 100;
      });

      const totalCost = (infRoom.pricePerday * totalDay * discount) / 100;
      let bookingFinal = { ...booking };
      bookingFinal = { ...bookingFinal, totalCost: totalCost };
      setBookings({ ...booking, totalCost: totalCost });
      dispatch(setBooking(bookingFinal));
      console.log(bookingFinal);
    }
  };

  const [valueSearchCode, setValueSearchCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (valueSearchCode !== "") {
      promo.forEach((item) => {
        if (valueSearchCode === item.code) {
          setBookings({ ...booking, codeDiscount: valueSearchCode });
        }
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <main className="bookingPage">
      <section className="aboutus__main--banner container_fluid">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Booking")}</h1>
        <EdgeBottom />
      </section>
      <div className="container">
        <div className="bookingRoom pt-5 pb-5">
          <form className="row">
            <div className="informationUser col-6">
              <div className="email group-input">
                <label for="email">Email:</label>
                <input type="text" disabled value={users.email} />
              </div>
              <div className="userName group-input">
                <label for="userName">{t("UserName")}:</label>
                <input type="text" disabled value={users.userName} />
              </div>
              <div className="birthday group-input">
                <label for="birthday">{t("Birthday")}:</label>
                <input type="text" disabled value={users.birthday} />
              </div>
              <div className="address group-input">
                <label for="address">{t("Address")}:</label>
                <input type="text" disabled value={users.address} />
              </div>
              <div className="group-input">
                <label>{t("pay method")}</label>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setBookings({
                      ...booking,
                      paymethod: {
                        idpaymethod: e.target.value,
                        status: false,
                      },
                    });
                  }}
                >
                  <option value="2">Online</option>
                  <option value="1" selected>
                    direct
                  </option>
                </select>
                {booking.paymethod.idpaymethod === "2" ? (
                  <div className="chooseBank">
                    <div>
                      <input
                        type="radio"
                        id="Vietcombank"
                        name="bank_pay"
                        value="Vietcombank"
                      />
                        <label for="Vietcombank">Vietcombank</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="vietinbank"
                        name="bank_pay"
                        value="viettinbank  "
                      />
                        <label for="vietinbank">viettinbank </label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="information__booking col-6">
              <div className="group-input">
                <label>{t("Room")}:</label>
                <input type="text" value={infRoom.name} disabled />
              </div>
              <div className="group-input">
                <label>{t("Price Per Day")}:</label>
                <input type="text" value={`$${infRoom.pricePerday}`} disabled />
              </div>
              <div className="group-input">
                <label>{t("Check In")}</label>
                <DatePicker
                  placeholderText={t("checkin")}
                  selected={booking.dateStart}
                  onChange={(day) => {
                    setBookings({ ...booking, dateStart: day });
                    console.log(day);
                  }}
                  minDate={new Date()}
                  maxDate={booking.dateEnd}
                  excludeDates={holidays}
                  required
                />
              </div>
              <div>
                <label>{t("check Out")}</label>
                <DatePicker
                  placeholderText={t("checkout")}
                  selected={booking.dateEnd}
                  onChange={(day) => {
                    setBookings({ ...booking, dateEnd: day });
                  }}
                  minDate={booking.dateStart}
                  excludeDates={holidays}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3 ">
              <Button className="discountoCode-btn" onClick={showModal}>
                <i class="fas fa-tags"></i>
              </Button>
              <Modal
                title={t("discount cart")}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <input
                  type="text"
                  value={valueSearchCode}
                  onChange={(e) => {
                    setValueSearchCode(e.target.value);
                  }}
                />
                <div>
                  {promo.map((item) => (
                    <div
                      className="d-flex justify-content-between infor_discount"
                      onClick={() => {
                        setValueSearchCode(item.code);
                      }}
                    >
                      <p>{item.code}</p>
                      <p>{item.discount}%</p>
                    </div>
                  ))}
                </div>
              </Modal>
              <button
                className="bookingpage-btn"
                onClick={(e) => {
                  handlePayment(e);
                }}
              >
                {t("payment")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

const setDateBooked = (booking) => {
  let holidays = [];
  if (booking && booking.length !== 0) {
    booking.forEach((item) => {
      holidays[holidays.length] = parseInt(Date.parse(item.dateStart));
      while (holidays[holidays.length - 1] < Date.parse(item.dateEnd)) {
        holidays[holidays.length] =
          parseInt(holidays[holidays.length - 1]) + 86400000;
      }
    });
  }
  return holidays;
};

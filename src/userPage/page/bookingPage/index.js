import "./style.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import {
  KEY_DATE_CHECKIN,
  KEY_DATE_CHECKOUT,
  KEY_ROOM_BOOKING,
} from "../../const/const";
import {
  cancelCost,
  editPromo,
  getPromoUs,
  getservice,
  setBooking,
} from "../../../redux/action/index";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Route, Switch, useLocation } from "react-router-dom";

export default function BookingPage() {
  const [valueSearchCode, setValueSearchCode] = useState("");
  const [isCancelCode, setIsCancel] = useState(false);
  const [valuePayMethod, setValuePayMethod] = useState("ZaloPay");
  const infRoom = JSON.parse(sessionStorage.getItem(KEY_ROOM_BOOKING)) || [];
  const param = useLocation();
  const [serviceExtra, setServiceExtra] = useState(
    JSON.parse(localStorage.getItem("KEY_SERVICE")) || []
  );

  const notify = () => toast.success("apply code success!");
  const cancelSC = () => toast.success("cancel code success!");
  const notifyEr = () =>
    toast.warning("discount code has been used or is incorrect!");
  const notifyPaySC = () => toast.success("Booking success!");

  const notifyNotDate = () =>
    toast.warning("you need choose date checkin and checkout!");

  let promo = useSelector((state) => state.promo.promo);
  const isGetPromo = useSelector((state) => state.promo.isGetPromo);
  const filterSearchRoom = useSelector((state) => state.room.filterSearchRoom);
  const checkIn = new Date(sessionStorage.getItem(KEY_DATE_CHECKIN));
  const checkOut = new Date(sessionStorage.getItem(KEY_DATE_CHECKOUT));
  const totalDay = getTotalDay(Date.parse(checkOut), Date.parse(checkIn));
  const bookingRoomFetch = useSelector((state) => state.booking.booking);
  const service = useSelector((state) => state.service.service);
  const { t } = useTranslation();
  const users = useSelector((state) => state.user.user);
  const [booking, setBookings] = useState({
    idUser: users.id,
    dateStart: undefined,
    dateEnd: undefined,
    codeDiscount: undefined,
    totalCost: 0,
    status: "NEW",
    idroom: infRoom.id,
    number: filterSearchRoom.number_gte + 1 || infRoom.number,
  });

  const dispatch = useDispatch();
  // get discount code

  const holidays = setDateBooked(bookingRoomFetch);
  useEffect(() => {
    setBookings({ ...booking, idUser: users.id });
  }, [users]);

  useEffect(() => {
    dispatch(getservice({ _page: 1 }));
  }, []);

  useEffect(() => {
    if (isGetPromo === true) {
      notify();
      setIsCancel(true);
      setBookings({ ...booking, codeDiscount: promo[0].code });
    } else if (isGetPromo === false) {
      setBookings({ ...booking, codeDiscount: null });
      if (isCancelCode === true) {
        notifyEr();
      } else {
        cancelSC();
      }
    }
  }, [isGetPromo]);

  const totalCost =
    isGetPromo === true
      ? getTotalCost(
          totalDay,
          infRoom.pricePerday,
          serviceExtra,
          promo[0].discount
        )
      : getTotalCost(totalDay, infRoom.pricePerday, serviceExtra);

  const handelPay = () => {
    notifyPaySC();
    if (isGetPromo === true) {
      dispatch(editPromo({ ...promo[0], amount: promo[0].amount - 1 }));
    }
    const bookings = {
      ...booking,
      totalCost: totalCost,
      paymethod: valuePayMethod,
      dateStart: sessionStorage.getItem(KEY_DATE_CHECKIN),
      dateEnd: sessionStorage.getItem(KEY_DATE_CHECKOUT),
    };
    setBooking({ ...bookings });
    dispatch(setBooking(bookings));
    localStorage.removeItem("KEY_SERVICE");
    sessionStorage.removeItem(KEY_DATE_CHECKIN);
    sessionStorage.removeItem(KEY_DATE_CHECKOUT);
  };

  const handleService = (service) => {
    const index = serviceExtra.findIndex((item) => item.name === service.name);
    index === -1 ? serviceExtra.push(service) : serviceExtra.splice(index, 1);
    localStorage.setItem("KEY_SERVICE", JSON.stringify([...serviceExtra]));
    setServiceExtra([...serviceExtra]);
    setBookings({ ...booking, service: [...serviceExtra] });
  };
  return (
    <main className="bookingPage">
      <ToastContainer />
      <section className="aboutus__main--banner container_fluid">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Booking")}</h1>
        <EdgeBottom />
      </section>
      <div className="container">
        <div className="process-booking">
          <span className="active">
            <Link className="active" to="/Booking/">
              1. {t("choose date")}
            </Link>
          </span>{" "}
          <i class="fas fa-chevron-right"></i>{" "}
          <span>
            <Link
              className={
                param.pathname === "/Booking/infbooking" ||
                param.pathname === "/Booking/confirmbooking"
                  ? "active"
                  : ""
              }
              to="/Booking/infbooking"
            >
              2. {t("inf_booking")}
            </Link>
          </span>
          <i class="fas fa-chevron-right"></i>{" "}
          <span>
            <Link
              className={
                param.pathname === "/Booking/confirmbooking" && "active"
              }
              to="/Booking/confirmbooking"
            >
              3. {t("Confirmation and payment")}
            </Link>
          </span>
        </div>
        <div className="bookingRoom pt-5 pb-5">
          <form>
            <Switch>
              <Route exact path="/booking">
                <div className="chooseDate__booking row ">
                  <div className="group-input col-6 ">
                    <div>
                      <h3>{t("Check In")}</h3>
                      <DatePicker
                        placeholderText={t("checkin")}
                        selected={booking.dateStart}
                        onChange={(day) => {
                          setBookings({ ...booking, dateStart: day });
                        }}
                        inline
                        minDate={new Date()}
                        maxDate={booking.dateEnd}
                        excludeDates={holidays}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <h3>{t("check Out")}</h3>
                      <DatePicker
                        placeholderText={t("checkout")}
                        selected={booking.dateEnd}
                        onChange={(day) => {
                          setBookings({ ...booking, dateEnd: day });
                        }}
                        inline
                        minDate={booking.dateStart}
                        excludeDates={holidays}
                        required
                      />
                    </div>
                  </div>
                  <h3>{t("extra service")}</h3>
                  <div className="col-12 service mb-3 mt-3">
                    <table class="table table-borderless">
                      <tbody>
                        {service.map((item) => (
                          <tr className="servceItem">
                            <td>
                              <label
                                htmlFor={item.name}
                                onClick={() => {
                                  handleService(item);
                                }}
                              >
                                {item.name}
                              </label>
                            </td>
                            <td className="price">${item.price}</td>
                            <td style={{ width: "50px" }}>
                              <input
                                type="checkbox"
                                name="service"
                                className="mr-2"
                                id={item.name}
                                hidden
                              />
                              <i class="fas fa-check"></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Link
                    class="btn"
                    style={{ width: "100px", marginLeft: "auto" }}
                    to={
                      booking.dateStart !== undefined &&
                      booking.dateEnd !== undefined &&
                      "/Booking/infbooking"
                    }
                    onClick={() => {
                      if (
                        booking.dateStart === undefined ||
                        booking.dateEnd === undefined
                      ) {
                        notifyNotDate();
                      } else {
                        sessionStorage.setItem(
                          KEY_DATE_CHECKIN,
                          booking.dateStart
                        );
                        sessionStorage.setItem(
                          KEY_DATE_CHECKOUT,
                          booking.dateEnd
                        );
                      }
                    }}
                  >
                    NEXT
                  </Link>
                </div>
              </Route>
              <Route path="/Booking/infbooking">
                <div>
                  <div className="row">
                    <div className="infBooking col-5">
                      <h2 className="mb-5">{t("inf_booking")}</h2>
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
                      <div className="code_promo group-input ">
                        <label for="code_promo">{t("discount code")}:</label>
                        <input
                          id="code_promo"
                          type="text"
                          value={valueSearchCode}
                          onChange={(e) => {
                            setValueSearchCode(e.target.value);
                          }}
                          disabled={promo.length !== 0 && isCancelCode === true}
                        />

                        {isCancelCode === false ? (
                          <button
                            className="btn-applyCode"
                            disabled={valueSearchCode === "" && true}
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                getPromoUs({
                                  code: valueSearchCode,
                                  _page: 1,
                                  _limit: 25,
                                })
                              );
                            }}
                          >
                            {t("apply")}
                          </button>
                        ) : (
                          <button
                            className="btn-applyCode"
                            onClick={(e) => {
                              setIsCancel(false);
                              e.preventDefault();
                              setBookings({ ...booking, codeDiscount: null });
                              dispatch(cancelCost());
                            }}
                          >
                            {t("Cancel")}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className=" col-3 mb-5">
                      <h2 className="mb-5">{t("inf Date")}</h2>

                      <div className="info_checkIn div-date ">
                        <h3> {t("checkin")}</h3>
                        <p>{`${checkIn.getDate()}/${
                          checkIn.getMonth() + 1
                        }/${checkIn.getFullYear()}`}</p>
                      </div>
                      <div className="info_checkOut div-date">
                        <h3> {t("checkout")}</h3>
                        <p>{`${checkOut.getDate()}/${
                          checkOut.getMonth() + 1
                        }/${checkOut.getFullYear()}`}</p>
                      </div>
                    </div>
                    <div className="col-3">
                      <h2 className="mb-5">{t("inf Room")}</h2>
                      <div className="inf_room__confirm">
                        <h4 className="name_rom">
                          {t("nameRoom")}: {infRoom.name}
                        </h4>
                        <h4 className="name_rom">
                          {t("pricePerDay")}: ${infRoom.pricePerday}
                        </h4>
                        <h4>
                          {t("Total Day")} :{" "}
                          {getTotalDay(
                            Date.parse(checkOut),
                            Date.parse(checkIn)
                          )}
                        </h4>
                        <h4>
                          {t("Person")}:{booking.number}
                        </h4>
                        {serviceExtra.length !== 0 && (
                          <h4 className="serviceEr">{t("Service Extra")} :</h4>
                        )}
                        {serviceExtra.map((item) => (
                          <p className="serviceEr">
                            {item.name}-{item.price}$
                          </p>
                        ))}
                        <hr />
                        {isGetPromo === true && isCancelCode === true ? (
                          <p>
                            {t("discount code")} :{promo[0].code}{" "}
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="descr_room">{infRoom.description}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="button row">
                  <Link
                    class="btn"
                    style={{ width: "100px", marginRight: "auto" }}
                    to="/Booking"
                  >
                    PREV
                  </Link>
                  <Link
                    class="btn"
                    style={{ width: "100px", marginLeft: "auto" }}
                    to="/Booking/confirmbooking"
                  >
                    NEXT
                  </Link>
                </div>
              </Route>
              <Route path="/Booking/confirmbooking">
                <div className="row">
                  <div className="infor_paymethod col-8">
                    <h2>{t("payment")}</h2>
                    <p>{t("Please check payment method")}</p>
                    <div className="payment_method">
                      <div className="pay-method__item d-flex">
                        <input
                          type="radio"
                          checked={valuePayMethod === "visa-master" && true}
                          onChange={(e) => {
                            setValuePayMethod(e.target.value);
                          }}
                          name="paymethod"
                          value="visa-master"
                          id="visa-master"
                        />
                        <div className="d-flex  justify-content-between">
                          <label for="visa-master">
                            Thẻ Visa, Thẻ Master, Thẻ JCB hoặc Thẻ American
                            Express
                          </label>
                          <img
                            src="https://cdn.luxstay.com/images/logos/payments/visa_master_jcb.svg"
                            alt="lg-pay"
                          />
                        </div>
                      </div>
                      <div className="pay-method__item d-flex">
                        <input
                          type="radio"
                          checked={valuePayMethod === "visa-jcb" && true}
                          onChange={(e) => {
                            setValuePayMethod(e.target.value);
                          }}
                          name="paymethod"
                          value="visa-jcb"
                          id="visa-jcb"
                        />
                        <div className="d-flex  justify-content-between">
                          <label for="visa-jcb">
                            Thẻ Visa, Thẻ Master, thẻ JCB
                          </label>
                          <img
                            src="https://cdn.luxstay.com/images/logos/payments/visa_master_jcb.svg"
                            alt="lg-pay"
                          />
                        </div>
                      </div>
                      <div className="pay-method__item d-flex">
                        <input
                          type="radio"
                          checked={valuePayMethod === "ATM" && true}
                          onChange={(e) => {
                            setValuePayMethod(e.target.value);
                          }}
                          name="paymethod"
                          value="ATM"
                          id="ATM"
                        />
                        <div className="d-flex  justify-content-between">
                          <label for="ATM">ATM</label>
                          <img
                            src="https://cdn.luxstay.com/images/logos/payments/napas.svg"
                            alt="lg-pay"
                          />
                        </div>
                      </div>
                      <div className="pay-method__item d-flex">
                        <input
                          type="radio"
                          checked={valuePayMethod === "ZaloPay" && true}
                          onChange={(e) => {
                            setValuePayMethod(e.target.value);
                          }}
                          name="paymethod"
                          value="ZaloPay"
                          id="ZaloPay"
                        />
                        <div className="d-flex  justify-content-between">
                          <label for="ZaloPay">ZaloPay</label>
                          <img
                            src="https://cdn.luxstay.com/images/logos/payments/zalopay.png"
                            alt="lg-pay"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <h2 className="mb-5">{t("inf Room")}</h2>
                    <div className="inf_room__confirm">
                      <h4 className="name_rom">
                        {t("nameRoom")}: {infRoom.name}
                      </h4>
                      <h4 className="name_rom">
                        {t("pricePerDay")}: ${infRoom.pricePerday}
                      </h4>
                      <h4>
                        {t("Total Day")} :{totalDay}
                      </h4>
                      <h4>
                        {`${checkIn.getDate()}/${
                          checkIn.getMonth() + 1
                        }/${checkIn.getFullYear()}`}{" "}
                        {t("to")}
                        {` ${checkOut.getDate()}/${
                          checkOut.getMonth() + 1
                        }/${checkOut.getFullYear()}`}
                      </h4>

                      {serviceExtra.length !== 0 && (
                        <h4 className="serviceEr">{t("Service Extra")} :</h4>
                      )}
                      {serviceExtra.map((item) => (
                        <p className="serviceEr">
                          {item.name}-{item.price}$
                        </p>
                      ))}
                      <h4>
                        {t("Total Cost")} :{totalCost}
                      </h4>
                      <hr />
                      <div className="descr_room">{infRoom.description}</div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="bookingpage-btn"
                  onClick={(e) => {
                    handelPay();
                  }}
                >
                  {t("payment")}
                </Link>
              </Route>
            </Switch>
            <div className="d-flex justify-content-center mt-3 "></div>
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

function getTotalDay(dateEndMs, dateStartMs) {
  console.log(dateEndMs);
  console.log(dateEndMs);
  const totalDay =
    (dateEndMs - dateStartMs) / 86400000 === 0
      ? 1
      : (dateEndMs - dateStartMs) / 86400000;
  return totalDay;
}

function getTotalCost(totalDay, pricePerday, service, discout = 0) {
  const serviceCost =
    service.length === 0
      ? 0
      : service.reduce((total, services) => {
          return (total += services.price);
        }, 0);
  const ttday = parseInt(totalDay);
  const price = parseFloat(pricePerday);
  const discount = parseFloat(discout);
  const serviceCosts = parseFloat(serviceCost);
  const priceDiscout = (ttday * price * discount + serviceCosts) / 100;
  const totalCost = ttday * price + serviceCosts - priceDiscout;
  return totalCost.toFixed(2);
}

import "./style.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import { KEY_DATE_CHECKIN, KEY_DATE_CHECKOUT, KEY_ROOM_BOOKING } from "../../const/const";
import {
  cancelPromotion,
  checkPromotion,
  editPromo,
  getBlankDate,
  getExtraService,
  getservice,
  setBooking,
} from "../../../redux/action/index";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { Button, InputNumber } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import { showNotification } from "../../../until";

export default function BookingPage() {
  const [valueSearchCode, setValueSearchCode] = useState("");
  const [statusCode, setStatus] = useState("APPLY");
  const [codeEr, setCodeEr] = useState(true);
  const [valuePayMethod, setValuePayMethod] = useState("ZaloPay");
  const infRoom = JSON.parse(sessionStorage.getItem(KEY_ROOM_BOOKING)) || [];
  const param = useLocation();
  const { t } = useTranslation();
  const [serviceExtra, setServiceExtra] = useState(
    JSON.parse(localStorage.getItem("KEY_SERVICE")) || []
  );

  let promo = useSelector((state) => state.promo.promo);
  const promoUser = useSelector((state) => state.promo.promoUser);
  const loader = useSelector((state) => state.promo.loader);
  const filterSearchRoom = useSelector((state) => state.room.filterSearchRoom);
  const service = useSelector((state) => state.service.service);
  const users = useSelector((state) => state.user.userCurrent);
  const dateBooked = useSelector((state) => state.booking.dateBooked);
  const dateBookeds = dateBooked.map((item) => new Date(item));

  const checkIn = new Date(sessionStorage.getItem(KEY_DATE_CHECKIN));
  const checkOut = new Date(sessionStorage.getItem(KEY_DATE_CHECKOUT));

  const totalDay = moment(new Date(checkOut)).diff(moment(new Date(checkIn)), "days") + 1;

  const [booking, setBookings] = useState({
    idUser: users.id,
    dateStart: undefined,
    dateEnd: undefined,
    codeDiscount: undefined,
    totalCost: 0,
    status: "NEW",
    idroom: infRoom._id,
    userName: users.userName,
    number: filterSearchRoom.number_gte + 1 || infRoom.number,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setBookings({ ...booking, idUser: users.id });
    dispatch(getBlankDate(infRoom._id));
    dispatch(getExtraService());
  }, [users]);

  useEffect(() => {
    dispatch(getservice({ _page: 1 }));
  }, []);

  useEffect(() => {
    setBookings({ ...booking, codeDiscount: promoUser.code || "" });
  }, [promoUser]);

  const totalCost =
    isEmpty(promoUser) === false
      ? getTotalCost(totalDay, infRoom.pricePerday, serviceExtra, promoUser.discount)
      : getTotalCost(totalDay, infRoom.pricePerday, serviceExtra);
  const handelPay = () => {
    if (isEmpty(promoUser) === false) {
      dispatch(editPromo({ ...promoUser, amount: promoUser.amount - 1 }));
    }
    const bookings = {
      ...booking,
      totalCost: totalCost,
      paymethod: valuePayMethod,
      dateStart: sessionStorage.getItem(KEY_DATE_CHECKIN),
      dateEnd: sessionStorage.getItem(KEY_DATE_CHECKOUT),
    };
    setBooking({ ...bookings });
    dispatch(
      setBooking({
        requestData: {
          ...bookings,
          userName: users.userName,
        },
      })
    );
    dispatch(cancelPromotion());
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

  function onChangeNumber(value) {
    setBookings({ ...booking, number: value });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bookingPage">
      <ToastContainer />
      <section className="aboutus__main--banner container_fluid">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Booking")}</h1>
        <EdgeBottom />
      </section>
      <div className="container">
        <div className="process-booking d-flex d-md-block flex-column">
          <span className="active">
            <i class="fas fa-chevron-right"></i>
            <Link className="active" to="/Booking/">
              1. {t("choose date")}
            </Link>
          </span>
          <span>
            <i class="fas fa-chevron-right"></i>
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

          <span>
            <i class="fas fa-chevron-right"></i>
            <Link
              className={param.pathname === "/Booking/confirmbooking" && "active"}
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
                  <div className="group-input col-md-6 col-12 col-lg-4">
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
                        excludeDates={dateBookeds}
                        required
                      />
                    </div>
                  </div>
                  <div className=" col-md-6 col-12 col-lg-4">
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
                        excludeDates={dateBookeds}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-12 col-lg-4 mb-3 ">
                    <h3>{t("extra service")}</h3>

                    <div class="service">
                      <p>{t("choose Service")}</p>
                      <table class="table table-borderless table-responsive">
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
                      if (booking.dateStart === undefined || booking.dateEnd === undefined) {
                      } else {
                        sessionStorage.setItem(KEY_DATE_CHECKIN, booking.dateStart);
                        sessionStorage.setItem(KEY_DATE_CHECKOUT, booking.dateEnd);
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
                    <div className="infBooking col-12 col-lg-5">
                      <h2 className="mb-5">{t("User_booking")}</h2>
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
                          disabled={statusCode === "CANCEl"}
                        />

                        {
                          <Button
                            className="btn-applyCode"
                            disabled={valueSearchCode === "" && true}
                            onClick={(e) => {
                              e.preventDefault();
                              if (isEmpty(promoUser)) {
                                dispatch(
                                  checkPromotion({
                                    requestData: {
                                      codePromotion: valueSearchCode,
                                    },
                                  })
                                );
                              } else {
                                dispatch(cancelPromotion());
                                showNotification("success", "Cancel voucher success ");
                              }
                            }}
                            loading={loader}
                          >
                            {isEmpty(promoUser) ? t("apply") : "Cancel"}
                          </Button>
                        }
                      </div>
                      <div className="address group-input">
                        <label for="address">{t("Person")}:</label>
                        <InputNumber
                          min={1}
                          max={infRoom.number}
                          defaultValue={booking.number}
                          onChange={onChangeNumber}
                        />
                      </div>
                    </div>
                    <div className=" col-12 col-md-6 col-lg-3 mb-5">
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
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                      <h2 className="mb-5">{t("inf booking")}</h2>
                      <div className="inf_room__confirm">
                        <table class="table">
                          <tr>
                            <td>
                              <h5 className="name_rom">{t("nameRoom")}</h5>
                            </td>
                            <td>
                              <h5>{infRoom.name}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h5 className="name_rom">{t("pricePerDay")}</h5>
                            </td>
                            <td>
                              <h5>${infRoom.pricePerday}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h5 className="name_rom"> {t("Total Day")}</h5>
                            </td>
                            <td>
                              <h5>{totalDay}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h5 className="name_rom"> {t("Person")}</h5>
                            </td>
                            <td>
                              <h5>
                                {booking.number} <i class="fas fa-user-tie"></i>
                              </h5>
                            </td>
                          </tr>
                          {serviceExtra.length !== 0 && (
                            <tr>
                              <td>
                                <h5 className="serviceEr">{t("Service Extra")}</h5>
                              </td>
                              <td>
                                {serviceExtra.map((item) => (
                                  <p className="serviceEr">
                                    {item.name}-{item.price}$
                                  </p>
                                ))}
                              </td>
                            </tr>
                          )}
                          {!isEmpty(promoUser) && (
                            <tr>
                              <td>{t("discount code")}:</td> <td>{promoUser.code}</td>
                            </tr>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="button row">
                  <Link class="btn" style={{ width: "100px", marginRight: "auto" }} to="/Booking">
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
                  <div className="infor_paymethod col-12 col-md-7">
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
                            Thẻ Visa, Thẻ Master, Thẻ JCB hoặc Thẻ American Express
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
                          <label for="visa-jcb">Thẻ Visa, Thẻ Master, thẻ JCB</label>
                          <img
                            src="https://cdn.luxstay.com/images/logos/payments/visa_master_jcb.svg"
                            alt="lg-pay"
                          />
                        </div>
                      </div>
                      <div className="pay-method__item d-flex">
                        <input
                          type="radio"
                          checked={valuePayMethod === "direct-payment" && true}
                          onChange={(e) => {
                            setValuePayMethod(e.target.value);
                          }}
                          name="paymethod"
                          value="direct-payment"
                          id="direct-payment"
                        />
                        <div className="d-flex  justify-content-between">
                          <label for="direct-payment">direct payment</label>
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
                  <div className="col-12 col-md-5 mb-4">
                    <h2 className="mb-5">{t("inf Room")}</h2>
                    <div className="inf_room__confirm">
                      <table class="table">
                        <tr>
                          <td>
                            <h5 className="name_rom">{t("nameRoom")}</h5>
                          </td>
                          <td>
                            <h5>{infRoom.name}</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5 className="name_rom">{t("pricePerDay")}</h5>
                          </td>
                          <td>
                            <h5>${infRoom.pricePerday}</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5 className="name_rom"> {t("Total Day")}</h5>
                          </td>
                          <td>
                            <h5>{totalDay}</h5>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5 className="name_rom"> {t("Person")}</h5>
                          </td>
                          <td>
                            <h5>
                              {booking.number} <i class="fas fa-user-tie"></i>
                            </h5>
                          </td>
                        </tr>
                        {serviceExtra.length !== 0 && (
                          <tr>
                            <td>
                              <h5 className="serviceEr">{t("Service Extra")}</h5>
                            </td>
                            <td>
                              {serviceExtra.map((item) => (
                                <p className="serviceEr">
                                  {item.name}-{item.price}$
                                </p>
                              ))}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td>
                            <h5>{t("discount price")} :</h5>
                          </td>
                          <td>
                            {!isEmpty(promoUser)
                              ? new Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(
                                  (getTotalCost(totalDay, infRoom.pricePerday, serviceExtra) *
                                    promoUser.discount) /
                                    100
                                )
                              : "0$"}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5 className="name_rom"> {t("total cost")}</h5>
                          </td>
                          <td>
                            <h5>
                              {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "USD",
                              }).format(totalCost)}
                            </h5>
                          </td>
                        </tr>
                      </table>
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

function getTotalCost(totalDay, pricePerday, service, discout = 0) {
  const serviceCost =
    service.length === 0
      ? 0
      : service.reduce((total, services) => {
          return (total += parseInt(services.price));
        }, 0);
  const ttday = parseInt(totalDay);
  const price = parseFloat(pricePerday);
  const discount = parseFloat(discout);
  const serviceCosts = parseFloat(serviceCost);
  const priceDiscout = ((ttday * price + serviceCosts) * discount) / 100;
  const totalCost = ttday * price + serviceCosts - priceDiscout;
  return parseInt(totalCost);
}

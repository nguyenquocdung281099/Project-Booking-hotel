import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  editBooking,
  editUser,
  getBookingRoom,
  getroom,
} from "../../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "antd";
import "antd/dist/antd.css";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);
  const [dataInf, setdataInf] = useState({});
  const notify = () => toast.success("cancel success!");

  useEffect(() => {
    setdataInf({
      email: users.email,
      userName: users.userName,
      birthday: users.birthday,
      address: users.address,
      password: users.password,
    });
    dispatch(getBookingRoom({ idUser: users.id, _page: 1, _limit: 5 }));
    dispatch(
      getroom({
        _page: 1,
        _limit: 25,
      })
    );
  }, [users, dispatch]);

  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const dataBooking = useSelector((state) => state.booking.booking);

  const bookingRoomFetch = dataBooking.data;
  const dataRoom = useSelector((state) => state.room);

  return (
    <main className="profile__page container-fluid">
      <ToastContainer />

      <section className="aboutus__main--banner">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Profile")}</h1>
        <EdgeBottom />
      </section>
      <section className="profiel__page--body wrap container mt-5 mb-5">
        <div className="row ">
          <div className="col-12 col-md-4 profile_left pt-3">
            <img
              src="https://www.bootdey.com/img/Content/avatar/avatar7.png"
              alt="imgUser"
            />
            <h3>{users.userName}</h3>
            <address>{users.address}</address>
          </div>
          <div className="profile__main col-12 col-md-7 ml-5 ">
            <table class="table ">
              <tbody>
                <tr>
                  <th scope="row">Email:</th>
                  <td>
                    <input
                      type="text"
                      value={dataInf.email}
                      disabled={disabled}
                      onChange={(e) => {
                        setdataInf({ ...dataInf, email: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{t("UserName")}:</th>
                  <td>
                    <input
                      type="text"
                      value={dataInf.userName}
                      onChange={(e) => {
                        setdataInf({ ...dataInf, userName: e.target.value });
                      }}
                      disabled={disabled}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{t("Birthday")}:</th>
                  <td>
                    <input
                      type="text"
                      value={dataInf.birthday}
                      onChange={(e) => {
                        setdataInf({ ...dataInf, birthday: e.target.value });
                      }}
                      disabled={disabled}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{t("Password")}:</th>
                  <td>
                    <input
                      type="password"
                      value={dataInf.password}
                      onChange={(e) => {
                        setdataInf({ ...dataInf, password: e.target.value });
                      }}
                      disabled={disabled}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <button
                      onClick={(e) => {
                        setDisabled(false);
                      }}
                      className="btn-success"
                    >
                      <i class="fas fa-pen mr-2"></i>
                      {t("EDIT")}
                    </button>
                  </th>
                  <td>
                    <button
                      className="btn m-auto"
                      onClick={() => {
                        setDisabled(true);
                        dispatch(editUser(users.id, dataInf));
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
        <div className="history__booking_main mt-5 mb-5">
          <h3>{t("History Booking")}</h3>
          <table class="table history__booking mb-5 mt-5 ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t("nameRoom")}</th>
                <th scope="col">{t("promotion")}</th>
                <th scope="col">{t("checkin")}</th>
                <th scope="col">{t("checkout")}</th>
                <th scope="col">{t("status")}</th>
                <th scope="col">{t("Payment")}</th>
                <th scope="col">{t("Cost")}</th>
                <th scope="col">{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {bookingRoomFetch &&
                bookingRoomFetch.map((item, index) => {
                  const checkin = new Date(item.dateStart);
                  const checkout = new Date(item.dateEnd);
                  return (
                    <tr key={index}>
                      <th scope="col">{item.id}</th>
                      <td>
                        {dataRoom.rooms.map((element) => {
                          return item.idroom === element.id && element.name;
                        })}
                      </td>
                      <td>{item.codeDiscount || "none"}</td>
                      <td>
                        {`${checkin.getDate()}/${
                          checkin.getMonth() + 1
                        }/${checkin.getFullYear()}`}
                      </td>
                      <td>
                        {`${checkout.getDate()}/${
                          checkout.getMonth() + 1
                        }/${checkout.getFullYear()}`}
                      </td>
                      <td>{item.status}</td>

                      <td>{item.paymethod}</td>

                      <td>${item.totalCost}</td>
                      <td>
                        {item.status === "NEW" && (
                          <button
                            className="btn-danger"
                            onClick={() => {
                              dispatch(
                                editBooking(
                                  {
                                    status: "CANCEL",
                                    totalCost: parseInt(item.totalCost) * 0.2,
                                  },
                                  item.id,
                                  {
                                    idUser: users.id,
                                  }
                                )
                              );
                              notify();
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Pagination
            defaultCurrent={1}
            total={
              dataBooking.pagination ? dataBooking.pagination._totalRows : 0
            }
            onChange={(currentPage) => {
              dispatch(
                getBookingRoom({
                  idUser: users.id,
                  _page: currentPage,
                  _limit: 5,
                })
              );
            }}
          />
        </div>
      </section>
    </main>
  );
}

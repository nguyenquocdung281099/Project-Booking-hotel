import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import {
  editBooking,
  editUser,
  getBookingRoom,
  getroom,
  getUserCurrent,
  updateInformationUser,
} from "../../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination, Popconfirm, Form, Input, Button, Space } from "antd";
import "antd/dist/antd.css";
import { RestClient } from "../../../redux/saga-midleware/callApi";
import { KEY_TOKEN } from "../../const/const";
import { Modal } from "antd";
import { isEmpty } from "lodash";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userCurrent);
  console.log(users);
  const { t } = useTranslation();
  const dataBooking = useSelector((state) => state.booking.booking);
  console.log(dataBooking);
  const dataRoom = useSelector((state) => state.room);

  const onFinish = (values) => {
    dispatch(
      updateInformationUser({
        email: users.email,
        requestData: {
          ...values,
        },
      })
    );
  };

  const getUser = async () => {
    const email = JSON.parse(localStorage.getItem("emailUser"));
    if (email) {
      dispatch(getUserCurrent({ requestData: { email } }));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getUser();
  }, []);

  useEffect(() => {
    if (users?.id) {
      dispatch(getBookingRoom({ id: users.id }));
    }
  }, [users]);

  function handleCancelBooking(item) {
    dispatch(
      editBooking(
        {
          status: "CANCEL",
          totalCost: parseInt(parseInt(item.totalCost) * 0.2),
        },
        item.id,
        {
          idUser: users.id,
        }
      )
    );
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <main className="profile__page container-fluid">
      <ToastContainer />

      <section className="aboutus__main--banner">
        <EdgeTop />
        <h1 className="main--banner__title">{t("Profile")}</h1>
        <EdgeBottom />
      </section>
      <section className="profiel__page--body wrap container mt-5 pb-5">
        <div className="row ">
          <div className="col-12 col-md-4 profile_left pt-3">
            <img
              src={users.avatar || "https://www.bootdey.com/img/Content/avatar/avatar7.png"}
              alt="imgUser"
            />
            <h3>{users.userName}</h3>
            <address>{users.address}</address>
            <div className="change_pass">
              <i class="fas fa-pen mr-2" onClick={showModal}></i>
            </div>
          </div>
          <div className="profile__main col-12 col-md-7 ml-5 p-3 ">
            <Modal
              title="EDIT PROFILE MODAL"
              visible={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
              }}
              className="information"
              style={{ width: 700 }}
            >
              <Form
                name="basic"
                initialValues={{ ...users }}
                onFinish={(value) => {
                  onFinish(value);
                  setIsModalVisible(false);
                }}
                autoComplete="off"
              >
                <div className="modal-information">
                  <div className="information-item">
                    <div className="title">Email</div>
                    <Form.Item name="email" disabled={true} style={{ width: "100%" }}>
                      <Input disabled={true} />
                    </Form.Item>
                  </div>
                  <div className="information-item">
                    <div className="title">Full Name</div>
                    <Form.Item
                      name="fullName"
                      rules={[{ required: true, message: "Please input your Fullname!" }]}
                      style={{ width: "100%" }}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="information-item">
                    <div className="title">User Name</div>
                    <Form.Item
                      name="userName"
                      rules={[{ required: true, message: "Please input your username!" }]}
                      style={{ width: "100%" }}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="information-item">
                    <div className="title">Avatar</div>
                    <Form.Item name="avatar" style={{ width: "100%" }}>
                      <Input />
                    </Form.Item>
                  </div>{" "}
                  <div className="information-item">
                    <div className="title">Phone</div>
                    <Form.Item
                      name="phone"
                      // rules={[
                      //   { type: Number, message: "type phone is number" },
                      //   { min: 10, message: "must be min 10 number" },
                      //   { max: 11, message: "must be max 10 number" },
                      // ]}
                      disabled={true}
                      style={{ width: "100%" }}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <Space align="end">
                  <Button type="ghost"> Cancel </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form>
            </Modal>
            <div className="information">
              <div className="information-item">
                <div className="title">Email</div>
                <input type="text" className="content" value={users.email} disabled />
              </div>
              <div className="information-item">
                <div className="title">Address</div>
                <input type="text" className="content" value={users.address} disabled={true} />
              </div>
              <div className="information-item">
                <div className="title">User Name</div>
                <input type="text" className="content" value={users.userName} disabled={true} />
              </div>
              <div className="information-item">
                <div className="title">Phone</div>
                <input type="text" className="content" value={users.phone} disabled={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="history__booking_main mt-5 pb-5">
          <h3>{t("History Booking")}</h3>
          {dataBooking ? (
            <>
              <table class="table history__booking pb-5 mt-5  ">
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
                  {dataBooking.data.map((item, index) => {
                    const checkin = new Date(item.dateStart);
                    const checkout = new Date(item.dateEnd);
                    return (
                      <tr key={index}>
                        <th scope="col">{index + 1}</th>
                        <td>
                          {/* {dataRoom.rooms.map((element) => {
                            return item.idroom === element.id && element.name;
                          })} */}
                          aaa
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

                        <td>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.totalCost)}
                        </td>
                        <td>
                          {item.status === "NEW" && (
                            <Popconfirm
                              title="Do you really want to cancel the room? you will lose 20% of the cost"
                              onConfirm={() => {
                                handleCancelBooking(item);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <button className="btn-danger">Cancel</button>
                            </Popconfirm>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* <Pagination
                defaultCurrent={1}
                total={dataBooking.pagination ? dataBooking.pagination._totalRows : 0}
                onChange={(currentPage) => {
                  dispatch(
                    getBookingRoom({
                      idUser: users.id,
                      _page: currentPage,
                      _limit: 5,
                    })
                  );
                }}
              /> */}
            </>
          ) : (
            t("empty booking history")
          )}
        </div>
      </section>
    </main>
  );
}

const utilizeFocus = () => {
  const ref = React.createRef();
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  return { setFocus, ref };
};

import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function SignUpPage() {
  const [data, setdata] = useState({});
  const [dataError, setdataError] = useState({
    name: "*",
    phone: "*",
    email: "*",
    address: "*",
    birthday: "*",
    userName: "*",
    password: "*",
    rePassword: "*",
  });
  const user = [
    "nguyenvana",
    "nguyenvanb",
    "nguyenvanc",
    "nguyenvand",
    "nguyenvane",
  ];
  function SignIn(e) {
    e.preventDefault();
    let dataErrors = {};
    const {
      name,
      phone,
      email,
      address,
      birthday,
      userName,
      password,
      rePassword,
    } = data;

    //  ? name
    if (name === "") {
      dataErrors = { ...dataErrors, name: "please fill out your name" };
    } else {
      dataErrors = { ...dataErrors, name: "" };
    }
    // phone ?
    if (phone === "") {
      dataErrors = { ...dataErrors, phone: "please fill out your phone" };
    } else {
      const phoneno = /^\d{10}$/;
      if (!phoneno.test(phone)) {
        dataErrors = { ...dataErrors, phone: "please format your phone" };
      } else {
        dataErrors = { ...dataErrors, phone: "" };
      }
    }
    //email
    if (email === "") {
      dataErrors = { ...dataErrors, email: "please fill out your email" };
    } else {
      const emailno =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailno.test(email)) {
        dataErrors = { ...dataErrors, email: "please format your email" };
      } else {
        dataErrors = { ...dataErrors, email: "" };
      }
    }
    //  ? add
    if (address === "") {
      dataErrors = { ...dataErrors, address: "please fill out your address" };
    } else {
      dataErrors = { ...dataErrors, address: "" };
    }
    //? birthday
    if (!birthday) {
      dataErrors = { ...dataErrors, birthday: "please fill out your birthday" };
    } else {
      dataErrors = { ...dataErrors, birthday: "" };
    }
    // ?userName
    if (userName === "") {
      dataErrors = { ...dataErrors, userName: "please fill out your userName" };
    } else {
      if (user.findIndex((item) => item === userName) !== -1) {
        dataErrors = {
          ...dataErrors,
          userName: "This user name already in use",
        };
      } else {
        dataErrors = {
          ...dataErrors,
          userName: "",
        };
      }
    }
    // ? password
    if (password === "") {
      dataErrors = { ...dataErrors, password: "please fill out your password" };
    } else {
      const passwordno = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!passwordno.test(password)) {
        dataErrors = {
          ...dataErrors,
          password:
            "password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        };
      } else {
        dataErrors = { ...dataErrors, password: "" };
      }
    }
    if (rePassword === "") {
      dataErrors = {
        ...dataErrors,
        rePassword: "please fill out your re-password",
      };
    } else {
      if (rePassword !== password) {
        dataErrors = {
          ...dataErrors,
          rePassword: "re-password not equal password",
        };
      } else {
        dataErrors = { ...dataErrors, rePassword: "" };
      }
    }
    console.log(data);
    setdataError({ ...dataErrors });
  }

  return (
    <main className="signinpage__body">
      <section className="signinpage__body--banner">
        <EdgeTop />
        <h1 className="main--banner__title">Sign up</h1>
        <EdgeBottom />
      </section>
      <section class="signup__page">
        <div class="signup__page--wrap container p-5">
          <form id="information__form">
            <h2 class=" mb-3">YOUR INFORMATION</h2>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">Name :</label>
                <input
                  class="form-control"
                  id="name"
                  type="text"
                  onChange={(e) => {
                    setdata({ ...data, name: e.target.value });
                  }}
                />
                <span id="name_error" style={{ color: "red" }}>
                  {dataError.name}
                </span>
              </div>
              <div class="form-group col-md-6">
                <label for="tel">Number Phone : </label>
                <input
                  class="form-control"
                  id="tel"
                  type="tel"
                  onChange={(e) => {
                    setdata({ ...data, phone: e.target.value });
                  }}
                />
                <span id="tel_error" style={{ color: "red" }}>
                  {dataError.phone}
                </span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="mail">Email :</label>
                <input
                  class="form-control"
                  id="mail"
                  type="email"
                  onChange={(e) => {
                    setdata({ ...data, email: e.target.value });
                  }}
                />
                <span id="email_error" style={{ color: "red" }}>
                  {dataError.email}
                </span>
              </div>
              <div class="form-group col-md-6">
                <label for="address">Address:</label>
                <input
                  class="form-control"
                  id="address"
                  type="text"
                  onChange={(e) => {
                    setdata({ ...data, address: e.target.value });
                  }}
                />
                <span id="address_error" style={{ color: "red" }}>
                  {dataError.address}
                </span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="date">Birthday :</label>
                <input
                  class="form-control"
                  id="date"
                  type="date"
                  onChange={(e) => {
                    setdata({ ...data, birthday: e.target.value });
                  }}
                />
                <span id="date_error" style={{ color: "red" }}>
                  {dataError.birthday}
                </span>
              </div>
              <div class="form-group col-md-6">
                <label for="userName">UserName:</label>
                <input
                  class="form-control"
                  id="userName"
                  type="text"
                  onChange={(e) => {
                    setdata({ ...data, userName: e.target.value });
                  }}
                />
                <span id="username_error" style={{ color: "red" }}>
                  {dataError.userName}
                </span>
              </div>
            </div>
            <h2 class=" mb-3">INFOR ACCOUNT </h2>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="password">Password :</label>
                <input
                  class="form-control"
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setdata({ ...data, password: e.target.value });
                  }}
                />
                <span id="password_error" style={{ color: "red" }}>
                  {dataError.password}
                </span>
              </div>
              <div class="form-group col-md-6">
                <label for="re-password">Re-enter Password :</label>
                <input
                  class="form-control"
                  id="re-password"
                  type="password"
                  onChange={(e) => {
                    setdata({ ...data, rePassword: e.target.value });
                  }}
                />
                <span id="re-password_error" style={{ color: "red" }}>
                  {dataError.rePassword}
                </span>
              </div>
            </div>
            <Link to="/login" className="btn" onClick={SignIn}>
              SIGN UP
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

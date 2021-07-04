import "./style.css";
import Banner from "../../component/component-userpage/share/banner";

import Button from "../../component/component-userpage/share/button";
import { useState } from "react";
export default function LoginPage() {
  const [data, setdata] = useState({});
  const [dataError, setdataError] = useState({
    userName: "*",
    password: "*",
  });
  function HandleLoginBtn(e) {
    const { userName, password } = data;
    let dataErrors = {};
    if (userName === "") {
      dataErrors = { ...dataErrors, userName: "please fillout your username" };
    } else {
      dataErrors = { ...dataErrors, userName: "" };
    }
    if (password === "") {
      dataErrors = { ...dataErrors, password: "please fillout your password" };
    } else {
      dataErrors = { ...dataErrors, password: "" };
    }
    setdataError({ ...dataErrors });
  }
  return (
    <main className="loginpage__main">
      <section className="loginpage__header ">
        <Banner title="LOG IN" content="Login " />
      </section>
      <section className="signin__container">
        <div className="signin__container--wrap container">
          <div className="signin__body row p-4">
            <div className="signin__body--information col-lg-6 col-12 mb-5">
              <h2 className="information__title mb-5 ">Your infomation</h2>
              <form className="information__form" id="information__form">
                <div className="form-group mb-4">
                  <label for="email__signin">Your UserName:</label>
                  <input
                    onChange={(e) => {
                      setdata({
                        ...data,
                        userName: e.target.value,
                      });
                    }}
                    className="form-control"
                    id="userName__signin"
                    type="userName"
                    aria-describedby="userNameHelp"
                    placeholder="your userName"
                  />
                  <span id="userName_error" style={{ color: "red" }}>
                    {dataError.userName}
                  </span>
                </div>
                <div className="form-group mb-4">
                  <label for="password__signin">Your Password :</label>
                  <input
                    className="form-control"
                    id="password__signin"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setdata({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                  />
                  <span id="password_error" style={{ color: "red" }}>
                    {dataError.password}
                  </span>
                </div>
                <input
                  className="btn"
                  type="button"
                  value="SIGN UP"
                  id="btnsubmit"
                  onClick={() => {
                    HandleLoginBtn();
                  }}
                />
              </form>
            </div>
            <div className="signin__body--notAccount col-lg-6 col-12">
              <h2 className="notAccount__title mb-5 ">
                Do not havent Acount ?
              </h2>
              <p className="notAccount__content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad
                mini veniam, quis nostrud exercitation.
              </p>
              <Button url="/signup" content="SIGN UP" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

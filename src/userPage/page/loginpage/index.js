import "./style.css";
import Banner from "../../component/component-userpage/share/banner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../component/component-userpage/share/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { login, signUpTO } from "../../../redux/action";
import { Redirect } from "react-router-dom";
export default function LoginPage() {
  const loginErr = useSelector((state) => state.user.isLoginERR);
  const userAuth = useSelector((state) => state.user);

  const [data, setdata] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const [dataError, setdataError] = useState({
    userName: "*",
    password: "*",
  });

  const notify = () => toast.success("login success!");
  const notifyErr = () =>
    toast.success("login err! you need re-enter password or email");

  const { t } = useTranslation();

  function HandleLoginBtn(e) {
    const { email, password } = data;
    let dataErrors = { userName: "*", password: "*" };
    if (email === "") {
      dataErrors = {
        ...dataErrors,
        userName: t("please fillout your mail"),
      };
    } else {
      delete dataErrors.userName;
    }
    if (password === "") {
      dataErrors = {
        ...dataErrors,
        password: t("please fillout your password"),
      };
    } else {
      dataErrors = { ...dataErrors, password: "" };
      delete dataErrors.password;
    }
    setdataError({ ...dataErrors });
    if (Object.keys(dataErrors).length === 0) {
      dispatch(login(data));
    }
  }

  useEffect(() => {
    if (loginErr === true) {
      notifyErr();
    }
  }, [loginErr]);

  useEffect(() => {
    dispatch(signUpTO());
  }, []);
  if (userAuth.isLogin === true) {
    notify();
    if (userAuth.isAuthen === true) {
      return <Redirect exact to="/admin" />;
    } else {
      return <Redirect exact to="/" />;
    }
  }

  return (
    <main className="loginpage__main">
      <ToastContainer />
      <section className="loginpage__header ">
        <Banner title="LOG IN" content="Login " />
      </section>
      <section className="signin__container">
        <div className="signin__container--wrap container">
          <div className="signin__body row p-4">
            <div className="signin__body--information col-lg-6 col-12 mb-5">
              <h2 className="information__title mb-5 ">
                {t("Your infomation")}
              </h2>
              <form className="information__form" id="information__form">
                <div className="form-group mb-4">
                  <label for="email__signin">{t("Your UserName:")}</label>
                  <input
                    onChange={(e) => {
                      setdata({
                        ...data,
                        email: e.target.value,
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
                  <label for="password__signin">{t("Your Password :")}</label>
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
                  className="btn-custom "
                  type="button"
                  value={t("LOGIN")}
                  id="btnsubmit"
                  onClick={() => {
                    HandleLoginBtn();
                  }}
                />
              </form>
            </div>
            <div className="signin__body--notAccount col-lg-6 col-12">
              <h2 className="notAccount__title mb-5 ">{t("notacount")}</h2>
              <p className="notAccount__content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad
                mini veniam, quis nostrud exercitation.
              </p>
              <Button url="/signup" content={t("SIGN UP")} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

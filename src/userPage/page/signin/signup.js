import EdgeBottom from "../../component/component-userpage/HomePage/edge";
import EdgeTop from "../../component/component-userpage/HomePage/edgeTop";
import "./style.css";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { addUser, signUpTO } from "../../../redux/action";
export default function SignUpPage() {
  const isSignUpEr = useSelector((state) => state.user.isSignUpEr);
  const toastEr = () => toast.warning("Email already used !");
  const toastSc = () => toast.warning("sign in success !");

  useEffect(() => {
    if (isSignUpEr === true) {
      toastEr();
    }
  }, [isSignUpEr]);
  const [data, setdata] = useState({
    idRole: "user1",
    name: "",
    phone: "",
    email: "",
    address: "",
    birthday: "",
    userName: "",
    password: "",
    rePassword: "",
  });
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
  const dispatch = useDispatch();
  // const [isSignUp, setIsSignUp] = useState(false);
  const { t } = useTranslation();
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
      dataErrors = { ...dataErrors, name: t("please fill out your name") };
    } else {
      delete dataErrors.name;
    }
    // phone ?
    if (phone === "") {
      dataErrors = { ...dataErrors, phone: t("please fill out your phone") };
    } else {
      const phoneno = /^\d{10}$/;
      if (!phoneno.test(phone)) {
        dataErrors = { ...dataErrors, phone: t("please format your phone") };
      } else {
        delete dataErrors.phone;
      }
    }
    //email
    if (email === "") {
      dataErrors = { ...dataErrors, email: t("please fill out your email") };
    } else {
      const emailno =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailno.test(email)) {
        dataErrors = { ...dataErrors, email: t("please format your email") };
      } else {
        delete dataErrors.email;
      }
    }
    //  ? add
    if (address === "") {
      dataErrors = {
        ...dataErrors,
        address: t("please fill out your address"),
      };
    } else {
      delete dataErrors.address;
    }
    //? birthday
    if (!birthday) {
      dataErrors = {
        ...dataErrors,
        birthday: t("please fill out your birthday"),
      };
    } else {
      delete dataErrors.birthday;
    }
    // ?userName
    if (userName === "") {
      dataErrors = {
        ...dataErrors,
        userName: t("please fill out your userName"),
      };
    } else {
      delete dataErrors.userName;
    }
    // ? password
    if (password === "") {
      dataErrors = {
        ...dataErrors,
        password: t("please fill out your password"),
      };
    } else {
      const passwordno = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!passwordno.test(password)) {
        dataErrors = {
          ...dataErrors,
          password: t("passwordRule"),
        };
      } else {
        delete dataErrors.password;
      }
    }
    if (rePassword === "") {
      dataErrors = {
        ...dataErrors,
        rePassword: t("please fill out your re-password"),
      };
    } else {
      if (rePassword !== password) {
        dataErrors = {
          ...dataErrors,
          rePassword: t("re-password not equal password"),
        };
      } else {
        delete dataErrors.rePassword;
      }
    }

    if (Object.keys(dataErrors).length === 0) {
      dispatch(addUser(data));
    }
    setdataError({ ...dataErrors });
  }
  const isSignUpSC = useSelector((state) => state.user.isSignUpSC);
  if (isSignUpSC === true) {
    toastSc();
    return <Redirect to="/login" />;
  }

  return (
    <main className="signinpage__body">
      <ToastContainer />
      <section className="signinpage__body--banner">
        <EdgeTop />
        <h1 className="main--banner__title">Sign up</h1>
        <EdgeBottom />
      </section>
      <section class="signup__page">
        <div class="signup__page--wrap container p-5">
          <form id="information__form">
            <h2 class=" mb-3">{t("YOUR INFORMATION")}</h2>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">{t("Name")} :</label>
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
                <label for="tel">{t("Number Phone")} : </label>
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
                <label for="address">{t("Address")}:</label>
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
                <label for="date">{t("Birthday")} :</label>
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
                <label for="userName">{t("UserName")}:</label>
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
            <h2 class=" mb-3">{t("INFORMATION ACCOUNT ")}</h2>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="password">{t("Password ")}:</label>
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
                <label for="re-password">{t("Re-enter Password")} :</label>
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
            <Link to="/login" className="btn-custom " onClick={SignIn}>
              {t("SIGN UP")}
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

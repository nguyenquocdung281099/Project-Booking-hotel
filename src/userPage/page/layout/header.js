import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KEY_TOKEN } from "../../const/const";
import { useDispatch, useSelector } from "react-redux";
import { getuser, logout } from "../../../redux/action";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const notify = () => toast.success("logout success!");
  const dispatch = useDispatch();
  const defaultHeaderClassName = "main_h";
  const [headerClassName, setHeaderClassName] = React.useState(
    defaultHeaderClassName
  );
  const [showHeader, setShowHeader] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(true);

  const didScrollPage = (e) => {
    const headerStickyOffset = 50;
    if (window.scrollY >= headerStickyOffset) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  const token = localStorage.getItem(KEY_TOKEN);
  let dataUser = "";
  if (token !== null) dataUser = jwt_decode(token);
  const { t, i18n } = useTranslation();
  let [path, setpath] = useState("");
  let match = useLocation();
  useEffect(() => {
    dispatch(getuser(`users?email=${dataUser.email}`));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", debounce(didScrollPage, 50));
    return () => {
      window.removeEventListener("keydown", didScrollPage);
    };
  }, []);

  const onClickMobileMenu = (e) => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    setHeaderClassName(
      `main_h ${showHeader ? "sticky " : "transparent"} ${
        isOpened ? "open-nav " : ""
      }`
    );
  }, [isOpened, showHeader]);

  useEffect(() => {
    setpath(match.pathname);
  }, [match]);

  const Routers = [
    {
      name: t("Home"),
      url: "/",
    },
    {
      name: t("About"),
      url: "/about",
    },
    {
      name: t("Room"),
      url: "/room",
    },
    {
      name: t("Service"),
      url: "/service",
    },
    {
      name: t("Contact"),
      url: "/contact",
    },
    {
      name: t("News"),
      url: "/news",
    },
    {
      name: t("Gallery"),
      url: "/gallery",
    },
  ];
  const infor = useSelector((state) => state.user.user) || [];
  return (
    <div>
      <header className={headerClassName}>
        <div className="header container">
          <a className="logo" href="/">
            <img
              src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/thegem-logos/logo_a76c58a77ec3ee3701b27d7d4b43297e_1x.png"
              alt="logo"
            />
          </a>

          <div className="mobile-toggle" onClick={onClickMobileMenu}>
            <span />
            <span />
            <span />
          </div>
          <nav>
            <ToastContainer />
            <ul>
              {Routers.map((item) => {
                return (
                  <li className={path === `${item.url}` && "active"}>
                    <Link to={item.url}>{t(item.name)}</Link>
                  </li>
                );
              })}

              <li className={path === "active"}>
                {token ? (
                  <Link
                    to="/"
                    onClick={() => {
                      notify();
                      localStorage.removeItem(KEY_TOKEN);
                      localStorage.removeItem("KEY_AUTHEN");
                      dispatch(logout());
                    }}
                  >
                    {t("logout")}
                    <i class="fas fa-sign-out-alt"></i>
                  </Link>
                ) : (
                  <Link to="/login">
                    {t("Login")}
                    <i class="fas fa-sign-in-alt"></i>
                  </Link>
                )}
              </li>
              <li>
                {infor.length !== 0 && token !== null && (
                  <Link to="/profile">
                    {t("USER")} <i class="far fa-user"></i>
                  </Link>
                )}
              </li>
              <div>
                <button
                  className="btn-flag ml-3"
                  onClick={() => i18n.changeLanguage("vi")}
                >
                  vi
                </button>
                <button
                  className="btn-flag"
                  onClick={() => i18n.changeLanguage("en")}
                >
                  en
                </button>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

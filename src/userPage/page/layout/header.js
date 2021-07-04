import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
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

  React.useEffect(() => {
    window.addEventListener("scroll", debounce(didScrollPage, 50));
    return () => {
      window.removeEventListener("keydown", didScrollPage);
    };
  }, []);

  const onClickMobileMenu = (e) => {
    setIsOpened(!isOpened);
  };

  React.useEffect(() => {
    setHeaderClassName(
      `main_h ${showHeader ? "sticky " : "transparent"} ${
        isOpened ? "open-nav " : ""
      }`
    );
  }, [isOpened, showHeader]);
  let [path, setpath] = useState("");
  let match = useLocation();
  useEffect(() => {
    setpath(match.pathname);
  }, [match]);
  const Routers = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Room",
      url: "/room",
    },
    {
      name: "Service",
      url: "/service",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "News",
      url: "/news",
    },
    {
      name: "Gallery",
      url: "/gallery",
    },
    {
      name: "Login",
      url: "/login",
    },
  ];
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
            <ul>
              {Routers.map((item, key) => {
                return (
                  <li className={path === `${item.url}` && "active"}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

import "./style.css";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../../adminPage/component/component_staffpage/header/header";
import Sidebar from "../../adminPage/component/component_staffpage/sidebar/sidebar";

import { KEY_TOKEN } from "../../adminPage/const/const";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getuser, getUserDB } from "../../redux/action";
import jwt_decode from "jwt-decode";

export default function PrivateRoute({ component: Component, ...rest }) {
  const fakeAuthe = useSelector((state) => state.user.isAuthen);
  console.log(fakeAuthe);

  const dispatch = useDispatch();
  const token = localStorage.getItem(KEY_TOKEN);
  let listUser = useSelector((state) => state.userDB.userDB);
  let emailUser = { email: "" };
  if (token !== null) emailUser = jwt_decode(token);

  useEffect(() => {
    dispatch(getuser(`users?email=${emailUser.email}`));
    dispatch(getUserDB());
    // eslint-disable-next-line
  }, []);

  const lData =
    listUser.length !== 0 &&
    listUser !== null &&
    typeof listUser !== "undefined"
      ? listUser.find((e) => e.email === emailUser.email)
      : "null";

  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuthe === true ? (
          <div className="mainstaff-wrapper">
            <Header />
            <Sidebar {...lData} />
            <div className="staffpage_wrapper">
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

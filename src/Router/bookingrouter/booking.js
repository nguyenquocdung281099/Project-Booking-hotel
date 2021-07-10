// import KEY_TOKEN from "../../userPage/const/const";
import { Route, Redirect } from "react-router-dom";
import { KEY_TOKEN } from "../../userPage/const/const";

export default function BookingRoute({ component: Component, ...rest }) {
  const isLogin = localStorage.getItem(KEY_TOKEN) && true;
  console.log(isLogin);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

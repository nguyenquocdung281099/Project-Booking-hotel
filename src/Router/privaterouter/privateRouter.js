import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const fakeAuthe = localStorage.getItem("KEY_AUTHEN") && true;
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuthe === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

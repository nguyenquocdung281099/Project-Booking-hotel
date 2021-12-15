import { Route, Switch } from "react-router-dom";

import BookingsManager from "./component/BookingsManager";
import Dashboard from "./component/Dashboard";
import RoomsManager from "./component/RoomsManager";
import "./style.scss";
export default function AdminMain() {
  return (
    <div className="AdminMain">
      <Switch>
        <Route exact path={"/admin"} component={Dashboard} />
        <Route path="/admin/bookings" component={BookingsManager} />
        <Route path="/admin/rooms" component={RoomsManager} />
      </Switch>
    </div>
  );
}

import HomePage from "./userPage/page/homepage/index";

import { Switch } from "react-router-dom";
import RouterPublic from "./Router/publicRouter/publicrouter";
import AboutUsPage from "./userPage/page/aboutUsPage/index";
import LoginPage from "./userPage/page/loginpage/index";
import SignUpPage from "./userPage/page/signin/signup";
import RoomsPage from "./userPage/page/roompage/index";
import PrivateRoute from "./Router/privaterouter/privateRouter";
import ProfilePage from "./userPage/page/profile/profile";
import RoomDetailPage from "./userPage/page/roomDetail/roomDetail";
import BookingRoute from "./Router/bookingrouter/booking";
import BookingPage from "./userPage/page/bookingPage";
import Dashboard from "./adminPage/component/component_staffpage/dashboard/dashboard";
import ListUsers from "./adminPage/component/component_staffpage/system/system_listUsers/listUsers";
import ListPromos from "./adminPage/component/component_staffpage/setup/setup_listPromos/listPromos";
import ListRooms from "./adminPage/component/component_staffpage/setup/setup_listRooms/listRooms";
import ListServices from "./adminPage/component/component_staffpage/setup/setup_listServices/listServices"
import ListBookings from "./adminPage/component/component_staffpage/operation/operation_listBookings/listBookings";


export default function Page() {
  return (
    <div className="page">
      <Switch>
        <RouterPublic exact path="/" component={HomePage} />
        <RouterPublic path="/about" component={AboutUsPage} />
        <RouterPublic path="/room" component={RoomsPage} />
        <RouterPublic path="/detailRooms/:id" component={RoomDetailPage} />
        <RouterPublic path="/login" component={LoginPage} />
        <RouterPublic path="/signup" component={SignUpPage} />

        <BookingRoute path="/profile" component={ProfilePage} />
        <BookingRoute path="/booking" component={BookingPage} />

        <PrivateRoute path="/admin/dashboard" component={Dashboard} />
        <PrivateRoute path="/admin/list_users" component={ListUsers} />
        <PrivateRoute path="/admin/list_promos" component={ListPromos} />
        <PrivateRoute path="/admin/list_rooms" component={ListRooms} />
        <PrivateRoute path="/admin/list_services" component={ListServices} />
        <PrivateRoute path="/admin/list_bookings" component={ListBookings} />
      </Switch>
    </div>
  );
}

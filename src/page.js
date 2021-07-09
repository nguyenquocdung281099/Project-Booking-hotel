import HomePage from "./userPage/page/homepage/index";

import { Switch } from "react-router-dom";
import RouterPublic from "./Router/publicRouter/publicrouter";
import AboutUsPage from "./userPage/page/aboutUsPage/index";
import LoginPage from "./userPage/page/loginpage/index";
import SignUpPage from "./userPage/page/signin/signup";
import RoomsPage from "./userPage/page/roompage/index";
import PrivateRoute from "./Router/privaterouter/privateRouter";
import StaffPage from "./adminPage/page/staffpage/index";
import ProfilePage from "./userPage/page/profile/profile";

export default function Page() {
  return (
    <div className="page">
      <Switch>
        <RouterPublic exact path="/" component={HomePage} />
        <RouterPublic path="/about" component={AboutUsPage} />
        <RouterPublic path="/room" component={RoomsPage} />
        <RouterPublic path="/profile" component={ProfilePage} />

        <RouterPublic path="/login" component={LoginPage} />
        <RouterPublic path="/signup" component={SignUpPage} />
        <PrivateRoute path="/admin" component={StaffPage} />
      </Switch>
    </div>
  );
}

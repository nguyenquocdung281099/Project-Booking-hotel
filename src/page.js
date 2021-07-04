import HomePage from "./userPage/page/homepage/index";

import { Switch } from "react-router-dom";
import RouterPublic from "./Router/publicRouter/publicrouter";
import AboutUsPage from "./userPage/page/aboutUsPage/index";
import LoginPage from "./userPage/page/loginpage/index";
import SignUpPage from "./userPage/page/signin/signup";
import RoomsPage from "./userPage/page/roompage/index";
export default function Page(props) {
  return (
    <div className="page">
      <Switch>
        <RouterPublic exact path="/" component={HomePage} />
        <RouterPublic path="/about" component={AboutUsPage} />
        <RouterPublic path="/room" component={RoomsPage} />

        <RouterPublic path="/login" component={LoginPage} />
        <RouterPublic path="/signup" component={SignUpPage} />
      </Switch>
    </div>
  );
}

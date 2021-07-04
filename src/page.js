import HomePage from "./page/homepage";

import { Switch } from "react-router-dom";
import RouterPublic from "./Router/publicRouter/publicrouter";
import AboutUsPage from "./page/aboutUsPage";
import LoginPage from "./page/loginpage";
import SignUpPage from "./page/signin/signup";
export default function Page(props) {
  return (
    <div className="page">
      <Switch>
        <RouterPublic exact path="/" component={HomePage} />
        <RouterPublic path="/about" component={AboutUsPage} />
        <RouterPublic path="/login" component={LoginPage} />
        <RouterPublic path="/signup" component={SignUpPage} />
      </Switch>
    </div>
  );
}

import HomePage from "./page/homepage";

import { Switch } from "react-router-dom";
import RouterPublic from "./Router/publicRouter/publicrouter";
import AboutUsPage from "./page/aboutUsPage";
export default function Page(props) {
  return (
    <div className="page">
      <Switch>
        <RouterPublic exact path="/" component={HomePage} />
        <RouterPublic path component={AboutUsPage} />
      </Switch>
    </div>
  );
}

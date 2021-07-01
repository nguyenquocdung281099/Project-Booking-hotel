import Header from "./page/layout/header";
import HomePage from "./page/homepage";
import { Route, Switch } from "react-router-dom";
import Footer from "./page/layout/footer";

export default function Page(props) {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

import "./App.css";
import Page from "./page";
import StaffPage from "./adminPage/page/staffpage/index";
import { Route } from "react-router";
function App() {
  return (
    <div className="App">
      <Route path="/">
        <Page />
      </Route>
      <Route exact path="/admin">
        <StaffPage />
      </Route>
    </div>
  );
}

export default App;

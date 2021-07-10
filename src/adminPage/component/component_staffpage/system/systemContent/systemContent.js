import "./style.css";
import { Switch, Route } from "react-router-dom";
import ListUsers from "../system_listUsers/listUsers";
import ConfigureUser from "../system_configureUser/configureUser";

export default function SystemContent() {
  return (
    <div className='system_content'>
      <Switch>
        <Route path="/admin/system/list_users">
          <ListUsers />
        </Route>
        <Route path="/admin/system/configure_user">
          <ConfigureUser />
        </Route>
      </Switch>
    </div>
  );
}

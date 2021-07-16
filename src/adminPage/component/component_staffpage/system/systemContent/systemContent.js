import "./style.css";
import { Switch, Route } from "react-router-dom";
import ListUsers from "../system_listUsers/listUsers";

export default function SystemContent() {
  return (
    <div className='system_content content'>
      <Switch>
        <Route path="/admin/system/list_users">
          <ListUsers />
        </Route>
      </Switch>
    </div>
  );
}

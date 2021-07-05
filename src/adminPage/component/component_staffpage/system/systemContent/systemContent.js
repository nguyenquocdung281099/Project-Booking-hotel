import './style.css'
import { Switch, Route } from "react-router-dom";
import ListUsers from '../system_listUsers/listUsers'
import ConfigureUser from '../system_configureUser/configureUser'

export default function SystemContent() {
    return (
        <div>
          <Switch>
                <Route path="/system/list_users">
                    <ListUsers />
                </Route>
                <Route path="/system/configure_user">
                    <ConfigureUser />
                </Route>
            </Switch>
        </div>
    )
}
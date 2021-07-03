import './style.css'
import { Switch, Route } from "react-router-dom";
import Dashboard from '../../dashboard/dashboard';
import ListUsers from '../system_listUsers/listUsers'
import AddUser from '../system_addUser/adduser'
import EditUser from '../system_editUser/editUser'

export default function SystemContent() {
    return (
        <div>
          <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/list_users">
                    <ListUsers />
                </Route>
                <Route path="/add_user">
                    <AddUser />
                </Route>
                <Route path="/edit_user">
                    <EditUser />
                </Route>
            </Switch>
        </div>
    )
}
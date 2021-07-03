import './style.css'
import { Switch, Route } from "react-router-dom";
import Dashboard from '../../dashboard/dashboard';
import ListRooms from '../setup_listRooms/listRooms';
import EditRoom from '../setup_editRoom/editRoom'
import ListServices from '../setup_listServices/listServices'
import EditService from '../setup_editService/editService'
import ListPromos from '../setup_listPromos/listPromos';
import AddPromo from '../setup_addPromo/addPromo'
import EditPromo from '../setup_editPromo/editPromo'


export default function SetupContent() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/list_rooms">
                    <ListRooms />
                </Route>
                <Route path="/edit_room">
                    <EditRoom />
                </Route>
                <Route path="/list_services">
                    <ListServices />
                </Route>
                <Route path="/edit_service">
                    <EditService />
                </Route>
                <Route path="/list_promos">
                    <ListPromos />
                </Route>
                <Route path="/add_promo">
                    <AddPromo />
                </Route>
                <Route path="/edit_promo">
                    <EditPromo />
                </Route>
            </Switch>
        </div>
    )
}
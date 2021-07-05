import './style.css'
import { Switch, Route } from "react-router-dom";
import ListRooms from '../setup_listRooms/listRooms';
import ListServices from '../setup_listServices/listServices'
import ListPromos from '../setup_listPromos/listPromos';

export default function SetupContent() {
    return (
        <div>
            <Switch>
                <Route path="/setup/list_rooms">
                    <ListRooms />
                </Route>
                <Route path="/setup/list_services">
                    <ListServices />
                </Route>
                <Route path="/setup/list_promos">
                    <ListPromos />
                </Route>
            </Switch>
        </div>
    )
}
import './style.css'
import { Switch, Route } from "react-router-dom";
import ListRooms from '../setup_listRooms/listRooms';
import ListServices from '../setup_listServices/listServices'
import ListPromos from '../setup_listPromos/listPromos';

export default function SetupContent() {
    return (
        <div className='setup_content content'>
            <Switch>
                <Route path="/admin/setup/list_rooms">
                    <ListRooms />
                </Route>
                <Route path="/admin/setup/list_services">
                    <ListServices />
                </Route>
                <Route path="/admin/setup/list_promos">
                    <ListPromos />
                </Route>
            </Switch>
        </div>
    )
}
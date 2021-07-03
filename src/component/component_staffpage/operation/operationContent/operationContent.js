import './style.css'
import { Switch, Route } from "react-router-dom";
import Dashboard from '../../dashboard/dashboard';
import BookingManagement from '../operation_bookingManagement/bookingManagement';
import EditBooking from '../operation_detailBooking/detailBooking';
import Invoice from '../operation_invoice/invoice';

export default function OperationContent() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/booking_management">
                    <BookingManagement />
                </Route>
                <Route path="/edit_booking">
                    <EditBooking>

                    </EditBooking>
                </Route>
                <Route path="/invoice">
                    <Invoice>

                    </Invoice>
                </Route>
            </Switch>
        </div>
    )
}
import "./style.css";
import { Switch, Route } from "react-router-dom";
import ListBookings from "../operation_listBookings/listBookings";
import DetailBooking from "../operation_detailBooking/detailBooking";
import Invoice from "../operation_invoice/invoice";

export default function OperationContent() {
  return (
    <div className='operation_content'>
      <Switch>
        <Route path="/admin/operation/list_bookings">
          <ListBookings />
        </Route>
        <Route path="/admin/operation/detail_booking">
          <DetailBooking />
        </Route>
        <Route path="/admin/operation_invoice">
          <Invoice></Invoice>
        </Route>
      </Switch>
    </div>
  );
}

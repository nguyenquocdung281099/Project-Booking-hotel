import "./style.css";
import { Switch, Route } from "react-router-dom";
import ListBookings from "../operation_listBookings/listBookings";
import Invoice from "../operation_invoice/invoice";

export default function OperationContent() {
  return (
    <div className='operation_content content'>
      <Switch>
        <Route path="/admin/operation/list_bookings">
          <ListBookings />
        </Route>
        <Route path="/admin/operation_invoice">
          <Invoice></Invoice>
        </Route>
      </Switch>
    </div>
  );
}

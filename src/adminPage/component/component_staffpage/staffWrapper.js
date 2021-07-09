import { Switch } from "react-router-dom";
import OperationContent from "../../component/component_staffpage/operation/operationContent/operationContent";
import SetupContent from "../../component/component_staffpage/setup/setupContent/setupContent";
import SystemContent from "../../component/component_staffpage/system/systemContent/systemContent";
import Dashboard from "./dashboard/dashboard";
import PrivateRoute from "../../../Router/privaterouter/privateRouter";

export default function StaffWrapper() {
  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <Switch>
        <PrivateRoute path="/admin/dashboard" component={Dashboard} />
        <PrivateRoute path="/admin/operation" component={OperationContent} />
        <PrivateRoute path="/admin/setup" component={SetupContent} />
        <PrivateRoute path="/admin/system" component={SystemContent} />
      </Switch>
    </div>
  );
}

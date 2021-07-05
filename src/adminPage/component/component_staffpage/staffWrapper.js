import { Switch, Route } from "react-router-dom";
import OperationContent from "../../component/component_staffpage/operation/operationContent/operationContent";
import SetupContent from "../../component/component_staffpage/setup/setupContent/setupContent";
import SystemContent from "../../component/component_staffpage/system/systemContent/systemContent";
import Dashboard from "./dashboard/dashboard";

export default function StaffWrapper() {
  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <Switch>
        <Route path="/admin/dashboard">
          <Dashboard />
        </Route>
        <Route path="/admin/operation">
          <OperationContent />
        </Route>
        <Route path="/admin/setup">
          <SetupContent />
        </Route>
        <Route path="/admin/system">
          <SystemContent />
        </Route>
      </Switch>
    </div>
  );
}

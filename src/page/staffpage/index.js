import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Header from '../../component/component_staffpage/header/header';
import Sidebar from '../../component/component_staffpage/sidebar/sidebar';
import OperationContent from '../../component/component_staffpage/operation/operationContent/operationContent';
import SetupContent from '../../component/component_staffpage/setup/setupContent/setupContent';
import SystemContent from '../../component/component_staffpage/system/systemContent/systemContent';

export default function StaffPage() {
    return (
        <div>
            <Header />

            <Sidebar />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <Switch>
                        <Route path="/operation">
                            <OperationContent />
                        </Route>
                        <Route path="/setup">
                            <SetupContent />
                        </Route>
                        <Route path="/system">
                            <SystemContent />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
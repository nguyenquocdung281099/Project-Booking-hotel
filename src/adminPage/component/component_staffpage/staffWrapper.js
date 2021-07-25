// import './style.css'
// import { Switch } from "react-router-dom";
// import OperationContent from "../../component/component_staffpage/operation/operationContent/operationContent";
// import SetupContent from "../../component/component_staffpage/setup/setupContent/setupContent";
// import SystemContent from "../../component/component_staffpage/system/systemContent/systemContent";
// import Dashboard from "./dashboard/dashboard";
// import PrivateRoute from "../../../Router/privaterouter/privateRouter";
// import ListUsers from './system/system_listUsers/listUsers';

// export default function StaffWrapper(props) {
//   let { idRole } = props
//   let loginRole = idRole

//   return (
//     <div className="staffpage_wrapper">
//       <Switch>
//         <PrivateRoute path="/admin/dashboard" component={Dashboard} />
//         {loginRole === 'user4' ?
//           <PrivateRoute path="/admin/operation" component={OperationContent} />
//           : ("")
//         }
//         {loginRole === 'user3' ?
//           <PrivateRoute path="/admin/setup" component={SetupContent} />
//           : ("")
//         }
//         {loginRole === 'user2' ?
//           // <PrivateRoute path="/admin/system" component={SystemContent} />
//           <PrivateRoute path="/admin/list_users" component={ListUsers} />
//           : ("")
//         }
//       </Switch>
//     </div>
//   );
// }
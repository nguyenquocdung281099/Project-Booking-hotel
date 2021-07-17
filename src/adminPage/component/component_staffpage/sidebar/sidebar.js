import "./style.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  let sidebarData = [
    {
      icon: "fas fa-tachometer-alt",
      name: "Dashboard",
      url: "/admin/dashboard",
    },
    {
      icon: "fas fa-suitcase",
      name: "List Bookings",
      url: "/admin/operation/list_bookings",
    },
    {
      icon: "fas fa-ticket-alt",
      name: "List Promotions",
      url: "/admin/setup/list_promos",
    },
    {
      icon: "fas fa-bed",
      name: "List Rooms",
      url: "/admin/setup/list_rooms",
    },

    {
      icon: "fas fa-wrench",
      name: "List Services",
      url: "/admin/setup/list_services",
    },
    {
      icon: "fas fa-users",
      name: "List Users",
      url: "/admin/system/list_users",
    },
  ];
  let sideList = sidebarData.map((item, index) => {
    return (
      <li key={index}>
        <Link to={item.url} className="nav-item nav-link">
          <i className={item.icon} aria-hidden="true"></i>
          {item.name}
        </Link>
      </li>

    );
  });

  return (
    <div class="staff_sidebar" id="sidebar" >
      <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
          <ul>
            {sideList}
          </ul>
        </div>
      </div>
    </div>
  );
}

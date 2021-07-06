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
    {
      icon: "fas fa-users-cog",
      name: "Configure User",
      url: "/admin/system/configure_user",
    },
  ];
  let sideList = sidebarData.map((item, index) => {
    return (
      <Link to={item.url} key={index} className="nav-item nav-link">
        <i className={item.icon} aria-hidden="true"></i>
        {item.name}
      </Link>
    );
  });

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">{sideList}</ul>
      </div>
    </nav>
  );
}

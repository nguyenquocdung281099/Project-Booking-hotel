import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  let { idRole } = props
  let loginRole = idRole

  let sidebarData = [
    {
      icon: "fas fa-tachometer-alt",
      name: "Dashboard",
      url: "/admin/dashboard",
      show: {display: "block"}
    },
    {
      icon: "fas fa-suitcase",
      name: "List Bookings",
      url: "/admin/operation/list_bookings",
      show: loginRole ==='user4'?  {display: "block"} : {display: "none"}
    },
    {
      icon: "fas fa-ticket-alt",
      name: "List Promotions",
      url: "/admin/setup/list_promos",
      show: loginRole ==='user3'?  {display: "block"} : {display: "none"}
    },
    {
      icon: "fas fa-bed",
      name: "List Rooms",
      url: "/admin/setup/list_rooms",
      show: loginRole ==='user3'?  {display: "block"} : {display: "none"}
    },

    {
      icon: "fas fa-wrench",
      name: "List Services",
      url: "/admin/setup/list_services",
      show: loginRole ==='user3'?  {display: "block"} : {display: "none"}
    },
    {
      icon: "fas fa-users",
      name: "List Users",
      url: "/admin/system/list_users",
      show: loginRole ==='user2'?  {display: "block"} : {display: "none"}
    },
  ];

  let sideList = sidebarData.map((item, index) => {
    return (
      
      <li key={index} 
      style={item.show}
      >
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

import BookingsManager from "./component/main/component/BookingsManager";
import Dashboard from "./component/main/component/Dashboard";
import RoomManager from "./component/main/component/RoomsManager";
import UsersManager from "./component/main/component/UsersManager";
import VoucherManager from "./component/main/component/VoucherManager";
import ServiceManager from "./component/main/component/ServiceManager";
import TyperoomManager from "./component/main/component/TypeRoomsManager";
export const sideTitle = [
  {
    path: "",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/dashboard.svg",
    label: "Dashboard",
    component: Dashboard
  },
  {
    path: "rooms",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/3.svg",
    label: "Rooms Manager",
    component: RoomManager

  },
  {
    path: "users",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/5.svg",
    label: "Users Manager",
    component: UsersManager

  },
  {
    path: "bookings",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/6.svg",
    label: "Bookings Manager",
    component: BookingsManager

  },
  {
    path: "voucher",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/7.svg",
    label: "Vouchers Manager",
    component: VoucherManager

  },
  {
    path: "service",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/8.svg",
    label: "Service Manager",
    component: ServiceManager

  },
  {
    path: "typeroom",
    icon: "https://demo.dashboardpack.com/user-management-html/img/menu-icon/9.svg",
    label: "Typerooms Manager",
    component: TyperoomManager

  },
];

export const StatusBooking = {
  NEW : "NEW",
  CANCEL:"CANCEL",
  CHECKIN:"CHECKIN",
  CHECKOUT:"CHECKOUT",
  FINISH:"FINISH",
}
import "./style.css";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TableDashboard from "./tableDashboard/tableDashboard";
import { getpromo } from "../../../../redux/action";

export default function Dashboard() {

  const dispatch = useDispatch();
  const promoData = useSelector((state) => state.promo.promo)
  useEffect(function () {
    dispatch(getpromo());
  }, []);
  console.log(promoData)

  let booking = {
    name: "Booking",
    link: "/admin/operation/list_bookings",
    db: [
      {
        id: "1",
        idroom: "12",
        userID: "13",
        starttime: "",
        endtime: "",
        status: "NEW",
      },
      {
        id: "2",
        idroom: "21",
        userID: "23",
        starttime: "",
        endtime: "",
        status: "NEW",
      },
      {
        id: "3",
        idroom: "33",
        userID: "34",
        starttime: "",
        endtime: "",
        status: "NEW",
      },
    ],
  };

  let room = {
    name: "Room",
    link: "/admin/setup/list_rooms",
    db: [
      {
        "id": "1",
        "name": 101,
        "idtyperoom": 1,
        "status": false,
        "number": 4,
        "rating": 5,
        "pricePerday": 100
      },
      {
        "id": "2",
        "name": 102,
        "idtyperoom": 1,
        "status": false,
        "number": 4,
        "rating": 1,
        "pricePerday": 100,
      },
      {
        "id": "3",
        "name": 103,
        "idtyperoom": 1,
        "status": false,
        "number": 4,
        "rating": 2,
        "pricePerday": 100,
      },
      {
        "id": "4",
        "name": 104,
        "idtyperoom": 1,
        "status": false,
        "number": 4,
        "rating": 0,
        "pricePerday": 100,
      },
      {
        "id": "5",
        "name": 201,
        "idtyperoom": 2,
        "status": false,
        "number": 4,
        "rating": 0,
        "pricePerday": 110,
      }
    ],
  };

  let promotion = {
    name: "Promotion",
    link: "/admin/setup/list_promos",
    db: [
      {
        id: 1,
        name: "giảm giá mùa hè",
        discount: 5,
        startTime: "2021/04/30",
        endTime: "2021/05/30",
      },
      {
        id: 2,
        name: "giảm giá ngày kỉ niệm khách sạn ",
        discount: 10,
        startTime: "2021/09/30",
        endTime: "2021/10/15",
      },
    ],
  };
  let service = {
    name: "Service",
    link: "/admin/setup/list_services",
    db: [
      {
        name: "Dịch vụ Spa",
        price: 50,
      },
      {
        name: "Dịch vụ phòng họp",
        id: 2,
        price: 70,
      },
      {
        name: "Fitness centre",
        id: 3,
        price: 50,
      },
      {
        name: "Dịch vụ phòng 24/24",
        id: 4,
        price: 50,
      },
    ],
  };

  return (
    <div>
      <div class="row">
        <TableDashboard
          name={booking.name}
          link={booking.link}
          db={booking.db}
        />
        <TableDashboard
          name={room.name}
          link={room.link}
          db={room.db}
        />
      </div>
      <div class="row">
        <TableDashboard
          name={promotion.name}
          link={promotion.link}
          db={promotion.db}
        />
        <TableDashboard
          name={service.name}
          link={service.link}
          db={service.db}
        />
      </div>
    </div>
  );
}

import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDashboard from "./tableDashboard/tableDashboard";
import {
  getBookingDB,
  getpromo,
  getroom,
  getservice,
  getuser,
  getUserDB,
} from "../../../../redux/action";
import ChartIncome from "./chartIncome/chartIncome";
import CalendarDash from "./calendarDash/calendarDash";
import ChartPeople from "./chartPeople/chartPeople";
import { KEY_TOKEN } from "../../../const/const";
import jwt_decode from "jwt-decode";

export default function Dashboard() {
  const dispatch = useDispatch();
  const bData = useSelector((state) => state.bookingDB.bookingDB);
  const rData = useSelector((state) => state.room.rooms);
  const pData = useSelector((state) => state.promo.promo);
  const sData = useSelector((state) => state.service.service);
  const uData = useSelector((state) => state.userDB.userDB);

  useEffect(() => {
    dispatch(getBookingDB({}));
    dispatch(getroom({}));
    dispatch(getpromo({}));
    dispatch(getservice({}));
    // eslint-disable-next-line
  }, []);

  const token = localStorage.getItem(KEY_TOKEN);
  let emailUser = { email: "" };
  if (token !== null) emailUser = jwt_decode(token);

  useEffect(() => {
    dispatch(getuser(`users?email=${emailUser.email}`));
    dispatch(getUserDB());
    // eslint-disable-next-line
  }, []);

  console.log(emailUser);

  const userData =
    uData.length !== 0 &&
    uData !== null &&
    typeof uData !== "undefined" &&
    typeof emailUser !== "undefined"
      ? uData.find((e) => e.email === emailUser.email)
      : [];

  // table
  const dummyBData =
    bData.length !== 0 && bData !== null && typeof bData !== "undefined"
      ? bData.slice().sort((a, b) => b.updatedAt - a.updatedAt)
      : [];
  dummyBData.splice(5);
  const bookTData = dummyBData.map(({ id, dateStart, dateEnd, status }) => ({
    id,
    dateStart,
    dateEnd,
    status,
  }));

  const dummyRData =
    rData.length !== 0 && rData !== null && typeof rData !== "undefined"
      ? rData.slice().sort((a, b) => b.updatedAt - a.updatedAt)
      : [];
  dummyRData.splice(5);
  const roomTData = dummyRData.map(
    ({ name, idtyperoom, number, rating, pricePerday }) => ({
      name,
      idtyperoom,
      number,
      rating,
      pricePerday,
    })
  );

  const dummyPData =
    pData.length !== 0 && pData !== null && typeof pData !== "undefined"
      ? pData.slice().sort((a, b) => b.updatedAt - a.updatedAt)
      : [];
  dummyPData.splice(5);
  const promoTData = dummyPData.map(({ name, code, discount, amount }) => ({
    name,
    code,
    discount,
    amount,
  }));

  const dummySData =
    sData.length !== 0 && sData !== null && typeof sData !== "undefined"
      ? sData.slice().sort((a, b) => b.updatedAt - a.updatedAt)
      : [];
  dummySData.splice(5);
  const serviceTData = dummySData.map(({ id, name, price }) => ({
    id,
    name,
    price,
  }));

  const booking = {
    name: "Booking",
    link: "/admin/operation/list_bookings",
    db:
      (bData.length !== 0 || bData !== null) && typeof bData !== "undefined"
        ? bookTData
        : [],
    button:
      typeof uData !== "undefined" &&
      typeof emailUser !== "undefined" &&
      typeof userData !== "undefined"
        ? userData.role === "user4"
          ? true
          : false
        : false,
  };

  const room = {
    name: "Room",
    link: "/admin/setup/list_rooms",
    db:
      (rData.length !== 0 || rData !== null) && typeof rData !== "undefined"
        ? roomTData
        : [],
    button:
      typeof uData !== "undefined" &&
      typeof emailUser !== "undefined" &&
      typeof userData !== "undefined"
        ? userData.role === "user3"
          ? true
          : false
        : false,
  };

  const promotion = {
    name: "Promotion",
    link: "/admin/setup/list_promos",
    db:
      pData.length !== 0 && pData !== null && typeof pData !== "undefined"
        ? promoTData
        : [],
    button:
      typeof uData !== "undefined" &&
      typeof emailUser !== "undefined" &&
      typeof userData !== "undefined"
        ? userData.role === "user3"
          ? true
          : false
        : false,
  };

  const service = {
    name: "Service",
    link: "/admin/setup/list_services",
    db:
      sData.length !== 0 && sData !== null && typeof pData !== "undefined"
        ? serviceTData
        : [],
    button:
      typeof uData !== "undefined" &&
      typeof emailUser !== "undefined" &&
      typeof userData !== "undefined"
        ? userData.role === "user3"
          ? true
          : false
        : false,
  };

  //chartbooking
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const dummyData = bData.map(({ dateEnd, totalCost, status }) => ({
    month: new Date(dateEnd).getMonth() + 1,
    year: new Date(dateEnd).getFullYear(),
    cost:
      status === "CANCEL"
        ? Number.parseFloat(totalCost) * 0.8
        : Number.parseFloat(totalCost),
  }));

  const dummyData2 = bData.map(({ dateEnd, number, status }) => ({
    month: new Date(dateEnd).getMonth() + 1,
    year: new Date(dateEnd).getFullYear(),
    peopleCome: status === "CANCEL" ? 0 : number,
    peopleCancel: status === "CANCEL" ? number : 0,
  }));

  const regTime = [];
  const monthLabels = [];
  const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (var i = 6; i > 0; i -= 1) {
    var today = new Date();
    let d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    let month = monthNumbers[d.getMonth()];
    let year = d.getFullYear();
    let reg = { month, year };
    regTime.push(reg);
  }
  regTime.push({ month: currentMonth, year: currentYear });
  regTime.forEach((e) => {
    monthLabels.push(`${monthNames[e.month - 1]}/${e.year}`);
  });

  const dataIncome = [];
  for (var j = 0; j < 7; j++) {
    let value = 0;
    let regDummy = regTime[j];
    let filterItem = dummyData.filter(
      (item) => item.month === regDummy.month && item.year === regDummy.year
    );
    filterItem.forEach((e) => {
      value += e.cost;
    });
    dataIncome[j] = value;
  }

  const dataPeopleCome = [];
  const dataPeopleCancel = [];
  for (var k = 0; k < 7; k++) {
    let valueCome = 0;
    let valueCancel = 0;
    let regDummy = regTime[k];
    let filterItem = dummyData2.filter(
      (item) => item.month === regDummy.month && item.year === regDummy.year
    );
    filterItem.forEach((e) => {
      valueCome += e.peopleCome;
      valueCancel += e.peopleCancel;
    });
    dataPeopleCome[k] = valueCome;
    dataPeopleCancel[k] = valueCancel;
  }

  const chartIncomeData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Income from last 6 month and current month",
        data: dataIncome,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartPeopleData = {
    labels: monthLabels,
    datasets: [
      {
        data: dataPeopleCome,
        label: "Customer come",
        borderColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        data: dataPeopleCancel,
        label: "Customer cancel",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  return (
    <div className="dashcontent container-fluid">
      <div className="row chart">
        <ChartIncome {...chartIncomeData} />
      </div>

      <div className="row chart">
        <ChartPeople {...chartPeopleData} />
      </div>

      <div className="row calendar">
        <CalendarDash />
      </div>

      <div className="row">
        {bData.length !== 0 &&
        bData !== null &&
        typeof bData !== "undefined" ? (
          <TableDashboard
            name={booking.name}
            link={booking.link}
            db={booking.db}
            button={booking.button}
          />
        ) : (
          ""
        )}

        {rData.length !== 0 &&
        rData !== null &&
        typeof rData !== "undefined" ? (
          <TableDashboard
            name={room.name}
            link={room.link}
            db={room.db}
            button={room.button}
          />
        ) : (
          ""
        )}
      </div>
      <div className="row">
        {pData.length !== 0 &&
        pData !== null &&
        typeof pData !== "undefined" ? (
          <TableDashboard
            name={promotion.name}
            link={promotion.link}
            db={promotion.db}
            button={promotion.button}
          />
        ) : (
          ""
        )}

        {sData.length !== 0 &&
        sData !== null &&
        typeof sData !== "undefined" ? (
          <TableDashboard
            name={service.name}
            link={service.link}
            db={service.db}
            button={service.button}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

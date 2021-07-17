import "./style.css";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableDashboard from "./tableDashboard/tableDashboard";
import { getBookingDB, getpromo, getroom, getservice } from "../../../../redux/action";
import ChartDash from "./chartDash/chartDash";
import CalendarDash from "./calendarDash/calendarDash";

export default function Dashboard() {

  const dispatch = useDispatch();
  const bData = useSelector((state) => state.bookingDB.bookingDB)
  const rData = useSelector((state) => state.room.rooms)
  const pData = useSelector((state) => state.promo.promo)
  const sData = useSelector((state) => state.service.service)

  useEffect(() => {
    const bConfig = { order: `desc`, sort: `updatedAt` }
    const rConfig = { order: `desc`, sort: `updatedAt` }
    const pConfig = { order: `desc`, sort: `updatedAt` }
    const sConfig = { order: `desc`, sort: `updatedAt` }

    dispatch(getBookingDB({ _limit: 5, _order: bConfig.order, _sort: bConfig.sort }));
    dispatch(getroom({ _limit: 5, _order: rConfig.order, _sort: rConfig.sort }))
    dispatch(getpromo({ _limit: 5, _order: pConfig.order, _sort: pConfig.sort }));
    dispatch(getservice({ _limit: 5, _order: sConfig.order, _sort: sConfig.sort }))
    // eslint-disable-next-line
  }, []);

  const bookTData = bData.map(({ id, dateStart, dateEnd, status }) => ({ id, dateStart, dateEnd, status }));
  const roomTData = rData.map(({ id, name, idtyperoom, number, rating, pricePerday }) => ({ id, name, idtyperoom, number, rating, pricePerday }));

  const booking = {
    name: "Booking",
    link: "/admin/operation/list_bookings",
    db: bookTData
  };

  const room = {
    name: "Room",
    link: "/admin/setup/list_rooms",
    db: roomTData
  };

  const promotion = {
    name: "Promotion",
    link: "/admin/setup/list_promos",
    db: pData
  };

  const service = {
    name: "Service",
    link: "/admin/setup/list_services",
    db: sData
  };

  return (
    <div className='dashcontent container-fluid'>
      <div className="row">
        <CalendarDash />
      </div>
      <div className="row">
        <ChartDash />
      </div>
      <div className="row">

        {bData.length !== 0 ?
          <TableDashboard
            name={booking.name}
            link={booking.link}
            db={booking.db}
          />
          : ("")}

        {rData.length !== 0 ?
          <TableDashboard
            name={room.name}
            link={room.link}
            db={room.db}
          />
          : ("")}

      </div>
      <div className="row">

        {pData.length !== 0 ?
          <TableDashboard
            name={promotion.name}
            link={promotion.link}
            db={promotion.db}
          />
          : ("")}

        {sData.length !== 0 ?
          <TableDashboard
            name={service.name}
            link={service.link}
            db={service.db}
          />
          : ("")}

      </div>
    </div>
  );
}

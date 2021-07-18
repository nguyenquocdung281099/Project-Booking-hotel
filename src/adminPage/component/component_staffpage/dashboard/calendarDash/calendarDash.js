import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingDB } from "../../../../../redux/action";


const locales = {
  "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function CalendarDash() {
  const dispatch = useDispatch();
  const calendarData = useSelector((state) => state.bookingDB.bookingDB)
  useEffect(() => {
    dispatch(getBookingDB({}));
    // eslint-disable-next-line
  }, []);

  const data = calendarData.map(({ id, dateStart, dateEnd }) => ({ id, dateStart, dateEnd }));

  const myEventsList = data.map(function (row) {
    return { start: new Date(row.dateStart), end: new Date(row.dateEnd), title: `Room ${row.id}` }
  })

  return (
    <div className='card calendar' >
      <div className="card-header">
        Book Calendar
      </div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>

  )
}
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

const myEventsList = [
  { start: new Date(), end: new Date(), title: "special event" }
];

export default function CalendarDash() {
  const dispatch = useDispatch();
  const calendarData = useSelector((state) => state.bookingDB.bookingDB)
  useEffect(() => {
    dispatch(getBookingDB({ }));
    // eslint-disable-next-line
  }, []);

  console.log(calendarData)

  return (
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  )
}
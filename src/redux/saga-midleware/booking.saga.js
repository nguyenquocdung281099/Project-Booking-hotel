import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";

import queryString from "query-string";
import { get, post } from "./callApi";
import { URL_BOOKING } from "../../adminPage/const/const";

export default function* BookingSaga() {
  yield takeLatest(action.GET_BOOKING_ROOM, getBookingRoom);
  yield takeLatest(action.SET_BOOKING, setBooking);
}

function* getBookingRoom(action) {
  try {
    const url = queryString.stringify(action.payload);
    const booking = yield call(get, `${URL_BOOKING}?${url}`);
    yield put(func_action.getbookingsc(booking.data));
  } catch (e) {}
}

function* setBooking(action) {
  try {
    const booking = yield call(post, URL_BOOKING, action.payload);
    console.log(booking);
  } catch (error) {}
}

import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";

import queryString from "query-string";
import { get, post, patch, RestClient } from "./callApi";
import { URL_BOOKING } from "../../adminPage/const/const";
import { URL_USER } from "../../userPage/const/const";
import { showNotification } from "../../until";

export default function* BookingSaga() {
  yield takeLatest(action.GET_BOOKING_ROOM, getBookingRoom);
  yield takeLatest(action.SET_BOOKING, setBooking);
  yield takeLatest(action.EDIT_BOOKING, editBooking);
  yield takeLatest(action.CHECK_PROMOTION, checkPromotionSage);
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
    yield call(RestClient.post, `${URL_USER}/bookingRoom`, action.payload);
    yield showNotification("success", "booking room success");
  } catch (error) {
    yield showNotification("warning", "booking room fall");
  }
}

function* editBooking(action) {
  try {
    const param = queryString.stringify(action.idUser);
    yield call(patch, ` ${URL_BOOKING}/${action.id}`, action.payload);
    const filter = { ...action.idUser, _page: 1, _limit: 5 };
    const newParam = queryString.stringify(filter);
    const booking = yield call(get, `${URL_BOOKING}?${newParam}`);
    console.log("dawdawd", booking);
    yield put(func_action.getbookingsc(booking.data));
  } catch (error) {
    console.log(error);
  }
}

function* checkPromotionSage(action) {
  try {
    const promotion = yield call(RestClient.post, `${URL_USER}/checkPromotion`, action.data);
    yield put(func_action.checkPromotionSC(promotion));
  } catch (error) {}
}

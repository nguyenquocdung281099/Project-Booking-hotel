import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";

import queryString from "query-string";
import { get, post, patch, RestClient } from "./callApi";
import { URL_USER } from "../../userPage/const/const";
import { showNotification } from "../../until";

export default function* BookingSaga() {
  yield takeLatest(action.GET_BOOKING_ROOM, getBookingRoom);
  yield takeLatest(action.SET_BOOKING, setBooking);
  yield takeLatest(action.CHECK_PROMOTION, checkPromotionSage);
  yield takeLatest(action.GET_BLANK_DATE, getBlankDateSaga);
  yield takeLatest(action.GET_EXTRA_SERVICE, getExtraServiceSaga);
}

function* getBookingRoom(action) {
  try {
    const url = queryString.stringify(action.payload);
    const booking = yield call(RestClient.get, `${URL_USER}/myBooking?${url}`);
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

function* checkPromotionSage(action) {
  try {
    const promotion = yield call(RestClient.post, `${URL_USER}/checkPromotion`, action.data);
    yield put(func_action.checkPromotionSC(promotion.data.data));
    yield showNotification("success", "appy promotion success");
  } catch (error) {
    yield put(func_action.checkPromotionER());
    yield showNotification("warning", "Coupon has expired or has been used ");
  }
}

function* getBlankDateSaga(action) {
  try {
    const DateBlank = yield call(RestClient.get, `${URL_USER}/getBlankDate?id=${action.data}`);
    yield put(func_action.getBlankDateSC(DateBlank.data.data));
  } catch (error) {}
}

function* getExtraServiceSaga(action) {
  try {
    const extraService = yield call(RestClient.get, `${URL_USER}/extraService`);
    console.log("extraService", extraService);
    yield put(func_action.getExtraServiceSC(extraService.data));
  } catch (error) {}
}

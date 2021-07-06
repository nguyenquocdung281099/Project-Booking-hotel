import axios from "axios";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";
import { URL_PROMO, URL_BOOKING, URL_USER, URL_ROOM, URL_SERVICE } from "../../adminPage/const/const";

export default function* AdminSaga() {
  yield takeLatest(action.GET_BOOKING, getBooking);
  // yield takeLatest(action.GET_ROOMDB, getRoomDb);
  yield takeLatest(action.GET_SERVICE, getService);
  yield takeLatest(action.GET_PROMO, getPromo);
  yield takeLatest(action.GET_USER, getUser);
}


function* getBooking() {
  try {
    const booking = yield call(get, URL_BOOKING);

    if (booking.status === 200) {
      console.log('afterif',booking.data)
      yield put(func_action.getbookingsc(booking.data));
    }
  } catch (e) { }
}

// function* getRoomDb() {
//   try {
//     const room = yield call(get, URL_ROOM);
//     if (room.status === 200) {
//       yield put(func_action.getroomsc(room.data));
//     }
//   } catch (e) { }
// }

function* getService() {
  try {
    const service = yield call(get, URL_SERVICE);
    if (service.status === 200) {
      yield put(func_action.getservicesc(service.data));
    }
  } catch (e) { }
}

function* getPromo() {
  try {
    const promo = yield call(get, URL_PROMO);
    yield put(func_action.setloader("none"));
    if (promo.status === 200) {
      yield put(func_action.getpromosc(promo.data));
    }
  } catch (e) { }
}

function* getUser() {
  try {
    const user = yield call(get, URL_USER);
    if (user.status === 200) {
      yield put(func_action.getusersc(user.data));
    }
  } catch (e) { }
}

// ? get api
function get(url) {
  return axios.get(url);
}
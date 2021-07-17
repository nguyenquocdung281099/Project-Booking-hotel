import axios from "axios";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  URL_PROMO,
  URL_BOOKING,
  URL_SERVICE,
  URL_ROOM,
} from "../../adminPage/const/const";
import queryString from "query-string";

export default function* AdminSaga() {
  yield takeLatest(action.GET_BOOKING, getBooking);
  yield takeLatest(action.GET_SERVICE, getService);
  yield takeLatest(action.GET_PROMO, getPromo);
  yield takeLatest(action.ADD_PROMO, addPromo);
  yield takeLatest(action.EDIT_PROMO, editPromo);
  yield takeLatest(action.DEL_PROMO, delPromo);
  yield takeLatest(action.ADD_ROOM, addRoom);
  yield takeLatest(action.EDIT_ROOM, editRoom);
  yield takeLatest(action.DEL_ROOM, delRoom);
  yield takeLatest(action.ADD_SERVICE, addService);
  yield takeLatest(action.EDIT_SERVICE, editService);
  yield takeLatest(action.DEL_SERVICE, delService);
}

function* getBooking() {
  try {
    const booking = yield call(get, URL_BOOKING);
    yield put(func_action.setloader(false));
    if (booking.status === 200) {
      yield put(func_action.getbookingsc(booking.data));
    }
  } catch (e) {}
}

function* getService(action) {
  try {
    const url = queryString.stringify(action.filter);
    const service = yield call(get, `${URL_SERVICE}?${url}`);
    yield put(func_action.setloader(false));
    if (service.status === 200) {
      yield put(func_action.getservicesc(service.data));
    }
  } catch (e) {}
}

function* getPromo(action) {
  try {
    const url = queryString.stringify(action.filter);
    const promo = yield call(get, `${URL_PROMO}?${url}`);
    yield put(func_action.setloader(false));
    if (promo.status === 200) {
      const today = Date.parse(new Date());
      if (
        promo.data[0].amount > 0 &&
        Date.parse(promo.data[0].expiryDate) > today
      ) {
        yield put(func_action.getpromosc(promo.data));
      } else if (
        promo.data.length === 0 ||
        promo.data[0].amount === 0 ||
        Date.parse(promo.data[0].expiryDate) <= today
      ) {
        yield put(func_action.getpromosc([]));
      }
    }
  } catch (e) {
    yield put(func_action.getpromoEr);
  }
}

// ? get api
function get(url) {
  return axios.get(url);
}

function post(url, item) {
  return axios.post(`${url}`, item);
}

function putData(url, data) {
  return axios.put(`${url}/${data.id}`, data);
}

function del(url, id) {
  return axios.delete(`${url}/${id}`);
}

function* addPromo(action) {
  try {
    const promo = yield call(post, URL_PROMO, action.payload);
    if (promo.status === 201) {
      yield put(func_action.addPromoSC(promo.data));
    }
  } catch (e) {}
}

function* editPromo(action) {
  try {
    console.log(action.payload);
    const promo = yield call(putData, URL_PROMO, action.payload);
    if (promo.status === 200) {
      yield put(func_action.editPromoSC(promo.data));
    }
  } catch (e) {}
}

function* delPromo(action) {
  try {
    const promo = yield call(del, URL_PROMO, action.payload);
    if (promo.status === 200) {
      yield put(func_action.delPromoSC(action.payload));
    }
  } catch (e) {}
}

function* addRoom(action) {
  try {
    const room = yield call(post, URL_ROOM, action.payload);
    if (room.status === 201) {
      yield put(func_action.addRoomSC(room.data));
    }
  } catch (e) {}
}

function* editRoom(action) {
  try {
    const room = yield call(putData, URL_ROOM, action.payload);
    if (room.status === 200) {
      yield put(func_action.editRoomSC(room.data));
    }
  } catch (e) {}
}

function* delRoom(action) {
  try {
    const room = yield call(del, URL_ROOM, action.payload);
    if (room.status === 200) {
      yield put(func_action.delRoomSC(action.payload));
    }
  } catch (e) {}
}

function* addService(action) {
  try {
    const service = yield call(post, URL_SERVICE, action.payload);
    if (service.status === 201) {
      yield put(func_action.addServiceSC(service.data));
    }
  } catch (e) {}
}

function* editService(action) {
  try {
    const service = yield call(putData, URL_SERVICE, action.payload);
    if (service.status === 200) {
      yield put(func_action.editServiceSC(service.data));
    }
  } catch (e) {}
}

function* delService(action) {
  try {
    const service = yield call(del, URL_SERVICE, action.payload);
    if (service.status === 200) {
      yield put(func_action.delServiceSC(action.payload));
    }
  } catch (e) {}
}

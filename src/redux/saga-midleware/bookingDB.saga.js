import axios from "axios";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";
import { URL_BOOKING } from "../../adminPage/const/const";
import queryString from "query-string";

export default function* BookingDBSaga() {
    yield takeLatest(action.GET_BOOKINGDB, getBookingDB);
    yield takeLatest(action.EDIT_BOOKINGDB, editBookingDB);
}

function* getBookingDB(action) {
    try {
        const urlsort = queryString.stringify(action.filter, action.search);
        const bookingDB = yield call(get, `${URL_BOOKING}?${urlsort}`);
        yield put(func_action.setloader(false));
        if (bookingDB.status === 200) {
            yield put(func_action.getBookingDBSC(bookingDB.data));
        }
    } catch (e) { }
}

function* editBookingDB(action) {
    try {
        const bookingDB = yield call(putData, URL_BOOKING, action.payload)
        if (bookingDB.status === 200) {
            yield put(func_action.editBookingDBSC(bookingDB.data))
        }
    } catch (e) { }
}

//api
function get(url) {
    return axios.get(url);
}

function putData(url, data) {
    return axios.put(`${url}/${data.id}`, data)
}
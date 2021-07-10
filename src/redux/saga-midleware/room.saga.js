import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { URL_ROOM, URL_TYPE } from "../../userPage/const/const";
import queryString from "query-string";
import { get } from "./callApi";

export default function* RoomSaga() {
  yield takeLatest(action.GET_TYPE_ROOM, getType);
  yield takeLatest(action.GET_ROOM, getRoom);
  yield takeLatest(action.GET_ROOM_DETAIL, getRoomDetail);
}
function* getType() {
  try {
    const type = yield call(get, URL_TYPE);
    yield put(func_action.gettyperoomsc(type.data));
  } catch (e) {}
}

function* getRoom(action) {
  try {
    const url = queryString.stringify(action.filter);
    const room = yield call(get, `${URL_ROOM}?${url}`);
    yield put(func_action.setLoading(false));
    delay(1000);
    yield put(func_action.getroomsc(room.data));
  } catch (e) {}
}

function* getRoomDetail(action) {
  try {
    const url = queryString.stringify(action.payload);
    const room = yield call(get, `${URL_ROOM}?${url}`);
    yield put(func_action.getRoomDetailSc(room.data[0]));
  } catch (e) {}
}

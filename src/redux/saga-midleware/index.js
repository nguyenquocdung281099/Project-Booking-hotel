import axios from "axios";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { URL_TYPE } from "../../const/const";

export default function* Saga() {
  yield takeLatest(action.GET_TYPE_ROOM, getType);
}

function* getType(action) {
  try {
    const Type = yield call(get, URL_TYPE);
    yield put(func_action.gettyperoomsc(Type.data));
  } catch (e) {}
}

// ? get api
function get(url) {
  return axios.get(url);
}

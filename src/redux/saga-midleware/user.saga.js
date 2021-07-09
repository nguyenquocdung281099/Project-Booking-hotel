import { call, put, takeLatest } from "redux-saga/effects";
import { KEY_TOKEN, URL_USER } from "../../userPage/const/const";
import { get, post } from "./callApi";
import * as actionType from "../action/const_action";
import * as actionFuntion from "../action/index";
import jwt_decode from "jwt-decode";

export default function* UserSaga() {
  yield takeLatest(actionType.GET_USER, getUser);
  yield takeLatest(actionType.LOGIN, Login);
}

function* getUser(action) {
  try {
    const user = yield call(get, `${URL_USER}/${action.filter}`);
    yield put(actionFuntion.getusersc(user.data[0]));
  } catch (error) {
    console.log(error);
  }
}

function* Login(action) {
  try {
    const res = yield call(post, `${URL_USER}/login`, action.payload);
    console.log(res);
    localStorage.setItem(KEY_TOKEN, JSON.stringify(res.data.accessToken));
    const dataUser = jwt_decode(res.data.accessToken);
    console.log(dataUser);
    const user = yield call(get, `${URL_USER}/users?email=${dataUser.email}`);
    console.log(user);

    yield put(actionFuntion.loginSc(user.data[0]));
  } catch (error) {
    yield put(actionFuntion.loginErr());
  }
}

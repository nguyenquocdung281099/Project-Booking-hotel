import { call, put, takeLatest } from "redux-saga/effects";
import { KEY_TOKEN, URL_USER } from "../../userPage/const/const";
import { get, patch, post } from "./callApi";
import * as actionType from "../action/const_action";
import * as actionFuntion from "../action/index";
import jwt_decode from "jwt-decode";

export default function* UserSaga() {
  yield takeLatest(actionType.GET_USER, getUser);
  yield takeLatest(actionType.LOGIN, Login);
  yield takeLatest(actionType.EDIT_USERS, EditUser);
  yield takeLatest(actionType.ADD_USER, addUser);
}

function* addUser(action) {
  try {
    yield post(`${URL_USER}/signup`, action.data);
  } catch (error) {}
}

function* getUser(action) {
  try {
    const user = yield call(get, `${URL_USER}/${action.filter}`);
    yield put(actionFuntion.getusersc(user.data[0]));
  } catch (error) {}
}

function* Login(action) {
  try {
    const res = yield call(post, `${URL_USER}/login`, action.payload);
    localStorage.setItem(KEY_TOKEN, JSON.stringify(res.data.accessToken));
    const dataUser = jwt_decode(res.data.accessToken);
    const user = yield call(get, `${URL_USER}/users?email=${dataUser.email}`);
    yield put(actionFuntion.loginSc(user.data[0]));
  } catch (error) {
    yield put(actionFuntion.loginErr());
  }
}

function* EditUser(action) {
  try {
    const res = yield call(
      patch,
      `${URL_USER}/users/${action.id}`,
      action.data
    );
    yield put(actionFuntion.getusersc(res.data));
  } catch (error) {
    yield put(actionFuntion.showtoast());
  }
}

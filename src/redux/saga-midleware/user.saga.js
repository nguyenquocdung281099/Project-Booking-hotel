import { call, put, takeLatest } from "redux-saga/effects";
import { KEY_REF_TOKEN, KEY_TOKEN, URL_USER } from "../../userPage/const/const";
import { get, patch, post, RestClient } from "./callApi";
import * as actionType from "../action/const_action";
import * as actionFuntion from "../action/index";
import { showNotification } from "../../until/index";

export default function* UserSaga() {
  yield takeLatest(actionType.GET_USER, getUser);
  yield takeLatest(actionType.LOGIN, Login);
  yield takeLatest(actionType.EDIT_USERS, EditUser);
  yield takeLatest(actionType.ADD_USER, addUser);
  yield takeLatest(actionType.GET_USER_CURRENT, getUserCurrentSaga);
  yield takeLatest(actionType.UPDATE_INFORMATION_USER, updateInformationUserSaga);
}

function* addUser(action) {
  try {
    // console.log(action.payload);
    const res = yield call(RestClient.post, `${URL_USER}/register`, action.data);
    yield put(actionFuntion.addUserSC(res.data));
    yield showNotification("success", "register success");
  } catch (error) {
    yield put(actionFuntion.addUserER(error));
    yield showNotification("warning", error.respone?.data.message);
  }
}

function* getUser(action) {
  try {
    const user = yield call(get, `${URL_USER}/${action.filter}`);
    yield put(actionFuntion.getusersc(user.data[0]));
  } catch (error) {}
}

function* Login(action) {
  try {
    const res = yield call(RestClient.post, `${URL_USER}/login`, action.payload);
    localStorage.setItem("emailUser", JSON.stringify(res.data.email));
    localStorage.setItem(KEY_TOKEN, JSON.stringify(res.data.accessToken));
    localStorage.setItem(KEY_REF_TOKEN, JSON.stringify(res.data.refreshToken));
    yield put(actionFuntion.loginSc(res.data));
    yield showNotification("success", "login success");
  } catch (error) {
    yield put(actionFuntion.loginErr());
    yield showNotification("warning", error.respone?.data.message);
  }
}

function* EditUser(action) {
  try {
    const res = yield call(patch, `${URL_USER}/users/${action.id}`, action.data);
    yield put(actionFuntion.getusersc(res.data));
  } catch (error) {
    yield put(actionFuntion.showtoast());
  }
}

function* getUserCurrentSaga(action) {
  try {
    console.log(action);
    const res = yield call(RestClient.post, `${URL_USER}/userCurrent`, action.data);
    yield put(actionFuntion.getUserCurrentC(res.data));
  } catch (error) {}
}

function* updateInformationUserSaga(action) {
  try {
    yield call(RestClient.put, `${URL_USER}/updateInformation`, action.data);
    yield put(actionFuntion.updateInformationUserSC(action.data.requestData));
    yield showNotification("success", "Change information success");
  } catch (error) {
    yield showNotification("warning", "Change information not success, please implement then ");
  }
}

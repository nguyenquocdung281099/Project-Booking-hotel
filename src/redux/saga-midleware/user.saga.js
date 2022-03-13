import { call, put, takeLatest } from 'redux-saga/effects'
import { KEY_REF_TOKEN, KEY_TOKEN, URL_USER } from '../../userPage/const/const'
import {  RestClient } from './callApi'
import * as actionType from '../action/const_action'
import * as actionFuntion from '../action/index'
import { showNotification,History } from '../../until/index'

export default function* UserSaga() {
  yield takeLatest(actionType.GET_USER, getUser)
  yield takeLatest(actionType.LOGIN, Login)
  yield takeLatest(actionType.EDIT_USERS, EditUser)
  yield takeLatest(actionType.ADD_USER, addUser)
  yield takeLatest(actionType.GET_USER_CURRENT, getUserCurrentSaga)
  yield takeLatest(actionType.UPDATE_INFORMATION_USER, updateInformationUserSaga)
  yield takeLatest(actionType.DEL_USERDB, deleteUserSaga)
}

function* addUser(action) {
  try {
    // console.log(action.data);
    const res = yield call(RestClient.post, `${URL_USER}/register`, action.data)
    yield put(actionFuntion.addUserSC(res.data))
    yield showNotification('success', 'register success')
    History.push("/login")
  } catch (error) {
    yield put(actionFuntion.addUserER(error))
    yield showNotification('warning', "serve errors")
  }
}

function* getUser(action) {
  try {
    const user = yield call(RestClient.get, `${URL_USER}/${action.filter}`)
    yield put(actionFuntion.getusersc(user.data[0]))
  } catch (error) {}
}

function* Login(action) {
  try {
    const res = yield call(RestClient.post, `${URL_USER}/login`, action.data)
    localStorage.setItem('emailUser', JSON.stringify(res.data.email))
    localStorage.setItem(KEY_TOKEN, JSON.stringify(res.data.accessToken))
    localStorage.setItem(KEY_REF_TOKEN, JSON.stringify(res.data.refreshToken))
    yield put(actionFuntion.loginSc(res.data))
    yield showNotification('success', 'login success')
  } catch (error) {
    yield put(actionFuntion.loginErr())
    yield showNotification('warning', "email or password invalid, please replace !!! ")

  }
}

function* EditUser(action) {
  try {
    const res = yield call(RestClient.patch, `${URL_USER}/users/${action.id}`, action.data)
    yield put(actionFuntion.getusersc(res.data))
  } catch (error) {
    yield put(actionFuntion.showtoast())
  }
}

function* getUserCurrentSaga(action) {
  try {
    console.log(action)
    const res = yield call(RestClient.post, `${URL_USER}/userCurrent`, action.data)
    yield put(actionFuntion.getUserCurrentC(res.data))
  } catch (error) {}
}

function* updateInformationUserSaga(action) {
  try {
    yield call(RestClient.put, `${URL_USER}/updateInformation`, action.data)
    yield put(actionFuntion.updateInformationUserSC(action.data.requestData))
    yield showNotification('success', 'Change information success')
  } catch (error) {
    yield showNotification('warning', 'Change information not success, please implement then ')
  }
}

function* deleteUserSaga(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/deleteUser`, action.data)
    yield put(
      actionFuntion.getUserAdmin({
        data: {
          limit: 10,
          page: 1,
        },
      })
    )
    yield showNotification('success', 'delete information success')
  } catch (error) {
    yield showNotification('warning', 'delete information not success, please implement then ')
  }
}

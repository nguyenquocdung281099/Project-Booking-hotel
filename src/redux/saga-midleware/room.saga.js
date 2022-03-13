import * as func_action from '../action/index'
import * as action from '../action/const_action'
import { call, put, takeLatest } from 'redux-saga/effects'
import { URL_ROOM, URL_TYPE, URL_USER } from '../../userPage/const/const'
import queryString from 'query-string'
import {  RestClient } from './callApi'
import { showNotification } from '../../until'

export default function* RoomSaga() {
  yield takeLatest(action.GET_TYPE_ROOM, getType)
  yield takeLatest(action.GET_ROOM, getRoom)
  yield takeLatest(action.GET_ROOM_DETAIL, getRoomDetail)
  yield takeLatest(action.ADD_ROOM, addRoomSaga)
  yield takeLatest(action.DEL_ROOM, deleteRoomSaga)
  yield takeLatest(action.EDIT_ROOM, updateRoomSaga)
}
function* getType() {
  try {
    const type = yield call(RestClient.get, URL_TYPE)
    yield put(func_action.gettyperoomsc(type.data))
  } catch (e) {}
}

function* getRoom(action) {
  try {
    const url = queryString.stringify(action.filter)
    const room = yield call(RestClient.get, `${URL_ROOM}?${url}`)
    yield put(func_action.getroomsc(room.data))
  } catch (e) {}
}

function* getRoomDetail(action) {
  try {
    const url = queryString.stringify(action.data)
    const room = yield call(RestClient.get, `${URL_USER}/roomCurrent?${url}`)
    yield put(func_action.getRoomDetailSc(room.data.data))
  } catch (e) {}
}

function* addRoomSaga(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/AddRoom`, action.data)
    yield showNotification('success', 'add room success')
    yield put(
      func_action.getroom({
        data: {
          limit: 10,
          page: 1,
        },
      })
    )
  } catch (error) {
    yield showNotification('warning', 'add room not success, please replace')
  }
}

function* updateRoomSaga(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/updateRoom`, action.data)
    yield showNotification('success', 'update room success')
    yield put(
      func_action.getroom({
        data: {
          limit: 10,
          page: 1,
        },
      })
    )
  } catch (error) {
    yield showNotification('warning', 'update room not success, please replace')
  }
}

function* deleteRoomSaga(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/deleteRoom`, action.data)
    yield showNotification('success', 'delete room success')
  } catch (error) {
    yield showNotification('warning', 'delete room not success, please replace')
  }
}


// function* SearchRoomByDate(action) {
//   try {
//     const url = queryString.stringify(action.filter)
    
//     const room = yield call(RestClient.get, `${URL_ROOM}?${url}`)
//   } catch (e) {}
// }
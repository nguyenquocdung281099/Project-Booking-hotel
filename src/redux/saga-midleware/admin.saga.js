import * as func_action from '../action/index'
import * as actionConst from '../action/const_action'
import { call, put, takeLatest } from 'redux-saga/effects'
import { RestClient } from './callApi'
import { URL_USER } from '../../userPage/const/const'
import { showNotification } from '../../until'

export default function* AdminSaga() {
  yield takeLatest(actionConst.GET_DATA_MASTER, getDataMaster)
  yield takeLatest(actionConst.ADMIN_GET_USER, getListUserAdmin)
  yield takeLatest(actionConst.ADMIN_GET_COMMENT, getListCommentAdmin)
  yield takeLatest(actionConst.ADMIN_GET_BOOKING, getListBookingAdmin)
  yield takeLatest(actionConst.ADMIN_CHANGE_STATUS_BOOKING, changeStatusBookingAdmin)
  yield takeLatest(actionConst.ADMIN_DELETE_SERVICE, deleteService)
  yield takeLatest(actionConst.ADMIN_DELETE_VOUCHER, deleteVoucher)
  yield takeLatest(actionConst.ADMIN_GET_VOUCHER, getListVoucherAdmin)
  yield takeLatest(actionConst.ADD_SERVICE, addService)
  yield takeLatest(actionConst.ADMIN_ADD_VOUCHER, addVoucher)
  yield takeLatest(actionConst.ADMIN_UPDATE_SERVICE, updateService)
  yield takeLatest(actionConst.ADMIN_UPDATE_VOUCHER, updateVoucher)
  yield takeLatest(actionConst.ADMIN_GET_SERVICE, getListServiceAdmin)
  yield takeLatest(actionConst.ADMIN_GET_ALL_TYPEROOM, getAllTypeRoom)
  yield takeLatest(actionConst.ADMIN_GET_TYPEROOM_META, getListTypeRoomAdmin)
  yield takeLatest(actionConst.ADMIN_UPDATE_TYPEROOM, updateTyperoom)
  yield takeLatest(actionConst.ADMIN_UPDATE_TYPEROOM, updateTyperoom)
}

function* getDataMaster() {
  try {
    const data = yield call(RestClient.get, `${URL_USER}/admin/masterData`)
    yield put(func_action.getDataMasterSC(data.data))
  } catch (error) {}
}

function* getListUserAdmin(action) {
  try {
    const result = yield call(
      RestClient.get,
      `${URL_USER}/admin/user?limit=${action.data?.limit}&page=1&search=${action.data?.search}`
    )
    yield put(func_action.getUserAdminSC(result.data))
  } catch (error) {}
}

function* getListCommentAdmin(action) {
  try {
    const result = yield call(
      RestClient.get,
      `${URL_USER}/admin/comment?limit=${action.data?.limit}&page=1`
    )
    yield put(func_action.getCommentAdminSC(result.data))
  } catch (error) {}
}
function* getListVoucherAdmin(action) {
  try {
    const result = yield call(
      RestClient.get,
      `${URL_USER}/listVoucher?${action.data?.limit}&page=${action.data.page}&search=${action?.data?.search}`
    )
    yield put(func_action.getVoucheradminSC(result.data))
  } catch (error) {
    yield put(func_action.getVoucheradminER())
  }
}
function* getListServiceAdmin(action) {
  console.log('dhawd')
  try {
    const result = yield call(
      RestClient.get,
      `${URL_USER}/listService?limit=${action.data?.limit}&page=${action.data.page}&search=${action?.data?.search}`
    )
    yield put(func_action.getServiceAdminSC(result.data))
  } catch (error) {
    yield put(func_action.getServiceAdminER())
  }
}
function* getListBookingAdmin(action) {
  try {
    const result = yield call(
      RestClient.get,
      `${URL_USER}/admin/booking?limit=${action.data?.limit}&page=${action.data.page}&search=${action?.data?.search}`
    )
    yield put(func_action.getbookingAdminSC(result.data))
  } catch (error) {}
}

function* changeStatusBookingAdmin(action) {
  try {
    yield call(RestClient.put, `${URL_USER}/admin/booking`, action.data)
    showNotification('success', 'change status success ')
    yield put(func_action.changeStatusBookingAdminSC(action.data.requestData))
  } catch (error) {
    showNotification('warning', 'change status errors')
    yield put(func_action.changeStatusBookingAdminER())
  }
}

function* deleteService(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/deleteService`, action.data)
    yield put(func_action.deleteServiceAdminSC(action.data.id))
    yield getListServiceAdmin({
      data: {
        limit: 10,
        page: 1,
      },
    })
    yield showNotification('success', 'delete success')
  } catch (error) {
    yield showNotification('warning', 'delete fall ')
  }
}

function* deleteVoucher(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/deleteVoucher`, action.data)
    yield put(func_action.deleteVoucherdminSC(action.data.id))
    yield showNotification('success', 'delete success')
  } catch (error) {
    yield showNotification('warning', 'delete fall ')
  }
}

function* addService(action) {
  try {
    console.log(action.data)
    yield call(RestClient.post, `${URL_USER}/admin/addService`, action.data)
    yield put(func_action.addServiceSC(action.data.id))
    yield getListServiceAdmin({
      data: {
        limit: 10,
        page: 1,
      },
    })
    yield showNotification('success', 'add success')
  } catch (error) {
    yield showNotification('warning', 'add fall ')
  }
}

function* addVoucher(action) {
  try {
    console.log(action.data)
    yield call(RestClient.post, `${URL_USER}/admin/addVoucher`, action.data)
    yield getListVoucherAdmin({
      data: {
        limit: 10,
        page: 1,
      },
    })
    yield showNotification('success', 'add success')
  } catch (error) {
    yield showNotification('warning', 'add fall ')
  }
}

function* updateService(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/admin/updateVoucher`, action.data)
    yield put(
      func_action.getServiceAdmin({
        data: {},
      })
    )
    yield showNotification('success', 'delete success')
  } catch (error) {
    yield showNotification('warning', 'delete fall ')
  }
}

function* updateVoucher(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/admin/updateVoucher`, action.data)
    yield put(
      func_action.getVoucheradmin({
        data: {},
      })
    )
    yield showNotification('success', 'delete success')
  } catch (error) {
    yield showNotification('warning', 'delete fall ')
  }
}

function* getAllTypeRoom() {
  try {
    const typeRoom = yield call(RestClient.get, `${URL_USER}/admin/getAllTypeRoom`)
    yield put(func_action.getAlltypeRoomAdminSC(typeRoom.data))
  } catch (error) {
    // yield put(fiun)
  }
}

function* getListTypeRoomAdmin(action) {
  try {
    const result = yield call(
      RestClient.get,
      `${URL_USER}/admin/getTypeRoomMeta?limit=${action.data?.limit}&page=${action.data?.page}&search=${action.data?.search}`
    )
    yield put(func_action.getTypeRoomMetaAdminSC(result.data))
  } catch (error) {}
}



function* addTyperoom(action) {
  try {
    console.log(action.data)
    yield call(RestClient.post, `${URL_USER}/admin/addTypeRooms`, action.data)
    yield getListTypeRoomAdmin({
      data: {
        limit: 10,
        page: 1,
      },
    })
    yield showNotification('success', 'add success')
  } catch (error) {
    yield showNotification('warning', 'add fall ')
  }
}

function* updateTyperoom(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/admin/updateTypeRooms`, action.data)
    yield getListTypeRoomAdmin({
      data: {
        limit: 10,
        page: 1,
      },
    })
    yield showNotification('success', 'update success')
  } catch (error) {
    yield showNotification('warning', 'update fall ')
  }
}
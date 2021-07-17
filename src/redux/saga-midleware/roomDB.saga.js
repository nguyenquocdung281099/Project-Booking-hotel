import axios from "axios";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";
import { URL_ROOM } from "../../adminPage/const/const";


export default function* RoomDBSaga() {
    yield takeLatest(action.GET_ROOM_MODAL, getRoomModal);
}

function* getRoomModal() {
    try {
        const roomModal = yield call(get, URL_ROOM);
        yield put(func_action.setloader(false));
        if (roomModal.status === 200) {
            yield put(func_action.getRoomModalSC(roomModal.data));
        }
    } catch (e) { }
}

//api
function get(url) {
    return axios.get(url);
}
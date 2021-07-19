import axios from "axios";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { call, put, takeLatest } from "redux-saga/effects";
import { URL_USERDB } from "../../adminPage/const/const";
import queryString from "query-string";

export default function* UserDBSaga() {
    yield takeLatest(action.GET_USERDB, getUserDB);
    yield takeLatest(action.ADD_USERDB, addUserDB);
    yield takeLatest(action.DEL_USERDB, delUserDB);
}

function* getUserDB(action) {
    try {
        const url = queryString.stringify(action.filter);
        const userDB = yield call(get, `${URL_USERDB}?${url}`);
        yield put(func_action.setloader(false));
            if (userDB.status === 200) {
            yield put(func_action.getUserDBSC(userDB.data));
        }
    } catch (e) { }
}

function* addUserDB(action) {
    try {
        const userDB = yield call(post, URL_USERDB, action.payload)
        console.log(userDB)
        if (userDB.status === 201) {
            yield put(func_action.addUserDBSC(userDB.data))
        }
    } catch (e) { }
}

function* delUserDB(action) {
    try {
        const userDB = yield call(del, URL_USERDB, action.payload)
        if (userDB.status === 200) {
            yield put(func_action.delUserDBSC(action.payload))
        }
    } catch (e) { }
}


// ? get api
function get(url) {
    return axios.get(url);
}

function post(url, item) {
    return axios.post(`${url}`, item)
}

function del(url, id) {
    return axios.delete(`${url}/${id}`)
}
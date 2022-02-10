import { call, put, takeLatest } from "@redux-saga/core/effects";
import { URL_USER } from "../../userPage/const/const";
import { RestClient } from "./callApi";
import * as func_action from "../action/index";
import * as action from "../action/const_action";
import { showNotification } from '../../until'

export default function* CommentSaga() {
  yield takeLatest(action.GET_COMMENT, GetCommentSaga);
  yield takeLatest(action.CREATE_COMMENT, createCommentSaga);
}

function* GetCommentSaga(action) {
  try {
    const { id, page, limit } = action.data;
    const comment = yield call(
      RestClient.get,
      `${URL_USER}/comment?id=${id}&page=${page}&limit=${limit}`
    );
    yield put(func_action.getCommentSC(comment.data));
  } catch (error) {}
}

function* createCommentSaga(action) {
  try {
    yield call(RestClient.post, `${URL_USER}/setComment`, action.data);
    yield call(GetCommentSaga, {
      data: {
        id: action.data.requestData.id,
        limit: 5,
        page: 1,
      },
    });
    showNotification('success', 'comment success')

  } catch (error) {
    showNotification('warning', 'comment errors')
  }
}

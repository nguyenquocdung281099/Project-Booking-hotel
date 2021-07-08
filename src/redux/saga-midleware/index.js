import { fork } from "@redux-saga/core/effects";
import RoomSaga from "./room.saga";
import UserSaga from "./user.saga.js";

export default function* Saga() {
  yield fork(RoomSaga);
  yield fork(UserSaga);
}

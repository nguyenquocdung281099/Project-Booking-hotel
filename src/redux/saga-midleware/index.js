import { fork } from "@redux-saga/core/effects";
import RoomSaga from "./room.saga";
import AdminSaga from "./admin.saga";

export default function* Saga() {
  yield fork(RoomSaga);
  yield fork(AdminSaga);
}

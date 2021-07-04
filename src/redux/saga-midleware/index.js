import { fork } from "@redux-saga/core/effects";
import RoomSaga from "./room.saga";

export default function* Saga() {
  yield fork(RoomSaga);
}

import { fork } from "@redux-saga/core/effects";
import RoomSaga from "./room.saga";
import UserSaga from "./user.saga";
import AdminSaga from "./admin.saga";
import BookingSaga from "./booking.saga";

export default function* Saga() {
  yield fork(RoomSaga);
  yield fork(UserSaga);
  yield fork(AdminSaga);
  yield fork(UserSaga);
  yield fork(BookingSaga);
}
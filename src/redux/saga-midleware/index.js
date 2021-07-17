import { fork } from "@redux-saga/core/effects";
import RoomSaga from "./room.saga";
import UserSaga from "./user.saga";
import AdminSaga from "./admin.saga";
import BookingSaga from "./booking.saga";
import BookingDBSaga from "./bookingDB.saga";
import UserDBSaga from "./userDB.saga";
import RoomDBSaga from "./roomDB.saga";

export default function* Saga() {
  yield fork(RoomSaga);
  yield fork(AdminSaga);
  yield fork(UserSaga);
  yield fork(BookingSaga);
  yield fork(BookingDBSaga);
  yield fork(UserDBSaga);
  yield fork(RoomDBSaga)
}
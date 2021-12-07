import { fork } from "@redux-saga/core/effects";
import RoomSaga from "./room.saga";
import UserSaga from "./user.saga";
import BookingSaga from "./booking.saga";
import CommentSaga from "./comment";

export default function* Saga() {
  yield fork(RoomSaga);
  yield fork(UserSaga);
  yield fork(BookingSaga);
  yield fork(CommentSaga);
}

import { combineReducers } from "redux";
import bookingReducer from "./bookingReducer";
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import promoReducer from "./promoReducer";
import userReducer from "./userReducer";
import RoomReducer from "./Room";

export const RootReducer = combineReducers({
  booking: bookingReducer,
  room: roomReducer,
  service: serviceReducer,
  promo: promoReducer,
  user: userReducer,
  RoomReducer,
});

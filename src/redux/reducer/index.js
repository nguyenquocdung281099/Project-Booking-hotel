import { combineReducers } from "redux";
import bookingReducer from "./bookingReducer";
import roomReducer from "./roomReducer";
import serviceReducer from "./serviceReducer";
import promoReducer from "./promoReducer";
import userReducer from "./userReducer";
import userDBReducer from "./userDBReducer";
import bookingDBReducer from './bookingDBReducer'
import roomDBReducer from './roomDBReducer'

export const RootReducer = combineReducers({
  booking: bookingReducer,
  room: roomReducer,
  service: serviceReducer,
  promo: promoReducer,
  user: userReducer,
  userDB: userDBReducer,
  bookingDB: bookingDBReducer,
  roomDB: roomDBReducer
});

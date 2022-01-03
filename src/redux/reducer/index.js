import { combineReducers } from 'redux'
import bookingReducer from './bookingReducer'
import roomReducer from './roomReducer'
import serviceReducer from './serviceReducer'
import promoReducer from './promoReducer'
import userReducer from './userReducer'
import userDBReducer from './userDBReducer'
import bookingDBReducer from './bookingDBReducer'
import CommentReducer from './comment'
import DashboardReducer from './dashboardReducer'
import VoucherReducer from './voucherReducer'
import ServiceAdmiinReducer from './service.admin.reducer'
import TypeRoomsReducer from './typeRooms'

export const RootReducer = combineReducers({
  booking: bookingReducer,
  room: roomReducer,
  service: serviceReducer,
  promo: promoReducer,
  user: userReducer,
  userDB: userDBReducer,
  bookingDB: bookingDBReducer,
  typeRooms: TypeRoomsReducer,
  comments: CommentReducer,
  Dashboard: DashboardReducer,
  Voucher: VoucherReducer,
  serviceAdmin: ServiceAdmiinReducer,
})

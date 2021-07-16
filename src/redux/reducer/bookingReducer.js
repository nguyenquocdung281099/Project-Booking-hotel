import { GET_BOOKING_ROOM_SC, GET_BOOKING_SC } from "../action/const_action";

const defaultState = {
  booking: [],
  isEditBooking: false,
};

export default function bookingReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_BOOKING_SC:
      newState = { ...newState, booking: action.payload };
      return newState;
    default:
      return state;
  }
}

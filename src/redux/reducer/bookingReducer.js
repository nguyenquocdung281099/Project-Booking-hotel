import { GET_BLANK_DATE_SC, GET_BOOKING_SC } from "../action/const_action";

const defaultState = {
  booking: {
    data: [],
    meta: {},
  },
  isEditBooking: false,
  dateBooked: [],
};

export default function bookingReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_BOOKING_SC:
      console.log(action.payload);
      return {
        ...state,
        booking: {
          ...state.booking,
          data: action.payload.data,
        },
      };
    case GET_BLANK_DATE_SC: {
      return {
        ...state,
        dateBooked: action.data,
      };
    }
    default:
      return state;
  }
}

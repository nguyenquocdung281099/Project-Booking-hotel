import { GET_BLANK_DATE_SC, GET_BOOKING_SC } from '../action/const_action'

const defaultState = {
  booking: {
    data: [],
    meta: {},
  },
  isEditBooking: false,
  dateBooked: [],
}

export default function bookingReducer(state = defaultState, action) {
  let newState = { ...state }
  switch (action.type) {
    case GET_BOOKING_SC:
      return {
        ...state,
        booking: {
          ...state.booking,
          data: action.data.data,
          meta: action.data.meta,
        },
      }
    case GET_BLANK_DATE_SC: {
      return {
        ...state,
        dateBooked: action.data,
      }
    }
    default:
      return state
  }
}

import * as ActionType from '../action/const_action'

const defaultState = {
  data: [],
  meta: {},
  loading: false,
}

export default function bookingDBReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.ADMIN_GET_BOOKING: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.ADMIN_GET_BOOKING_ER: {
      return {
        ...state,
        loading: false,
      }
    }
    case ActionType.ADMIN_GET_BOOKING_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        loading: false,
        data,
        meta,
      }
    }

    case ActionType.ADMIN_CHANGE_STATUS_BOOKING: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.ADMIN_CHANGE_STATUS_BOOKING_ER: {
      return {
        ...state,
        loading: false,
      }
    }
    case ActionType.ADMIN_CHANGE_STATUS_BOOKING_SC: {
      const { id, status } = action.data
      const bookingList = state.data
      let bookingIndex = bookingList.findIndex((item) => item._id === id)
      bookingList[bookingIndex] = { ...bookingList[bookingIndex], status }
      return {
        ...state,
        loading: false,
        data: bookingList,
      }
    }
    default:
      return state
  }
}

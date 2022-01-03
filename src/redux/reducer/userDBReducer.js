import * as ActionType from '../action/const_action'

const defaultState = {
  data: [],
  loading: false,
  filter: {},
  meta: {},
}

export default function userDBReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.ADMIN_GET_USER: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.ADMIN_GET_USER_ER: {
      return {
        ...state,
        loading: false,
      }
    }
    case ActionType.ADMIN_GET_USER_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        loading: false,
        data,
        meta,
      }
    }

    default:
      return state
  }
}

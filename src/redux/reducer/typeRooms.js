import * as ActionType from '../action/const_action'

const defaultState = {
  modal: [],
  meta: {},
  data: [],
  loading: false,
}

export default function TypeRoomsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.ADMIN_GET_ALL_TYPEROOM_SC: {
      const { data } = action.data
      return {
        ...state,
        data,
      }
    }
    case ActionType.ADMIN_GET_TYPEROOM_META_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        data,
        meta,
        loading: false,
      }
    }
    case ActionType.ADMIN_GET_TYPEROOM_META: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.ADMIN_GET_TYPEROOM_META_ER: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}

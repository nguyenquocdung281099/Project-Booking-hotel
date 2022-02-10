import * as ActionType from '../action/const_action'

const defaultState = {
  data: [],
  meta: {},
  loading: false,
}

export default function ServiceAdmiinReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.ADMIN_GET_SERVICE: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.ADMIN_GET_SERVICE_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        loading: false,
        data,
        meta,
      }
    }
    case ActionType.ADMIN_DELETE_SERVICE_SC: {
        const  id  = action.data
        const listService = state.data
        const ind = listService.findIndex((item) => {
          return item._id === id
        })
        listService.splice(ind, 1)
        return {
          ...state,
          loading: false,
          data: [...listService],
        }
      }
    default:
      return state
  }
}

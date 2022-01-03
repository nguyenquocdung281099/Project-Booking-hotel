import * as ActionType from '../action/const_action'

const initial = {
  dataMaster: {},
  loading: false,
}
const DashboardReducer = (state = initial, action) => {
  switch (action.type) {
    case ActionType.GET_DATA_MASTER: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.GET_DATA_MASTER_SC: {
      return {
        ...state,
        loading: false,
        dataMaster: action.data,
      }
    }
    case ActionType.GET_DATA_MASTER_ER: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return {}
  }
}

export default DashboardReducer

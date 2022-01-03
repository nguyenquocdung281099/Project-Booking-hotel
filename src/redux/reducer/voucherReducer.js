import * as ActionType from '../action/const_action'

const defaultState = {
  data: [],
  meta: {},
  loading: false,
}

export default function VoucherReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.ADMIN_GET_VOUCHER: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.ADMIN_GET_VOUCHER_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        loading: false,
        data,
        meta,
      }
    }
    case ActionType.ADMIN_DELETE_VOUCHER_SC: {
      const { id } = action.data
      const listVoucher = state.data
      const ind = listVoucher.findIndex((item) => item._id === id)
      listVoucher.splice(ind, 1)
      return {
        ...state,
        loading: false,
        data: [...listVoucher],
      }
    }
    default:
      return state
  }
}

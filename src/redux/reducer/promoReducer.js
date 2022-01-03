import * as ActionType from '../action/const_action'

const defaultState = {
  promo: [],
  loader: false,
  filter: {},
  pagi: {},
  isGetPromo: undefined,
  promoUser: {},
  data: [],
  meta: {},
  loading: false,
}

export default function promoReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.CHECK_PROMOTION_SC: {
      return {
        ...state,
        loader: false,
        promoUser: {
          ...action.data,
        },
      }
    }
    case ActionType.CHECK_PROMOTION: {
      return {
        ...state,
        loader: true,
      }
    }
    case ActionType.CHECK_PROMOTION_ER: {
      return {
        ...state,
        loader: false,
      }
    }
    case ActionType.CANCEL_PROMO: {
      return {
        ...state,
        promoUser: {},
      }
    }

    case ActionType.ADMIN_GET_VOUCHER_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        data,
        meta,
        loading: false,
      }
    }
    case ActionType.ADMIN_GET_VOUCHER:
    case ActionType.ADMIN_DELETE_VOUCHER: {
      return {
        ...state,
        loading: true,
      }
    }

    case ActionType.ADMIN_GET_VOUCHER_ER:
    case ActionType.ADMIN_DELETE_VOUCHER_ER: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}

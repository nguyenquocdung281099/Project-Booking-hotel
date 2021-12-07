import * as ActionType from "../action/const_action";

const defaultState = {
  promo: [],
  loader: false,
  filter: {},
  pagi: {},
  isGetPromo: undefined,
  promoUser: {},
};

export default function promoReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ActionType.GET_PROMODB_SC:
      if (action.payload.pagination) {
        newState = {
          ...newState,
          promo: action.payload.data,
          pagi: action.payload.pagination,
        };
      } else {
        newState = {
          ...newState,
          promo: action.payload,
        };
      }
      return newState;
    case ActionType.GET_PROMO_SC:
      if (action.payload.length === 0) {
        console.log(action.payload);
        newState = {
          ...newState,
          promo: action.payload,
          isGetPromo: false,
        };
      } else {
        newState = {
          ...newState,
          promo: action.payload.data,
          pagi: action.payload.pagination,
          isGetPromo: true,
        };
      }
      return newState;
    case ActionType.SET_LOADER:
      newState = { ...newState, loader: action.payload };
      return newState;
    case ActionType.ADD_PROMO_SC:
      newState = {
        ...newState,
        promo: [...newState.promo, action.payload],
      };
      return newState;
    case ActionType.EDIT_PROMO_SC:
      let newPromo1 = newState.promo.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });

      newState = { ...newState, promo: newPromo1, isGetPromo: false };
      return newState;
    case ActionType.DEL_PROMO_SC:
      let newPromo2 = newState.promo.filter((item) => item.id !== action.payload);
      newState = { ...newState, promo: newPromo2 };
      return newState;
    case ActionType.CHANGE_FILTER:
      state = { ...newState, filter: action.payload };
      return state;
    case ActionType.CANCEL_COST:
      state = { ...newState, isGetPromo: false };
      return state;

    case ActionType.CHECK_PROMOTION_SC: {
      return {
        ...state,
        loader: false,
        promoUser: {
          ...action.data,
        },
      };
    }
    case ActionType.CHECK_PROMOTION: {
      return {
        ...state,
        loader: true,
      };
    }
    case ActionType.CHECK_PROMOTION_ER: {
      return {
        ...state,
        loader: false,
      };
    }
    case ActionType.CANCEL_PROMO: {
      return {
        ...state,
        promoUser: {},
      };
    }
    default:
      return state;
  }
}

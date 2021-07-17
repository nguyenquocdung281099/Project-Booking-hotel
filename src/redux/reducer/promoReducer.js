import * as ActionType from "../action/const_action";

const defaultState = {

    promo: [],
    loader: true,
    filter: {},
    pagi: {},
    isGetPromo: undefined,
}

export default function promoReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ActionType.GET_PROMO_SC:
            newState = {
                ...newState,
                promo: action.payload.data,
                pagi: action.payload.pagination
            }
            return newState;
        case ActionType.SET_LOADER:
            newState = { ...newState, loader: action.payload }
            return newState;
        case ActionType.ADD_PROMO_SC:
            newState = {
                ...newState,
                promo: [...newState.promo, action.payload]
            }
            return newState;
        case ActionType.EDIT_PROMO_SC:
            let newPromo1 = newState.promo.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item;
            })
            newState = { ...newState, promo: newPromo1 }
            return newState;
        case ActionType.DEL_PROMO_SC:
            let newPromo2 = newState.promo.filter(item => item.id !== action.payload)
            newState = { ...newState, promo: newPromo2 }
            return newState;
        case ActionType.CHANGE_FILTER:
            state = { ...newState, filter: action.payload };
            return state;
        case ActionType.GET_PROMO_SC:
           if (action.payload.length === 0) {
            newState = { ...newState, promo: action.payload, isGetPromo: false };
           } else {
        newState = { ...newState, promo: action.payload, isGetPromo: true };
            }
      return newState;
        default:
            return state;
    }
}
};
    

 
    

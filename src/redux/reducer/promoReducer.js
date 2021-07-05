import { GET_PROMO_SC, SET_LOADER } from '../action/const_action'

const defaultState = {
    promo: [], loader: "block"
}

export default function promoReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_PROMO_SC:
            newState = { ...newState, promo: action.payload }
            return newState;
        case SET_LOADER:
            newState = { ...newState, loader: action.payload }
            return newState;
        default:
            return state;
    }
}
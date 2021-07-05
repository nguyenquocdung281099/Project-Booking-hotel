import { GET_USER_SC } from "../action/const_action";

const defaultState = {
    user: []
}

export default function userReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_SC:
            newState = { ...newState, user: action.payload }
            return newState;
        default:
            return state;
    }
}
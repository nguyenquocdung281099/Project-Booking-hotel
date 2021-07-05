import { GET_SERVICE_SC } from '../action/const_action'

const defaultState = {
    service: []
}

export default function serviceReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_SERVICE_SC:
            newState = { ...newState, service: action.payload }
            return newState;
        default:
            return state;
    }
}
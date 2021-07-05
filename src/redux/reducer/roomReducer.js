import { GET_ROOM_SC } from '../action/const_action'

const defaultState = {
    room: []
}

export default function roomReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ROOM_SC:
            newState = { ...newState, room: action.payload }
            return newState;
        default:
            return state;
    }
}
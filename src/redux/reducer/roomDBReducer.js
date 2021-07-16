import * as ActionType from "../action/const_action";

const defaultState = {
    modal: []
};

export default function roomDBReducer(state = defaultState, action) {
    let newState = { ...state };
    switch (action.type) {
        case ActionType.GET_ROOM_MODAL_SC:
            newState = {
                ...newState,
                modal: action.payload,
            };
            return newState;
        default:
            return state;
    }
}
import * as ActionType from "../action/const_action";

const defaultState = {
    userDB: [],
    loader: true,
    filter: {},
}

export default function userDBReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ActionType.GET_USERDB_SC:
            newState = {
                ...newState,
                userDB: action.payload,
            }
            return newState;
        case ActionType.SET_LOADER:
            newState = { ...newState, loader: action.payload }
            return newState;
        case ActionType.ADD_USERDB_SC:
            newState = {
                ...newState,
                userDB: [...newState.userDB, action.payload]
            }
            return newState;
        case ActionType.DEL_USERDB_SC:
            let newUserDB2 = newState.userDB.filter(item => item.id !== action.payload)
            newState = { ...newState, userDB: newUserDB2 }
            return newState;
        case ActionType.CHANGE_FILTER:
            state = { ...newState, filter: action.payload };
            return state;
        default:
            return state;
    }
}
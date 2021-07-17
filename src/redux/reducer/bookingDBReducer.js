import * as ActionType from "../action/const_action";

const defaultState = {
    bookingDB: [],
    filter: {},
    pagi: {},
    loader: true,
    search: {}
}

export default function bookingDBReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ActionType.GET_BOOKINGDB_SC:
            newState = {
                ...newState,
                bookingDB: action.payload.data,
                pagi: action.payload.pagination
            }
            return newState;
        case ActionType.SET_LOADER:
            newState = { ...newState, loader: action.payload }
            return newState;
        case ActionType.CHANGE_FILTER:
            state = { ...newState, filter: action.payload };
            return state;
        case ActionType.SEARCH_BOOKINGDB:
            state = { ...newState, search: action.payload };
            return state;
        case ActionType.EDIT_BOOKINGDB_SC:
            let newBooking1 = newState.bookingDB.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item;
            })
            newState = { ...newState, bookingDB: newBooking1 }
            return newState;
        default:
            return state;
    }
}
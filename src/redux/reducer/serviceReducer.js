import * as ActionType from "../action/const_action";

const defaultState = {
    service: [],
    filter: {},
    pagi: {},
    loader: true,
}

export default function serviceReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ActionType.GET_SERVICE_SC:
            if (action.payload.pagination) {
                newState = {
                    ...newState,
                    service: action.payload.data,
                    pagi: action.payload.pagination
                }
            } else {
                newState = {
                    ...newState,
                    service: action.payload
                }
            }
            return newState;

        case ActionType.SET_LOADER:
            newState = { ...newState, loader: action.payload }
            return newState;
        case ActionType.ADD_SERVICE_SC:
            newState = {
                ...newState,
                service: [...newState.service, action.payload]
            }
            return newState;
        case ActionType.EDIT_SERVICE_SC:
            let newService1 = newState.service.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item;
            })
            newState = { ...newState, service: newService1 }
            return newState;
        case ActionType.DEL_SERVICE_SC:
            let newService2 = newState.service.filter(item => item.id !== action.payload)
            newState = { ...newState, service: newService2 }
            return newState;
        case ActionType.CHANGE_FILTER:
            state = { ...newState, filter: action.payload };
            return state;
        default:
            return state;
    }
}
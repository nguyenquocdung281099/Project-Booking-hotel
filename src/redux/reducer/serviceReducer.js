import * as ActionType from "../action/const_action";

const defaultState = {
    service: [],
    loader: "block",
    filter: {},
    pagi: {}
}

export default function serviceReducer(state = defaultState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ActionType.GET_SERVICE_SC:
            newState = { ...newState, 
                service: action.payload
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
            let newService2 = newState.promo.filter(item => item.id !== action.payload)
            newState = { ...newState, service: newService2 }
            return newState;
        default:
            return state;

    }
}
import * as ActionType from "../action/const_action";

const defaultState = {
  service: [],
  filter: {},
  pagi: {},
  loader: true,
};

export default function serviceReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ActionType.GET_EXTRA_SERVICE_SC:
      console.log(action.data.data.data);
      return {
        ...state,
        service: action.data.data,
      };

    case ActionType.SET_LOADER:
      newState = { ...newState, loader: action.data };
      return newState;
    case ActionType.ADD_SERVICE_SC:
      newState = {
        ...newState,
        service: [...newState.service, action.data],
      };
      return newState;
    case ActionType.EDIT_SERVICE_SC:
      let newService1 = newState.service.map((item) => {
        if (item.id === action.data.id) {
          item = action.data;
        }
        return item;
      });
      newState = { ...newState, service: newService1 };
      return newState;
    case ActionType.DEL_SERVICE_SC:
      let newService2 = newState.service.filter((item) => item.id !== action.data);
      newState = { ...newState, service: newService2 };
      return newState;
    case ActionType.CHANGE_FILTER:
      state = { ...newState, filter: action.data };
      return state;
    default:
      return state;
  }
}

import * as ActionType from "../action/const_action";

const defaultState = {
  rooms: [],
  type: [],
  filter: {},
  pagi: {},
  loading: true,
};

export default function roomReducer(state = defaultState, action) {
  let newState = { ...state };
  console.log(action.type);
  switch (action.type) {
    case ActionType.GET_ROOM_SC:
      newState = {
        ...newState,
        rooms: action.payload.data,
        pagi: action.payload.pagination,
      };
      console.log(action.payload);

      return newState;
    case ActionType.GET_TYPE_ROOM_SC:
      newState = { ...newState, type: action.payload };
      return newState;
    case ActionType.CHANGE_FILTER:
      state = { ...newState, filter: action.payload };
      return state;
    case ActionType.SET_LOADING:
      state = { ...newState, loading: action.status };
      return state;
    default:
      return state;
  }
}

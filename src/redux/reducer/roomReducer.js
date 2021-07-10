import * as ActionType from "../action/const_action";

const defaultState = {
  rooms: [],
  type: [],
  filter: {},
  pagi: {},
  loading: true,
  loader: "block",
  roomsDetail: [],
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
      state = { ...newState };
      return { ...state };
    case ActionType.GET_TYPE_ROOM_SC:
      newState = { ...newState, type: action.payload };
      return newState;
    case ActionType.CHANGE_FILTER:
      state = { ...newState, filter: action.payload };
      return state;
    case ActionType.SET_LOADING:
      state = { ...newState, loading: action.status };
      return state;
    case ActionType.SET_LOADER:
      newState = { ...newState, loader: action.payload }
      return newState;

    case ActionType.ADD_ROOM_SC:
      newState = {
        ...newState,
        rooms: [...newState.rooms, action.payload]
      }
      return newState;
    case ActionType.EDIT_ROOM_SC:
      let newRoom1 = newState.rooms.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload
        }
        return item;
      })
      newState = { ...newState, rooms: newRoom1 }
      return newState;
    case ActionType.DEL_ROOM_SC:
      let newRoom2 = newState.rooms.filter(item => item.id !== action.payload)
      newState = { ...newState, rooms: newRoom2 }
      return newState;
    case ActionType.GET_ROOM_DETAIL_SC:
      state = {
        ...newState,
        roomsDetail: action.payload,
      };
      return state;
    default:
      return state;
  }
}

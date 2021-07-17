import * as ActionType from "../action/const_action";

const defaultState = {
  rooms: [],
  type: [],
  filter: {},
  pagi: {},
  loading: true,
  roomsDetail: [],
  filterSearchRoom: {},
  loader: true,
};

export default function roomReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ActionType.GET_ROOM_SC:
      newState = {
        ...newState,
        rooms: action.payload.data,
        pagi: action.payload.pagination,
      };
      state = { ...newState };
      console.log(state)
      return { ...state };
    case ActionType.GET_TYPE_ROOM_SC:
      newState = { ...newState, type: action.payload };
      return newState;
    case ActionType.CHANGE_FILTER:
      Object.keys(action.payload).length === 0
        ? (state = {
            ...newState,
            filter: action.payload,
            filterSearchRoom: {},
          })
        : (state = {
            ...newState,
            filter: action.payload,
          });
      return state;
    case ActionType.SET_LOADING:
      state = { ...newState, loading: action.status };
      return state;
    case ActionType.SET_LOADER:
      newState = { ...newState, loader: action.payload };
      return newState;

    case ActionType.ADD_ROOM_SC:
      newState = {
        ...newState,
        rooms: [...newState.rooms, action.payload],
      };
      return newState;
    case ActionType.EDIT_ROOM_SC:
      let newRoom1 = newState.rooms.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
      newState = { ...newState, rooms: newRoom1 };
      return newState;
    case ActionType.DEL_ROOM_SC:
      let newRoom2 = newState.rooms.filter(
        (item) => item.id !== action.payload
      );
      newState = { ...newState, rooms: newRoom2 };
      return newState;
    case ActionType.GET_ROOM_DETAIL_SC:
      state = {
        ...newState,
        roomsDetail: action.payload,
      };
      return state;
    case ActionType.FILTER_SEARCH_ROOM:
      newState = { ...newState, filterSearchRoom: action.payload };
      return newState;
    default:
      return state;
  }
}

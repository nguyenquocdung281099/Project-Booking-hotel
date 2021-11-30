import * as ActionType from "../action/const_action";

const defaultState = {
  rooms: {
    data: [],
    meta: {},
    load: false,
  },
  type: [],
  filter: {},
  loading: false,
  roomsDetail: [],
  filterSearchRoom: {},
};

export default function roomReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ActionType.GET_ROOM_SC: {
      const { data, meta } = action.payload;
      return {
        ...state,
        rooms: {
          data,
          meta,
          load: false,
        },
      };
    }
    case ActionType.GET_ROOM: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          load: true,
        },
      };
    }
    case ActionType.GET_ROOM_ER: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          load: false,
        },
      };
    }
    case ActionType.GET_TYPE_ROOM_SC:
      newState = { ...newState, type: action.payload.data };
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
      let newRoom2 = newState.rooms.filter((item) => item.id !== action.payload);
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

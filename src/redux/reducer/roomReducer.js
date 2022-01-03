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
  roomsDetail: {},
  filterSearchRoom: {},
};

export default function roomReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ActionType.GET_ROOM_SC: {
      const { data, meta } = action.data;
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
      newState = { ...newState, type: action.data.data };
      return newState;
    case ActionType.CHANGE_FILTER:
      Object.keys(action.data).length === 0
        ? (state = {
            ...newState,
            filter: action.data,
            filterSearchRoom: {},
          })
        : (state = {
            ...newState,
            filter: action.data,
          });
      return state;
    case ActionType.SET_LOADING:
      state = { ...newState, loading: action.status };
      return state;
    case ActionType.SET_LOADER:
      newState = { ...newState, loader: action.data };
      return newState;

    case ActionType.ADD_ROOM:{
      return {
        ...state,
        loading: true
      }
    }
    case ActionType.ADD_ROOM_SC:{
      return {
        ...state,
        loading: false
      }
    }
    case ActionType.ADD_ROOM_ER:{
      return {
        ...state,
        loading: false
      }
    }
    case ActionType.DEL_ROOM:{
      return {
        ...state,
        loading: true
      }
    }
    case ActionType.DEL_ROOM_SC:{
      return {
        ...state,
        loading: false
      }
    }
    case ActionType.DEL_ROOM_ER:{
      return {
        ...state,
        loading: false
      }
    }
    case ActionType.GET_ROOM_DETAIL_SC:
      state = {
        ...newState,
        roomsDetail: action.data,
      };
      return state;
    case ActionType.FILTER_SEARCH_ROOM:
      newState = { ...newState, filterSearchRoom: action.data };
      return newState;
    default:
      return state;
  }
}

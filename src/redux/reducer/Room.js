import * as ActionType from "../action/const_action";
const initState = {
  type: [],
};

export default function RoomReducer(state = initState, action) {
  console.log(action.type);
  let newState = { ...state };
  switch (action.type) {
    case ActionType.GET_TYPE_ROOM_SC:
      newState = { ...newState, type: action.payload };
      return newState;
    default:
      return state;
  }
}

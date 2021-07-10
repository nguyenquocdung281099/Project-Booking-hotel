import * as actionType from "../action/const_action";

const defaultState = {
  user: [],
  isAuthen: false,
  isLogin: false,
  infomation: [],
};

export default function userReducer(state = defaultState, action) {
  let newState = { ...state };
  console.log(action.type);
  switch (action.type) {
    case actionType.GET_USER_SC:
      newState = { ...newState, user: action.payload };
      return newState;
    case actionType.LOGIN_SC:
      console.log(action.payload.idRole);
      if (action.payload.idRole !== "user1") {
        newState = {
          ...newState,
          isLogin: true,
          user: action.payload,
          isAuthen: true,
        };
      } else {
        newState = {
          ...newState,
          isLogin: true,
          user: action.payload,
          isAuthen: false,
          // infomation: action.payload,
        };
      }
      console.log(newState);
      state = { ...newState };
      return { ...state };
    case actionType.LOGOUT:
      newState = {
        ...newState,
        isAuthen: false,
        infomation: [],
        isLogin: false,
        user: [],
      };
      state = { ...newState };
      return { ...state };
    default:
      return state;
  }
}

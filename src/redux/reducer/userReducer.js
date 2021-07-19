import * as actionType from "../action/const_action";

const defaultState = {
  user: [],
  isAuthen: localStorage.setItem("KEY_AUTHEN", true) || false,
  isLogin: false,
  infomation: [],
  isToastSC: false,
  isLoginERR: false,
};

export default function userReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case actionType.GET_USER_SC:
      newState = { ...newState, user: action.payload };
      return newState;
    case actionType.LOGIN_SC:
      if (action.payload.idRole !== "user1") {
        localStorage.setItem("KEY_AUTHEN", true);
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
        };
      }

      return { ...newState };
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
    case actionType.LOGIN_ERR:
      newState = { ...newState, isLoginERR: true };
      return newState;
    default:
      return state;
  }
}

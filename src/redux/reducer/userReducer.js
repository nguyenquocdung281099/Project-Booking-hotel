import * as actionType from "../action/const_action";

const defaultState = {
  user: [],
  isAuthen: localStorage.setItem("KEY_AUTHEN", true) || false,
  isLogin: false,
  infomation: [],
  isToastSC: false,
  isLoginERR: false,
  isSignUpEr: false,
  isSignUpSC: false,
};

export default function userReducer(state = defaultState, action) {
  let newState = { ...state };
  switch (action.type) {
    case actionType.SIGN_UP_ER:
      newState = { ...newState, isSignUpEr: true };
      return newState;
    case actionType.SIGN_UP_SC:
      newState = { ...newState, isSignUpEr: false, isSignUpSC: true };
      return newState;
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
          isSignUpSC: false,
        };
      } else {
        newState = {
          ...newState,
          isLogin: true,
          isSignUpSC: false,
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
        isLoginERR: false,
      };
      state = { ...newState };
      return { ...state };
    case actionType.LOGIN_ERR:
      newState = { ...newState, isLoginERR: true };
      return newState;
    case actionType.SIGN_UP_TO:
      newState = { ...newState, isSignUpSC: false };
      return newState;
    default:
      return state;
  }
}

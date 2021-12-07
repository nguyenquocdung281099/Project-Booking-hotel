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
  userCurrent: {},
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
      if (action.payload.idRole === "user2") {
        localStorage.setItem("KEY_AUTHEN", true);
      }
      return {
        ...state,
        isLogin: true,
        userCurrent: action.payload,
        isAuthen: action.payload.idRole === "user2",
      };
    case actionType.LOGIN_ERR:
      newState = { ...newState, isLoginERR: true };
      return newState;
    case actionType.SIGN_UP_TO:
      newState = { ...newState, isSignUpSC: false };
      return newState;
    case actionType.GET_USER_CURRENT_SC: {
      return {
        ...state,
        userCurrent: {
          ...action.data,
        },
      };
    }
    case actionType.UPDATE_INFORMATION_USER_SC: {
      return {
        ...state,
        userCurrent: {
          ...state.userCurrent,
          ...action.data,
        },
      };
    }
    case actionType.LOGOUT: {
      return {
        ...state,
        userCurrent: {},
        isAuthen: false,
        infomation: [],
        isLogin: false,
        user: [],
        isLoginERR: false,
      };
    }
    default:
      return state;
  }
}

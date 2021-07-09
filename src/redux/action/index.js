import * as ActionType from "./const_action";

// ! action

export const getbooking = () => {
  return {
    type: ActionType.GET_BOOKING,
  };
};

export const getroom = (filter) => {
  return {
    type: ActionType.GET_ROOM,
    filter: filter,
  };
};

export const getservice = () => {
  return {
    type: ActionType.GET_SERVICE,
  };
};

export const getpromo = () => {
  return {
    type: ActionType.GET_PROMO,
  };
};

export const getuser = (filter) => {
  return {
    type: ActionType.GET_USER,
    filter,
  };
};

export const setloader = (data) => {
  return {
    type: ActionType.SET_LOADER,
    payload: data,
  };
};
export const gettyperoom = () => {
  return { type: ActionType.GET_TYPE_ROOM };
};

export const changeFilter = (filter) => {
  return {
    type: ActionType.CHANGE_FILTER,
    payload: filter,
  };
};
// ! action success

export const getbookingsc = (data) => {
  return {
    type: ActionType.GET_BOOKING_SC,
    payload: data,
  };
};

export const getroomsc = (data) => {
  return {
    type: ActionType.GET_ROOM_SC,
    payload: data,
  };
};

export const getservicesc = (data) => {
  return {
    type: ActionType.GET_SERVICE_SC,
    payload: data,
  };
};

export const getpromosc = (data) => {
  return {
    type: ActionType.GET_PROMO_SC,
    payload: data,
  };
};

export const getusersc = (data) => {
  return {
    type: ActionType.GET_USER_SC,
    payload: data,
  };
};
export const gettyperoomsc = (data) => {
  return {
    type: ActionType.GET_TYPE_ROOM_SC,
    payload: data,
  };
};

export const getRating = () => {
  return {
    type: ActionType.GET_RATING,
  };
};
export const getRatingSC = (data) => {
  return {
    type: ActionType.GET_RATING_SC,
    payload: data,
  };
};
export const setLoading = (status) => {
  return {
    type: ActionType.SET_LOADING,
    status,
  };
};

export const login = (data) => {
  return {
    type: ActionType.LOGIN,
    payload: data,
  };
};

export const loginSc = (token) => {
  return {
    type: ActionType.LOGIN_SC,
    payload: token,
  };
};

export const loginErr = () => {
  return {
    type: ActionType.LOGIN_ERR,
  };
};
export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  };
};

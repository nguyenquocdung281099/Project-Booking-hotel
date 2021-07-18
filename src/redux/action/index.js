import * as ActionType from "./const_action";

// ! action

export const getbooking = (filter) => {
  return {
    type: ActionType.GET_BOOKING,
    filter: filter,
  };
};

export const getroom = (filter) => {
  return {
    type: ActionType.GET_ROOM,
    filter: filter,
  };
};

export const getservice = (filter) => {
  return {
    type: ActionType.GET_SERVICE,
    filter: filter,
  };
};

export const getpromo = (filter) => {
  return {
    type: ActionType.GET_PROMO,
    filter: filter,
  };
};

export const getuser = (filter) => {
  return {
    type: ActionType.GET_USER,
    filter: filter,
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

export const getpromoEr = () => {
  return {
    type: ActionType.GET_PROMO_ER,
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

export const addPromo = (data) => {
  return {
    type: ActionType.ADD_PROMO,
    payload: data,
  };
};

export const addPromoSC = (data) => {
  return {
    type: ActionType.ADD_PROMO_SC,
    payload: data,
  };
};

export const editPromo = (data) => {
  return {
    type: ActionType.EDIT_PROMO,
    payload: data,
  };
};

export const editPromoSC = (data) => {
  return {
    type: ActionType.EDIT_PROMO_SC,
    payload: data,
  };
};

export const delPromo = (data) => {
  return {
    type: ActionType.DEL_PROMO,
    payload: data,
  };
};

export const delPromoSC = (data) => {
  return {
    type: ActionType.DEL_PROMO_SC,
    payload: data,
  };
};

export const addRoom = (data) => {
  return {
    type: ActionType.ADD_ROOM,
    payload: data,
  };
};

export const addRoomSC = (data) => {
  return {
    type: ActionType.ADD_ROOM_SC,
    payload: data,
  };
};

export const editRoom = (data) => {
  return {
    type: ActionType.EDIT_ROOM,
    payload: data,
  };
};

export const editRoomSC = (data) => {
  return {
    type: ActionType.EDIT_ROOM_SC,
    payload: data,
  };
};

export const delRoom = (data) => {
  return {
    type: ActionType.DEL_ROOM,
    payload: data,
  };
};

export const delRoomSC = (data) => {
  return {
    type: ActionType.DEL_ROOM_SC,
    payload: data,
  };
};

export const addService = (data) => {
  return {
    type: ActionType.ADD_SERVICE,
    payload: data,
  };
};

export const addServiceSC = (data) => {
  return {
    type: ActionType.ADD_SERVICE_SC,
    payload: data,
  };
};

export const editService = (data) => {
  return {
    type: ActionType.EDIT_SERVICE,
    payload: data,
  };
};

export const editServiceSC = (data) => {
  return {
    type: ActionType.EDIT_SERVICE_SC,
    payload: data,
  };
};

export const delService = (data) => {
  return {
    type: ActionType.DEL_SERVICE,
    payload: data,
  };
};

export const delServiceSC = (data) => {
  return {
    type: ActionType.DEL_SERVICE_SC,
    payload: data,
  };
};
export const getRoomDetail = (filter) => {
  return {
    type: ActionType.GET_ROOM_DETAIL,
    payload: filter,
  };
};

export const getRoomDetailSc = (data) => {
  return {
    type: ActionType.GET_ROOM_DETAIL_SC,
    payload: data,
  }
}

//user DB staffpage
export const getUserDB = (filter) => {
  return {
    type: ActionType.GET_USERDB,
    filter: filter,
  };
};

export const getUserDBSC = (data) => {
  return {
    type: ActionType.GET_USERDB_SC,
    payload: data,
  };
};

export const editUser = (id, data) => {
  return {
    type: ActionType.EDIT_USERS,
    id: id,
    data: data,
  };
};

export const addUser = (data) => {
  return {
    type: ActionType.ADD_USER,
    data: data,
  };
};

export const showtoast = () => {
  return { type: ActionType.SHOW_TOAST };
};

export const getBookingRoom = (data) => {
  return {
    type: ActionType.GET_BOOKING_ROOM,
    payload: data
  }
}

export const addUserDB = (data) => {
  return {
    type: ActionType.ADD_USERDB,
    payload: data,
  };
};

export const addUserDBSC = (data) => {
  return {
    type: ActionType.ADD_USERDB_SC,
    payload: data,
  };
};

export const getBookingRoomSC = (data) => {
  return {
    type: ActionType.GET_BOOKING_ROOM_SC,
    payload: data,
  };
};

export const delUserDB = (data) => {
  return {
    type: ActionType.DEL_USERDB,
    payload: data,
  };
};

export const setBooking = (data) => {
  return {
    type: ActionType.SET_BOOKING,
    payload: data,
  };
};


export const delUserDBSC = (data) => {
  return {
    type: ActionType.DEL_USERDB_SC,
    payload: data,
  };
};

export const editBooking = (data, id, idUser) => {
  return {
    type: ActionType.EDIT_BOOKING,
    id: id,
    payload: data,
    idUser: idUser,
  };
};

export const editBookingSc = (data) => {
  return {
    type: ActionType.EDIT_BOOKING_SC,
    payload: data,
  };
};

export const filterSearchRoom = (data) => {
  return {
    type: ActionType.FILTER_SEARCH_ROOM,
    payload: data,
  };
};


//booking DB staff page
export const getBookingDB = (filter, search) => {
  return {
    type: ActionType.GET_BOOKINGDB,
    filter: filter,
    search: search,
  };
};

export const getBookingDBSC = (data) => {
  return {
    type: ActionType.GET_BOOKINGDB_SC,
    payload: data,
  };
};

export const searchBookingDB = (data) => {
  return {
    type: ActionType.SEARCH_BOOKINGDB,
    payload: data
  };
};

export const editBookingDB = (data) => {
  return {
    type: ActionType.EDIT_BOOKINGDB,
    payload: data,
  };
};

export const editBookingDBSC = (data) => {
  return {
    type: ActionType.EDIT_BOOKINGDB_SC,
    payload: data,
  };
};

//room DB staffpage
export const getRoomModal = (data) => {
  return {
    type: ActionType.GET_ROOM_MODAL,
    payload: data,
  };
};

export const getRoomModalSC = (data) => {
  return {
    type: ActionType.GET_ROOM_MODAL_SC,
    payload: data
  };
};

import * as ActionType from './const_action'

// ! action

export const getbooking = (filter) => {
  return {
    type: ActionType.GET_BOOKING,
    filter: filter,
  }
}

export const getroom = (filter) => {
  return {
    type: ActionType.GET_ROOM,
    filter: filter,
  }
}

export const getservice = (filter) => {
  return {
    type: ActionType.GET_SERVICE,
    filter: filter,
  }
}

export const getpromo = (filter) => {
  return {
    type: ActionType.GET_PROMO,
    filter: filter,
  }
}

export const getuser = (filter) => {
  return {
    type: ActionType.GET_USER,
    filter: filter,
  }
}

export const setloader = (data) => {
  return {
    type: ActionType.SET_LOADER,
    data: data,
  }
}
export const gettyperoom = () => {
  return { type: ActionType.GET_TYPE_ROOM }
}

export const changeFilter = (filter) => {
  return {
    type: ActionType.CHANGE_FILTER,
    data: filter,
  }
}
// ! action success

export const getbookingsc = (data) => {
  return {
    type: ActionType.GET_BOOKING_SC,
    data: data,
  }
}

export const getroomsc = (data) => {
  return {
    type: ActionType.GET_ROOM_SC,
    data: data,
  }
}

export const getservicesc = (data) => {
  return {
    type: ActionType.GET_SERVICE_SC,
    data: data,
  }
}

export const getpromosc = (data) => {
  return {
    type: ActionType.GET_PROMO_SC,
    data: data,
  }
}

export const getpromoEr = () => {
  return {
    type: ActionType.GET_PROMO_ER,
  }
}

export const getusersc = (data) => {
  return {
    type: ActionType.GET_USER_SC,
    data: data,
  }
}

export const gettyperoomsc = (data) => {
  return {
    type: ActionType.GET_TYPE_ROOM_SC,
    data: data,
  }
}

export const getRating = () => {
  return {
    type: ActionType.GET_RATING,
  }
}
export const getRatingSC = (data) => {
  return {
    type: ActionType.GET_RATING_SC,
    data: data,
  }
}
export const setLoading = (status) => {
  return {
    type: ActionType.SET_LOADING,
    status,
  }
}

export const login = (data) => {
  return {
    type: ActionType.LOGIN,
    data: data,
  }
}

export const loginSc = (token) => {
  return {
    type: ActionType.LOGIN_SC,
    data: token,
  }
}

export const loginErr = () => {
  return {
    type: ActionType.LOGIN_ERR,
  }
}
export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  }
}

export const addPromo = (data) => {
  return {
    type: ActionType.ADD_PROMO,
    data: data,
  }
}

export const addPromoSC = (data) => {
  return {
    type: ActionType.ADD_PROMO_SC,
    data: data,
  }
}

export const editPromo = (data) => {
  return {
    type: ActionType.EDIT_PROMO,
    data: data,
  }
}

export const editPromoSC = (data) => {
  return {
    type: ActionType.EDIT_PROMO_SC,
    data: data,
  }
}

export const delPromo = (data) => {
  return {
    type: ActionType.DEL_PROMO,
    data: data,
  }
}

export const delPromoSC = (data) => {
  return {
    type: ActionType.DEL_PROMO_SC,
    data: data,
  }
}

export const addRoom = (data) => {
  return {
    type: ActionType.ADD_ROOM,
    data: data,
  }
}

export const addRoomSC = (data) => {
  return {
    type: ActionType.ADD_ROOM_SC,
    data: data,
  }
}

export const editRoom = (data) => {
  return {
    type: ActionType.EDIT_ROOM,
    data: data,
  }
}

export const editRoomSC = (data) => {
  return {
    type: ActionType.EDIT_ROOM_SC,
    data: data,
  }
}

export const delRoom = (data) => {
  return {
    type: ActionType.DEL_ROOM,
    data: data,
  }
}

export const delRoomSC = (data) => {
  return {
    type: ActionType.DEL_ROOM_SC,
    data: data,
  }
}

export const addService = (data) => {
  return {
    type: ActionType.ADD_SERVICE,
    data: data,
  }
}

export const addServiceSC = (data) => {
  return {
    type: ActionType.ADD_SERVICE_SC,
    data: data,
  }
}

export const editService = (data) => {
  return {
    type: ActionType.EDIT_SERVICE,
    data: data,
  }
}

export const editServiceSC = (data) => {
  return {
    type: ActionType.EDIT_SERVICE_SC,
    data: data,
  }
}

export const delService = (data) => {
  return {
    type: ActionType.DEL_SERVICE,
    data: data,
  }
}

export const delServiceSC = (data) => {
  return {
    type: ActionType.DEL_SERVICE_SC,
    data: data,
  }
}
export const getRoomDetail = (filter) => {
  return {
    type: ActionType.GET_ROOM_DETAIL,
    data: filter,
  }
}

export const getRoomDetailSc = (data) => {
  return {
    type: ActionType.GET_ROOM_DETAIL_SC,
    data: data,
  }
}

//user DB staffpage
export const getUserDB = (filter) => {
  return {
    type: ActionType.GET_USERDB,
    filter: filter,
  }
}

export const getUserDBSC = (data) => {
  return {
    type: ActionType.GET_USERDB_SC,
    data: data,
  }
}

export const editUser = (id, data) => {
  return {
    type: ActionType.EDIT_USERS,
    id: id,
    data: data,
  }
}

export const addUser = (data) => {
  return {
    type: ActionType.ADD_USER,
    data: data,
  }
}

export const addUserSC = (data) => {
  return {
    type: ActionType.ADD_USER_SC,
    data: data,
  }
}
export const addUserER = (data) => {
  return {
    type: ActionType.ADD_USER_ER,
    data: data,
  }
}

export const showtoast = () => {
  return { type: ActionType.SHOW_TOAST }
}

export const getBookingRoom = (data) => {
  return {
    type: ActionType.GET_BOOKING_ROOM,
    data: data,
  }
}

export const editUserDB = (data) => {
  return {
    type: ActionType.EDIT_USERDB,
    data: data,
  }
}

export const editUserDBSC = (data) => {
  return {
    type: ActionType.EDIT_USERDB_SC,
    data: data,
  }
}

export const getBookingRoomSC = (data) => {
  return {
    type: ActionType.GET_BOOKING_ROOM_SC,
    data: data,
  }
}

export const delUserDB = (data) => {
  return {
    type: ActionType.DEL_USERDB,
    data: data,
  }
}

export const setBooking = (data) => {
  return {
    type: ActionType.SET_BOOKING,
    data: data,
  }
}

export const delUserDBSC = (data) => {
  return {
    type: ActionType.DEL_USERDB_SC,
    data: data,
  }
}

export const editBooking = (data, id, idUser) => {
  return {
    type: ActionType.EDIT_BOOKING,
    id: id,
    data: data,
    idUser: idUser,
  }
}

export const editBookingSc = (data) => {
  return {
    type: ActionType.EDIT_BOOKING_SC,
    data: data,
  }
}

export const filterSearchRoom = (data) => {
  return {
    type: ActionType.FILTER_SEARCH_ROOM,
    data: data,
  }
}

//booking DB staff page
export const getBookingDB = (filter, search) => {
  return {
    type: ActionType.GET_BOOKINGDB,
    filter: filter,
  }
}

export const getBookingDBSC = (data) => {
  return {
    type: ActionType.GET_BOOKINGDB_SC,
    data: data,
  }
}

export const editBookingDB = (data) => {
  return {
    type: ActionType.EDIT_BOOKINGDB,
    data: data,
  }
}

export const editBookingDBSC = (data) => {
  return {
    type: ActionType.EDIT_BOOKINGDB_SC,
    data: data,
  }
}

//room DB staffpage
export const getRoomModal = (data) => {
  return {
    type: ActionType.GET_ROOM_MODAL,
    data: data,
  }
}

export const getRoomModalSC = (data) => {
  return {
    type: ActionType.GET_ROOM_MODAL_SC,
    data: data,
  }
}

export const getPromoUs = (data) => {
  return {
    type: ActionType.GET_PROMOUS,
    data: data,
  }
}

export const cancelCost = () => {
  return {
    type: ActionType.CANCEL_COST,
  }
}

//getpromodbsc

export const getPromoDBSC = (data) => {
  return {
    type: ActionType.GET_PROMODB_SC,
    data: data,
  }
}

export const signUpEr = () => {
  return {
    type: ActionType.SIGN_UP_ER,
  }
}
export const signUpSc = () => {
  return {
    type: ActionType.SIGN_UP_SC,
  }
}
export const signUpTO = () => {
  return {
    type: ActionType.SIGN_UP_TO,
  }
}

export const getUserCurrent = (data) => {
  return {
    type: ActionType.GET_USER_CURRENT,
    data: data,
  }
}
export const getUserCurrentC = (data) => {
  return {
    type: ActionType.GET_USER_CURRENT_SC,
    data: data,
  }
}
export const getUserCurrentR = (data) => {
  return {
    type: ActionType.GET_USER_CURRENT_ER,
    data: data,
  }
}

export const updateInformationUser = (data) => {
  return {
    type: ActionType.UPDATE_INFORMATION_USER,
    data: data,
  }
}
export const updateInformationUserSC = (data) => {
  return {
    type: ActionType.UPDATE_INFORMATION_USER_SC,
    data: data,
  }
}
export const updateInformationUserER = (data) => {
  return {
    type: ActionType.UPDATE_INFORMATION_USER_ER,
    data: data,
  }
}

export const checkPromotion = (data) => {
  return {
    type: ActionType.CHECK_PROMOTION,
    data: data,
  }
}
export const checkPromotionSC = (data) => {
  return {
    type: ActionType.CHECK_PROMOTION_SC,
    data: data,
  }
}
export const checkPromotionER = (data) => {
  return {
    type: ActionType.CHECK_PROMOTION_ER,
    data: data,
  }
}

export const getBlankDate = (data) => {
  return {
    type: ActionType.GET_BLANK_DATE,
    data: data,
  }
}
export const getBlankDateSC = (data) => {
  return {
    type: ActionType.GET_BLANK_DATE_SC,
    data: data,
  }
}
export const getBlankDateER = (data) => {
  return {
    type: ActionType.GET_BLANK_DATE_ER,
    data: data,
  }
}

export const getExtraService = (data) => {
  return {
    type: ActionType.GET_EXTRA_SERVICE,
    data: data,
  }
}
export const getExtraServiceSC = (data) => {
  return {
    type: ActionType.GET_EXTRA_SERVICE_SC,
    data: data,
  }
}
export const getExtraServiceER = (data) => {
  return {
    type: ActionType.GET_EXTRA_SERVICE_ER,
    data: data,
  }
}

export const cancelPromotion = () => {
  return {
    type: ActionType.CANCEL_PROMO,
  }
}

export const getComment = (data) => {
  return {
    type: ActionType.GET_COMMENT,
    data: data,
  }
}
export const getCommentSC = (data) => {
  return {
    type: ActionType.GET_COMMENT_SC,
    data: data,
  }
}
export const getCommentER = (data) => {
  return {
    type: ActionType.GET_COMMENT_ER,
    data: data,
  }
}

export const createComment = (data) => {
  return {
    type: ActionType.CREATE_COMMENT,
    data: data,
  }
}
export const createCommentSC = (data) => {
  return {
    type: ActionType.CREATE_COMMENT_SC,
    data: data,
  }
}
export const createCommentER = (data) => {
  return {
    type: ActionType.CREATE_COMMENT_ER,
    data: data,
  }
}

export const getDataMaster = () => {
  return {
    type: ActionType.GET_DATA_MASTER,
  }
}
export const getDataMasterSC = (data) => {
  return {
    type: ActionType.GET_DATA_MASTER_SC,
    data: data,
  }
}
export const getDataMasterER = (data) => {
  return {
    type: ActionType.GET_DATA_MASTER_ER,
    data: data,
  }
}


export const getUserAdmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_USER,
    data: data
  }
}
export const getUserAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_USER_SC,
    data: data,
  }
}
export const getUserAdminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_USER_ER,
    data: data,
  }
}

export const getCommentAdmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_COMMENT,
    data: data
  }
}
export const getCommentAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_COMMENT_SC,
    data: data,
  }
}
export const getCommentAdminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_COMMENT_ER,
    data: data,
  }
}

export const getbookingAdmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_BOOKING,
    data: data
  }
}
export const getbookingAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_BOOKING_SC,
    data: data,
  }
}
export const getbookingAdminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_BOOKING_ER,
    data: data,
  }
}

export const changeStatusBookingAdmin = (data) => {
  return {
    type: ActionType.ADMIN_CHANGE_STATUS_BOOKING,
    data: data
  }
}
export const changeStatusBookingAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_CHANGE_STATUS_BOOKING_SC,
    data: data,
  }
}
export const changeStatusBookingAdminER = (data) => {
  return {
    type: ActionType.ADMIN_CHANGE_STATUS_BOOKING_ER,
    data: data,
  }
}

export const deleteServiceAdmin = (data) => {
  return {
    type: ActionType.ADMIN_DELETE_SERVICE,
    data: data
  }
}
export const deleteServiceAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_DELETE_SERVICE_SC,
    data: data,
  }
}
export const deleteServiceAdminER = (data) => {
  return {
    type: ActionType.ADMIN_DELETE_SERVICE_ER,
    data: data,
  }
}


export const deleteVoucherdmin = (data) => {
  return {
    type: ActionType.ADMIN_DELETE_VOUCHER,
    data: data
  }
}
export const deleteVoucherdminSC = (data) => {
  return {
    type: ActionType.ADMIN_DELETE_VOUCHER_SC,
    data: data,
  }
}
export const deleteVoucherdminER = (data) => {
  return {
    type: ActionType.ADMIN_DELETE_VOUCHER_ER,
    data: data,
  }
}

export const getVoucheradmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_VOUCHER,
    data: data
  }
}
export const getVoucheradminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_VOUCHER_SC,
    data: data,
  }
}
export const getVoucheradminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_VOUCHER_ER,
    data: data,
  }
}


export const getServiceAdmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_SERVICE,
    data: data
  }
}
export const getServiceAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_SERVICE_SC,
    data: data,
  }
}
export const getServiceAdminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_SERVICE_ER,
    data: data,
  }
}


export const updateServiceAdmin = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_SERVICE,
    data: data
  }
}
export const updateServiceAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_SERVICE_SC,
    data: data,
  }
}
export const updateServiceAdminER = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_SERVICE_ER,
    data: data,
  }
}


export const updateVoucheradmin = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_VOUCHER,
    data: data
  }
}
export const updateVoucheradminSC = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_VOUCHER_SC,
    data: data,
  }
}
export const updateVoucheradminER = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_VOUCHER_ER,
    data: data,
  }
}

export const addVoucheradmin = (data) => {
  return {
    type: ActionType.ADMIN_ADD_VOUCHER,
    data: data
  }
}
export const addVoucheradminSC = (data) => {
  return {
    type: ActionType.ADMIN_ADD_VOUCHER_SC,
    data: data,
  }
}
export const addVoucheradminER = (data) => {
  return {
    type: ActionType.ADMIN_ADD_VOUCHER_ER,
    data: data,
  }
}


export const getAlltypeRoomAdmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_ALL_TYPEROOM,
    data: data
  }
}
export const getAlltypeRoomAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_ALL_TYPEROOM_SC,
    data: data,
  }
}
export const getAlltypeRoomAdminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_ALL_TYPEROOM_ER,
    data: data,
  }
}

export const getTypeRoomMetaAdmin = (data) => {
  return {
    type: ActionType.ADMIN_GET_TYPEROOM_META,
    data: data
  }
}
export const getTypeRoomMetaAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_GET_TYPEROOM_META_SC,
    data: data,
  }
}
export const getTypeRoomMetaAdminER = (data) => {
  return {
    type: ActionType.ADMIN_GET_TYPEROOM_META_ER,
    data: data,
  }
}


export const updateTypeRoomAdmin = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_TYPEROOM,
    data: data
  }
}
export const updateTypeRoomAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_TYPEROOM_SC,
    data: data,
  }
}
export const updateTypeRoomAdminER = (data) => {
  return {
    type: ActionType.ADMIN_UPDATE_TYPEROOM_ER,
    data: data,
  }
}

export const addTypeRoomAdmin = (data) => {
  return {
    type: ActionType.ADMIN_ADD_TYPEROOM,
    data: data
  }
}
export const addTypeRoomAdminSC = (data) => {
  return {
    type: ActionType.ADMIN_ADD_TYPEROOM_SC,
    data: data,
  }
}
export const addTypeRoomAdminER = (data) => {
  return {
    type: ActionType.ADMIN_ADD_TYPEROOM_ER,
    data: data,
  }
}

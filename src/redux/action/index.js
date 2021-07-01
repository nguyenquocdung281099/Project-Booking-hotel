import * as ActionType from "./const_action";

// ! action
export const gettyperoom = () => {
  return { type: ActionType.GET_TYPE_ROOM };
};

// ! action success
export const gettyperoomsc = (data) => {
  return {
    type: ActionType.GET_TYPE_ROOM_SC,
    payload: data,
  };
};

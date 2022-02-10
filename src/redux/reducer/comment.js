import * as ActionType from '../action/const_action'

const initState = {
  comment: {
    data: [],
    meta: {},
  },
  staticComment: 0,
}

const CommentReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.GET_COMMENT_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        comment: {
          ...state.comment,
          data,
          meta,
        },
      }
    }
    case ActionType.ADMIN_GET_COMMENT_SC: {
      const { data, meta } = action.data
      return {
        ...state,
        comment: {
          ...state.comment,
          data,
          meta,
        },
      }
    }
    case ActionType.GET_STATIC_COMMENT_SC: {
      return {
        ...state,
        staticComment: action.data.data,
      }
    }
    default:
      return { ...state }
  }
}

export default CommentReducer

import {
  CREATE_NEW_POST,
  DELETE_POST,
  FETCH_ALL_POST,
  FETCH_BY_SEARCH,
  LIKE_POST,
  UPDATE_POST,
} from "./postType";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_POST:
      return action.payload;
    case CREATE_NEW_POST:
      return action.payload;
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload);
    case UPDATE_POST:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE_POST:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_BY_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;

import { GET_ALL, CLEAR_ERRORS } from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        rooms: [...action.payload],
      };
    case CLEAR_ERRORS:
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;

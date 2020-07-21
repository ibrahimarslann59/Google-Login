import { USER_UPDATE } from "../actions/types";

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

import { USER_UPDATE } from "./types";

export function updateUser(user) {
  return (dispatch) => {
    dispatch({
      type: USER_UPDATE,
      payload: user,
    });
  };
}

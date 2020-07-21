import { getAuthToken } from "./service/userService";

export const API_URL = `http://localhost:8081`;
export const USER_URL = `${API_URL}/user`;

export const headerWithToken = (token) => {
  const authToken = getAuthToken();
  return {
    headers: {
      "x-auth-token": token || authToken,
    },
  };
};

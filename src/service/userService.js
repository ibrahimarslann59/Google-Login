import Axios from "axios";
import { USER_URL, headerWithToken } from "../config";

export const getGoogleUrlService = () => {
  const url = `${USER_URL}/google`;
  return Axios.get(url);
};

export const checkUser = () => {
  return Axios.get(USER_URL, headerWithToken());
};

export const getAuthToken = () => {
  return localStorage.getItem("toprakio-token");
};

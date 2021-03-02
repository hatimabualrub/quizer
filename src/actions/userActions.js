import Axios from "axios";

import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCSSES,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCSSES,
  USER_SIGNUP_FAIL,
  USER_LOGOUT_REQUEST,
  USER_SIGNOUT,
} from "../constants/userConstants";
import { host } from "../globals";

export const requestSignin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post(`${host}user/signin`, {
      username,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCSSES, payload: data });
    localStorage.setItem("token", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const requestSignup = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await Axios.post(`${host}user/signup`, {
      username,
      password,
    });
    dispatch({ type: USER_SIGNUP_SUCSSES, payload: data });
    dispatch({ type: USER_SIGNIN_SUCSSES, payload: data });
    localStorage.setItem("token", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const requestLogout = () => {
  localStorage.clear();
  return { type: USER_SIGNOUT };
};

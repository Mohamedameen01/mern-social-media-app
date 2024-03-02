import * as api from "../../api/index";
import { AUTH, UPDATE_USER_PROFILE } from "./actionTypes";

export const signUp = (userInfo, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userSignup(userInfo);
    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (userInfo, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userSignin(userInfo);
    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = (info) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(info);
    dispatch({
      type: AUTH,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeUserProfile = (info) => async (dispatch) => {
  try {
    const { data } = await api.removeProfile(info);
    dispatch({
      type: AUTH,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

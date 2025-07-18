import {
  USER_GET_LIST_CLASS_REQUEST,
  USER_GET_LIST_CLASS_SUCCESS,
  USER_GET_LIST_CLASS_FAIL,
} from "./userTypes";

import { GetAllClassByUserAndAdmin } from "../../api/UserCallApi";

export const fetchAllClass = () => {
  return async (dispatch) => {
    try {
      dispatch({ USER_GET_LIST_CLASS_REQUEST });
      const token = localStorage.getItem("token");
      const res = await GetAllClassByUserAndAdmin(token);
      dispatch({ type: USER_GET_LIST_CLASS_SUCCESS, payload: res.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: USER_GET_LIST_CLASS_FAIL, payload: error.message });
      return { success: false };
    }
  };
};

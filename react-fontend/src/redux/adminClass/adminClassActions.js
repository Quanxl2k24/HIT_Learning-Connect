import {
  ADMIN_GET_ALL_CLASS_REQUEST,
  ADMIN_GET_ALL_CLASS_SUCCESS,
  ADMIN_GET_ALL_CLASS_FAIL,
  ADMIN_DELETE_CLASS_REQUEST,
  ADMIN_DELETE_CLASS_SUCCESS,
  ADMIN_DELETE_CLASS_FAIL,
  ADMIN_CREATE_CLASS_REQUEST,
  ADMIN_CREATE_CLASS_SUCCESS,
  ADMIN_CREATE_CLASS_FAIL,
} from "./adminClassTypes";

import {
  GetAllClassByUserAndAdmin,
  DeleteClassByAdmin,
  CreateClassByAdminApi,
} from "../../api/UserCallApi";

export const fetchAllClassByAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_GET_ALL_CLASS_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const res = await GetAllClassByUserAndAdmin(token);
      dispatch({ type: ADMIN_GET_ALL_CLASS_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: ADMIN_GET_ALL_CLASS_FAIL, payload: error.message });
    }
  };
};

export const deleteClassByAdmin = (classId) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_DELETE_CLASS_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const res = await DeleteClassByAdmin(classId, token);
      dispatch({ type: ADMIN_DELETE_CLASS_SUCCESS });
      return { success: true };
    } catch (error) {
      dispatch({ type: ADMIN_DELETE_CLASS_FAIL, payload: error.message });
      console.log("loi", error.message);
      return { success: false };
    }
  };
};

export const createClassByAdmin = (dataCreate) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_CREATE_CLASS_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const res = await CreateClassByAdminApi(dataCreate, token);
      dispatch({ type: ADMIN_CREATE_CLASS_SUCCESS });
      return { success: true };
    } catch (error) {
      dispatch({ type: ADMIN_CREATE_CLASS_FAIL, payload: error.message });
      return { success: false };
    }
  };
};

import { CreateUserByAdminApi } from "../../api/UserCallApi";
import { GetAllUserApi } from "../../api/UserCallApi";
import {
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_CREATE_REQUEST,
  ADMIN_USER_CREATE_SUCCESS,
  ADMIN_USER_CREATE_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
} from "./adminType";

export const fetchAllUser = (params) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_USER_LIST_REQUEST });
    const token = localStorage.getItem("token");
    try {
      const res = await GetAllUserApi(params, token);
      dispatch({ type: ADMIN_USER_LIST_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: ADMIN_USER_LIST_FAIL, payload: error.message });
    }
  };
};

export const adminUserCreate = (dataCreate) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_USER_CREATE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      await CreateUserByAdminApi(dataCreate, token);
      dispatch({ type: ADMIN_USER_CREATE_SUCCESS, payload: dataCreate });
      fetchAllUser({ page: 0, size: 10, sort: "username" });
      return { success: true };
    } catch (error) {
      dispatch({ type: ADMIN_USER_CREATE_FAIL, payload: error.message });
      return { success: false };
    }
  };
};

import {
  ADMIN_GET_REGISTER_REQUEST,
  ADMIN_GET_REGISTER_SUCCESS,
  ADMIN_GET_REGISTER_FAIL,
  ADMIN_DELETE_REGISTER_REQUEST,
  ADMIN_DELETE_REGISTER_SUCCESS,
  ADMIN_DELETE_REGISTER_FAIL,
} from "./adminRegisterTypes";

import {
  GetAllRegisterByAdminApi,
  AdminDeleteRegisterApi,
} from "../../api/UserCallApi";

export const fectchRegisterbyAdmin = (params) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_GET_REGISTER_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const res = await GetAllRegisterByAdminApi(params, token);
      console.log("res", res.data);

      dispatch({
        type: ADMIN_GET_REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: ADMIN_GET_REGISTER_FAIL, payload: error.message });
    }
  };
};

export const deleteRegisterbyAdmin = (registrationId) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_DELETE_REGISTER_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const res = await AdminDeleteRegisterApi(registrationId, token);
      dispatch({ type: ADMIN_DELETE_REGISTER_SUCCESS });
      return { success: true };
    } catch (error) {
      dispatch({ type: ADMIN_DELETE_REGISTER_FAIL, payload: error.message });
      return { success: false };
    }
  };
};

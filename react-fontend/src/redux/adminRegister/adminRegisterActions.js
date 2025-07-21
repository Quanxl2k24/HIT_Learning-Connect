import {
  ADMIN_GET_REGISTER_REQUEST,
  ADMIN_GET_REGISTER_SUCCESS,
  ADMIN_GET_REGISTER_FAIL,
} from "./adminRegisterTypes";

import { GetAllRegisterByAdminApi } from "../../api/UserCallApi";

export const fectchRegisterbyAdmin = (params) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_GET_REGISTER_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const res = await GetAllRegisterByAdminApi(params, token);

      dispatch({ type: ADMIN_GET_REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: ADMIN_GET_REGISTER_FAIL, payload: error.message });
    }
  };
};

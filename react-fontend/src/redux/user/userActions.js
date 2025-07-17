import { SET_USER, CLEAR_USER, SET_LOADING, SET_ERROR } from "./userType";
import { ProfileUser, UpdateUserByUserApi } from "../../api/UserCallApi";
//Tao actions
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};
export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

// Goi Api neu co token

export const fetchUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const res = await ProfileUser(token);

      dispatch(setUser(res.data.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateUser = (dataUpdate) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const res = await UpdateUserByUserApi(dataUpdate, token);

      dispatch(setUser(res.data.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

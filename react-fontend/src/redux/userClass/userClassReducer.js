import { defaultLocale } from "yup";
import {
  USER_GET_LIST_CLASS_REQUEST,
  USER_GET_LIST_CLASS_SUCCESS,
  USER_GET_LIST_CLASS_FAIL,
} from "./userTypes";

// khoi tao state
const initialState = {
  listClass: [],
  loading: false,
  success: false,
  error: null,
};

const userClassReducer = (state = initialState, action) => {
  switch (action.type) {
    //request
    case USER_GET_LIST_CLASS_REQUEST:
      return { ...state, loading: true };
    //success
    case USER_GET_LIST_CLASS_SUCCESS:
      return { ...state, listClass: payload, loading: false, success: true };
    // error
    case USER_GET_LIST_CLASS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default userClassReducer;

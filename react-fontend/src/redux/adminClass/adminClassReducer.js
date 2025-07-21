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
  ADMIN_UPDATE_CLASS_REQUEST,
  ADMIN_UPDATE_CLASS_SUCCESS,
  ADMIN_UPDATE_CLASS_FAIL,
} from "./adminClassTypes";

const initialState = {
  listClass: [],
  loading: false,
  success: false,
  error: null,
};

const adminClassReducer = (state = initialState, action) => {
  switch (action.type) {
    //request
    case ADMIN_GET_ALL_CLASS_REQUEST:
    case ADMIN_DELETE_CLASS_REQUEST:
    case ADMIN_CREATE_CLASS_REQUEST:
      return { ...state, loading: true };
    //success
    case ADMIN_GET_ALL_CLASS_SUCCESS:
      return {
        ...state,
        listClass: action.payload,
        loading: false,
        success: true,
      };
    case ADMIN_DELETE_CLASS_SUCCESS:
    case ADMIN_CREATE_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    //   fail
    case ADMIN_GET_ALL_CLASS_FAIL:
    case ADMIN_DELETE_CLASS_FAIL:
    case ADMIN_CREATE_CLASS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default adminClassReducer;

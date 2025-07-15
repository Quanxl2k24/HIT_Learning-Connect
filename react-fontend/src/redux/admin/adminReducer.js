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

const initialState = {
  listUser: [],
  loading: false,
  success: false,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // request
    case ADMIN_USER_LIST_REQUEST:
    case ADMIN_USER_CREATE_REQUEST:
    case ADMIN_USER_UPDATE_REQUEST:
    case ADMIN_USER_DELETE_REQUEST:
      return { ...state, loading: true, success: false };

    // success
    case ADMIN_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listUser: action.payload,
      };
    case ADMIN_USER_CREATE_SUCCESS:
    case ADMIN_USER_UPDATE_SUCCESS:
    case ADMIN_USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case ADMIN_USER_LIST_FAIL:
    case ADMIN_USER_CREATE_FAIL:
    case ADMIN_USER_UPDATE_FAIL:
    case ADMIN_USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default adminReducer;

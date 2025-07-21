import {
  ADMIN_GET_REGISTER_REQUEST,
  ADMIN_GET_REGISTER_SUCCESS,
  ADMIN_GET_REGISTER_FAIL,
} from "./adminRegisterTypes";

const initialState = {
  listRegister: [],
  loading: false,
  success: false,
  error: null,
};

const adminRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    //request
    case ADMIN_GET_REGISTER_REQUEST:
      return { ...state, loading: true };
    //success
    case ADMIN_GET_REGISTER_SUCCESS:
      return {
        ...state,
        listClass: action.payload,
        loading: false,
        success: true,
      };
    //   fail
    case ADMIN_GET_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default adminRegisterReducer;
